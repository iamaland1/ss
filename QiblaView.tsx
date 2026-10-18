/**
 * بەشی قیبلەنما بۆ پیشاندانی ئاراستەی قیبلە.
 */
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Compass, 
  MapPin, 
  RotateCw, 
  CheckCircle2, 
  Info,
  Navigation,
  Crosshair,
  Volume2,
  VolumeX,
  Smartphone,
  ChevronDown,
  Check,
  Search,
  X,
  LocateFixed,
  ArrowRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { CityInfo, Language } from '../types';
import { translations } from '../data/translations';
import { CITIES } from '../data/cities';
import { getQiblaAngle, getDistanceToKaaba } from '../services/prayerTimes';
import { soundEffects } from '../services/soundEffects';

interface QiblaViewProps {
  lang: Language;
  selectedCity: CityInfo;
  onSelectCity?: (city: CityInfo) => void;
}

export const QiblaView: React.FC<QiblaViewProps> = ({ lang, selectedCity, onSelectCity }) => {
  const t = translations[lang] || translations.ckb;
  const isRtl = lang === 'ckb' || lang === 'ar';

  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [hasCompassSensor, setHasCompassSensor] = useState<boolean>(false);
  const [manualRotation, setManualRotation] = useState<number>(0);
  const [showCityPicker, setShowCityPicker] = useState<boolean>(false);
  const [citySearchQuery, setCitySearchQuery] = useState<string>('');
  const [soundAlertEnabled, setSoundAlertEnabled] = useState<boolean>(true);
  const [showCalibrateModal, setShowCalibrateModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLocatingGPS, setIsLocatingGPS] = useState<boolean>(false);
  const [sensorPermissionState, setSensorPermissionState] = useState<'unknown' | 'granted' | 'denied'>('unknown');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 2800);
  };

  const qiblaAngle = getQiblaAngle(selectedCity.latitude, selectedCity.longitude);
  const distanceKm = getDistanceToKaaba(selectedCity.latitude, selectedCity.longitude);

  // ئاراستەی ئێستا: سێنسەر ئەگەر بەردەست بێت، ئەگەر نا دەستی
  const currentHeading = hasCompassSensor ? deviceHeading : manualRotation;

  // جیاوازی نێوان ئاراستەی ئێستا و قیبلە
  const rawDiff = (qiblaAngle - currentHeading + 360) % 360;
  const normalizedDiff = rawDiff > 180 ? rawDiff - 360 : rawDiff;
  const isFacingQibla = Math.abs(normalizedDiff) <= 4;

  // ===== گوێگرتن بۆ سێنسەری ئاراستە =====
  useEffect(() => {
    let lastVibrated = 0;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      let heading: number | null = null;

      // iOS - webkitCompassHeading
      const anyEvent = e as any;
      if (typeof anyEvent.webkitCompassHeading === 'number') {
        heading = anyEvent.webkitCompassHeading;
      } 
      // Android - alpha
      else if (e.alpha !== null && e.alpha !== undefined) {
        // لە ئەندرۆید، absolute orientation پێویستە
        if (e.absolute === true || anyEvent.webkitCompassAccuracy === undefined) {
          heading = (360 - e.alpha + 360) % 360;
        } else {
          heading = (360 - e.alpha + 360) % 360;
        }
      }

      if (heading !== null && !isNaN(heading) && isFinite(heading)) {
        setHasCompassSensor(true);
        setSensorPermissionState('granted');
        const rounded = Math.round(heading);
        setDeviceHeading(rounded);

        // فیدباکی هەستەوەری کاتێک بەرەو قیبلەیە
        const diff = (qiblaAngle - rounded + 360) % 360;
        const norm = diff > 180 ? diff - 360 : diff;
        if (Math.abs(norm) <= 4) {
          const now = Date.now();
          if (now - lastVibrated > 3500) {
            try {
              soundEffects.vibrateSuccess();
            } catch {}
            if (soundAlertEnabled) {
              try {
                soundEffects.playGoalChime();
              } catch {}
            }
            lastVibrated = now;
          }
        }
      }
    };

    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientationabsolute' as any, handleOrientation, true);
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('deviceorientationabsolute' as any, handleOrientation, true);
        window.removeEventListener('deviceorientation', handleOrientation, true);
      }
    };
  }, [qiblaAngle, soundAlertEnabled]);

  // ===== داواکردنی مۆڵەتی سێنسەر (iOS 13+) =====
  const handleRequestCompassPermission = useCallback(async () => {
    const DeviceOrientation = (window as any).DeviceOrientationEvent;

    if (DeviceOrientation && typeof DeviceOrientation.requestPermission === 'function') {
      try {
        const response = await DeviceOrientation.requestPermission();
        if (response === 'granted') {
          setSensorPermissionState('granted');
          showToast('سێنسەری قیبلەنما بە سەرکەوتوویی چالاک کرا ✓');
        } else {
          setSensorPermissionState('denied');
          showToast('مۆڵەتی سێنسەر نەدرا. تکایە لە ڕێکخستنەکانی مۆبایل چالاکی بکە');
        }
      } catch {
        showToast('هەڵە لە وەرگرتنی مۆڵەتی قیبلەنما');
      }
    } else if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      setSensorPermissionState('granted');
      showToast('سێنسەری قیبلەنما لەم ئامێرەدا چالاکە ✓');
    } else {
      setSensorPermissionState('denied');
      showToast('سێنسەری ئاراستە لەم ئامێرەدا بەردەست نییە');
    }
  }, []);

  // ===== داواکردنی شوێن بە GPS =====
  const handleUseGPS = () => {
    if (!navigator.geolocation) {
      showToast('GPS لەم وێبگەڕەدا پشتگیری ناکرێت');
      return;
    }

    setIsLocatingGPS(true);
    showToast('دیاریکردنی شوێنی ئێستا لە ڕێگەی GPS...');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocatingGPS(false);
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        if (onSelectCity) {
          const gpsCity: CityInfo = {
            id: 'gps_loc',
            nameKu: 'شوێنی ئێستام',
            nameAr: 'موقعي الحالي',
            nameEn: 'My Current Location',
            countryKu: 'شوێنی ئێستا',
            countryAr: 'الموقع الحالي',
            countryEn: 'Current Location',
            latitude: lat,
            longitude: lon,
            timezone: 'Asia/Baghdad',
            offsetMinutes: { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 }
          };
          onSelectCity(gpsCity);
          showToast('شوێنی ئێستات بە سەرکەوتوویی دیاریکرا ✨');
        }
      },
      () => {
        setIsLocatingGPS(false);
        showToast('نەتوانرا شوێنی GPS وەربگیرێت. تکایە مۆڵەت بدە');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // ===== ڕێکخستنی خێرا بۆ قیبلە =====
  const handleAlignDirectly = () => {
    setManualRotation(qiblaAngle);
    setDeviceHeading(qiblaAngle);
    try {
      soundEffects.vibrateSuccess();
      if (soundAlertEnabled) soundEffects.playGoalChime();
    } catch {}
    showToast('مۆبایل ڕێکخرایەوە بە ئاراستەی قیبلە 🕋');
  };

  // ===== گەڕاندنەوە بۆ باکوور =====
  const handleResetNorth = () => {
    setManualRotation(0);
    setDeviceHeading(0);
    showToast('قیبلەنما گەڕێنرایەوە بۆ باکوور (0°)');
  };

  const cityName = lang === 'ckb' ? selectedCity.nameKu : lang === 'ar' ? selectedCity.nameAr : selectedCity.nameEn;

  // ===== فلتەری شارەکان =====
  const filteredCities = CITIES.filter(c => {
    const q = citySearchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      c.nameKu.toLowerCase().includes(q) ||
      c.nameAr.toLowerCase().includes(q) ||
      c.nameEn.toLowerCase().includes(q)
    );
  });

  // ===== ئاراستەی ڕێنمایی بۆ سوڕاندن =====
  const rotationHint = (() => {
    const absDiff = Math.abs(normalizedDiff);
    if (isFacingQibla) return null;
    if (normalizedDiff > 0) {
      return { direction: 'left' as const, degrees: absDiff };
    }
    return { direction: 'right' as const, degrees: absDiff };
  })();

  return (
    <div 
      className="w-full max-w-xl mx-auto space-y-5 animate-fadeIn pb-24 text-(--text-main) font-kurdish"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* ===== Toast ===== */}
      {toastMessage && (
        <div className="fixed top-6 inset-x-4 z-50 flex justify-center pointer-events-none animate-fadeIn">
          <div 
            className="border text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 max-w-sm pointer-events-auto"
            style={{ 
              backgroundColor: 'var(--bg-card)', 
              borderColor: 'var(--color-gold)', 
              color: 'var(--text-main)' 
            }}
          >
            <CheckCircle2 className="w-4 h-4 text-(--color-gold) shrink-0" />
            <span className="truncate">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* ===== کارتی سەرەوە: شار، گۆشە، دووری ===== */}
      <div 
        className="p-5 rounded-3xl border shadow-lg flex items-center justify-between gap-3 relative overflow-hidden"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-13 h-13 rounded-2xl flex items-center justify-center shadow-inner shrink-0"
            style={{ backgroundColor: 'var(--bg-chip)' }}
          >
            <Compass className="w-7 h-7 text-(--color-gold)" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-bold font-naskh text-(--text-main)">
                ئاراستەی قیبلە
              </h2>

              <button
                type="button"
                onClick={() => setShowCityPicker(true)}
                className="px-2.5 py-0.5 rounded-full border text-xs font-bold font-naskh flex items-center gap-1 transition-all cursor-pointer active:scale-95 hover:border-(--color-gold)"
                style={{ 
                  backgroundColor: 'var(--color-gold-muted)', 
                  borderColor: 'rgba(242, 201, 76, 0.3)',
                  color: 'var(--color-gold)' 
                }}
              >
                <MapPin className="w-3 h-3" />
                <span>{cityName}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>
            </div>

            <p className="text-xs text-(--text-muted) flex items-center gap-1 font-medium">
              <span>دووری لە کەعبەی پیرۆز:</span>
              <strong className="text-(--color-teal) font-mono">
                {distanceKm.toLocaleString()} کم
              </strong>
            </p>
          </div>
        </div>

        <div className="text-end shrink-0">
          <span 
            className="text-2xl sm:text-3xl font-black font-mono tracking-tight block"
            style={{ color: 'var(--color-gold)' }}
          >
            {qiblaAngle}°
          </span>
          <span className="text-[10px] text-(--text-muted) uppercase tracking-wider block font-naskh">
            گۆشەی قیبلە
          </span>
        </div>
      </div>

      {/* ===== تاگی دۆخی ئاراستە ===== */}
      <div 
        className={`p-4 rounded-3xl text-center transition-all duration-300 flex items-center justify-between gap-3 shadow-md border ${
          isFacingQibla 
            ? 'border-(--color-gold) shadow-(--color-gold)/20 animate-pulse' 
            : 'border-(--border-theme)'
        }`}
        style={{ 
          backgroundColor: isFacingQibla ? 'rgba(61, 190, 156, 0.2)' : 'var(--bg-card)' 
        }}
      >
        <div className="flex items-center gap-2.5 text-start">
          {isFacingQibla ? (
            <div 
              className="w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-slate-950 shrink-0 shadow-sm"
              style={{ backgroundColor: 'var(--color-gold)' }}
            >
              <Check className="w-5 h-5 stroke-[2.5]" />
            </div>
          ) : (
            <div 
              className="w-9 h-9 rounded-2xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: 'var(--bg-chip)', color: 'var(--color-gold)' }}
            >
              <Navigation className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
            </div>
          )}

          <div>
            <h4 
              className="text-sm font-bold font-naskh"
              style={{ color: isFacingQibla ? 'var(--color-gold)' : 'var(--text-main)' }}
            >
              {isFacingQibla 
                ? 'ڕووت لە قیبلەی پیرۆزە بەتەواوی! 🕋✨' 
                : 'مۆبایلەکەت بسوڕێنەوە بەرەو ئاراستەی کەعبە'}
            </h4>
            {!isFacingQibla && rotationHint && (
              <p className="text-xs text-(--text-muted) flex items-center gap-1 font-mono mt-0.5">
                {rotationHint.direction === 'left' ? (
                  <>
                    <span>بسوڕێ بۆ لای چەپ</span>
                    <ArrowLeft className="w-3.5 h-3.5 text-(--color-gold) inline" />
                    <span>({rotationHint.degrees}°)</span>
                  </>
                ) : (
                  <>
                    <span>بسوڕێ بۆ لای ڕاست</span>
                    <ArrowRight className="w-3.5 h-3.5 text-(--color-gold) inline" />
                    <span>({rotationHint.degrees}°)</span>
                  </>
                )}
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleAlignDirectly}
          className="px-3 py-1.5 rounded-2xl border text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 shrink-0 hover:border-(--color-gold) hover:bg-(--color-gold-muted)"
          style={{ 
            backgroundColor: 'var(--bg-chip)', 
            borderColor: 'var(--border-theme)',
            color: 'var(--color-gold)' 
          }}
        >
          ڕێکخستن
        </button>
      </div>

      {/* ===== قیبلەنمای بینراو ===== */}
      <div className="relative py-4 flex flex-col items-center justify-center select-none">
        <div 
          className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full p-3 shadow-2xl flex items-center justify-center border-4"
          style={{ 
            backgroundColor: 'var(--bg-card)', 
            borderColor: isFacingQibla ? 'var(--color-gold)' : 'rgba(242, 201, 76, 0.4)' 
          }}
        >
          {/* بازنەی سوڕاو */}
          <div 
            className="w-full h-full rounded-full border border-white/10 relative transition-transform duration-200 ease-out flex items-center justify-center"
            style={{ 
              transform: `rotate(${-currentHeading}deg)`,
              background: 'radial-gradient(circle, rgba(19, 41, 66, 0.9) 0%, rgba(3, 31, 60, 0.95) 100%)' 
            }}
          >
            {/* خاڵەکانی پلە */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
              <div
                key={deg}
                className="absolute inset-0 flex items-start justify-center pointer-events-none"
                style={{ transform: `rotate(${deg}deg)` }}
              >
                <div className={`w-0.5 mt-1 ${deg % 90 === 0 ? 'h-3 bg-amber-400' : 'h-1.5 bg-white/20'}`} />
              </div>
            ))}

            {/* باکوور */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
              <span className="text-xs font-black text-rose-500 font-mono">N</span>
              <span className="text-[8px] text-rose-400 font-naskh">باکوور</span>
            </div>

            {/* ڕۆژهەڵات */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
              <span className="text-xs font-bold text-white/70 font-mono">E</span>
            </div>

            {/* باشوور */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
              <span className="text-xs font-bold text-white/70 font-mono">S</span>
              <span className="text-[8px] text-white/50 font-naskh">باشوور</span>
            </div>

            {/* ڕۆژئاوا */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
              <span className="text-xs font-bold text-white/70 font-mono">W</span>
            </div>

            {/* ئاراستەی کەعبە */}
            <div 
              className="absolute inset-0 flex items-start justify-center pointer-events-none"
              style={{ transform: `rotate(${qiblaAngle}deg)` }}
            >
              <div className="relative -top-3 flex flex-col items-center">
                <div 
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-sm shadow-xl border-2 border-white/20 animate-pulse"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                >
                  🕋
                </div>
                <div 
                  className="w-1 h-20 shadow-md rounded-full mt-1" 
                  style={{ backgroundColor: 'var(--color-gold)' }}
                />
              </div>
            </div>
          </div>

          {/* ناوەندی قیبلەنما */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div 
              className={`w-16 h-16 rounded-full border-2 flex flex-col items-center justify-center shadow-2xl transition-all duration-300 ${
                isFacingQibla 
                  ? 'border-white text-slate-950 scale-105' 
                  : 'border-(--color-gold) text-(--color-gold)'
              }`}
              style={{ 
                backgroundColor: isFacingQibla ? 'var(--color-gold)' : 'var(--bg-chip)' 
              }}
            >
              <span className="text-base font-black font-mono leading-none">
                {currentHeading}°
              </span>
              <span className="text-[9px] font-bold font-naskh mt-0.5 opacity-80">
                {isFacingQibla ? 'قیبلە 🕋' : 'ئاراستە'}
              </span>
            </div>
          </div>
        </div>

        {/* دوگمەکانی ژێر قیبلەنما */}
        <div className="flex items-center gap-2 pt-4 flex-wrap justify-center">
          <button
            type="button"
            onClick={handleRequestCompassPermission}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-sm"
            style={{ 
              backgroundColor: sensorPermissionState === 'granted' ? 'var(--color-gold-muted)' : 'var(--bg-card)', 
              borderColor: sensorPermissionState === 'granted' ? 'var(--color-gold)' : 'var(--border-theme)',
              color: 'var(--color-gold)' 
            }}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>
              {sensorPermissionState === 'granted' ? 'سێنسەر چالاکە ✓' : 'چالاککردنی سێنسەر'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setShowCalibrateModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-sm"
            style={{ 
              backgroundColor: 'var(--bg-card)', 
              borderColor: 'var(--border-theme)',
              color: 'var(--text-main)' 
            }}
          >
            <Crosshair className="w-3.5 h-3.5 text-(--color-gold)" />
            <span>کالیبرەکردن</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSoundAlertEnabled(!soundAlertEnabled);
              showToast(!soundAlertEnabled ? 'دەنگی ئاگاداری چالاک کرا' : 'دەنگی ئاگاداری بێدەنگ کرا');
            }}
            className="w-9 h-9 rounded-2xl flex items-center justify-center border transition-all cursor-pointer active:scale-95 shadow-sm"
            style={{ 
              backgroundColor: soundAlertEnabled ? 'var(--color-gold-muted)' : 'var(--bg-card)', 
              borderColor: soundAlertEnabled ? 'var(--color-gold)' : 'var(--border-theme)',
              color: soundAlertEnabled ? 'var(--color-gold)' : 'var(--text-muted)' 
            }}
          >
            {soundAlertEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ===== سلایدەری سوڕاندنی دەستی ===== */}
      <div 
        className="p-4 rounded-3xl border shadow-sm space-y-3"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
      >
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="font-naskh text-(--text-muted)">
            سوڕاندنی دەستی (بۆ تاقیکردنەوە):
          </span>
          <span className="font-mono text-(--color-gold) font-extrabold text-sm">
            {manualRotation}°
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="360"
          value={manualRotation}
          onChange={(e) => setManualRotation(parseInt(e.target.value, 10))}
          className="w-full accent-(--color-gold) cursor-pointer h-2 rounded-lg"
          style={{ backgroundColor: 'var(--bg-chip)' }}
        />

        <div className="flex items-center justify-between gap-2 pt-1">
          <button
            type="button"
            onClick={() => setManualRotation(prev => (prev - 15 + 360) % 360)}
            className="flex-1 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer active:scale-95"
            style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
          >
            -15°
          </button>

          <button
            type="button"
            onClick={handleResetNorth}
            className="flex-1 py-1.5 rounded-xl border text-xs font-naskh font-bold transition-all cursor-pointer active:scale-95 text-(--color-gold)"
            style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
          >
            باکوور (0°)
          </button>

          <button
            type="button"
            onClick={() => setManualRotation(prev => (prev + 15) % 360)}
            className="flex-1 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer active:scale-95"
            style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
          >
            +15°
          </button>
        </div>
      </div>

      {/* ===== کارتی GPS ===== */}
      <div 
        className="p-4 rounded-3xl border shadow-sm flex items-center justify-between gap-3"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
      >
        <div className="flex items-center gap-2.5">
          <div 
            className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: 'var(--bg-chip)' }}
          >
            <LocateFixed className="w-5 h-5 text-(--color-gold)" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-(--text-main) font-naskh">
              دیاریکردنی شوێن بە GPS
            </h4>
            <p className="text-[11px] text-(--text-muted) font-mono">
              پانی: {selectedCity.latitude.toFixed(2)}° | درێژی: {selectedCity.longitude.toFixed(2)}°
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleUseGPS}
          disabled={isLocatingGPS}
          className="px-4 py-2 rounded-2xl border text-xs font-bold font-naskh transition-all cursor-pointer active:scale-95 shadow-sm disabled:opacity-50"
          style={{ 
            backgroundColor: 'var(--color-gold-muted)', 
            borderColor: 'rgba(242, 201, 76, 0.3)',
            color: 'var(--color-gold)' 
          }}
        >
          {isLocatingGPS ? 'دەدۆزرێتەوە...' : 'شوێنی ئێستا'}
        </button>
      </div>

      {/* ===== مۆداڵی هەڵبژاردنی شار ===== */}
      {showCityPicker && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowCityPicker(false)}
        >
          <div 
            className="w-full max-w-md rounded-3xl p-5 border shadow-2xl space-y-4 max-h-[85vh] flex flex-col"
            style={{ 
              backgroundColor: 'var(--bg-card)', 
              borderColor: 'var(--color-gold)' 
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-(--border-theme)">
              <h3 className="text-base font-bold text-(--text-main) font-naskh flex items-center gap-2">
                <MapPin className="w-4 h-4 text-(--color-gold)" />
                <span>هەڵبژاردنی شار بۆ قیبلە</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowCityPicker(false)}
                className="p-1 rounded-full text-(--text-muted) hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div 
              className="px-3 py-2 rounded-2xl border flex items-center gap-2"
              style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
            >
              <Search className="w-4 h-4 text-(--color-gold) shrink-0" />
              <input
                type="text"
                value={citySearchQuery}
                onChange={(e) => setCitySearchQuery(e.target.value)}
                placeholder="گەڕان بەپێی ناوی شار..."
                className="w-full bg-transparent text-xs text-(--text-main) placeholder-(--text-muted) outline-none"
              />
            </div>

            <div className="space-y-1.5 overflow-y-auto flex-1 pr-1">
              {filteredCities.map((city) => {
                const isSelected = selectedCity.id === city.id;
                const cAngle = getQiblaAngle(city.latitude, city.longitude);
                return (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => {
                      if (onSelectCity) onSelectCity(city);
                      setShowCityPicker(false);
                      showToast(`شار گۆڕدرا بۆ: ${city.nameKu}`);
                    }}
                    className="w-full p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer active:scale-[0.98]"
                    style={{ 
                      backgroundColor: isSelected ? 'var(--color-gold-muted)' : 'var(--bg-chip)',
                      borderColor: isSelected ? 'var(--color-gold)' : 'var(--border-theme)',
                      color: isSelected ? 'var(--color-gold)' : 'var(--text-main)' 
                    }}
                  >
                    <div className="text-start">
                      <span className="text-xs font-bold font-naskh block">
                        {city.nameKu}
                      </span>
                      <span className="text-[10px] text-(--text-muted) font-naskh block">
                        {city.countryKu}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold">
                        {cAngle}°
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-(--color-gold)" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ===== مۆداڵی کالیبرەکردن ===== */}
      {showCalibrateModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowCalibrateModal(false)}
        >
          <div 
            className="w-full max-w-sm rounded-3xl p-6 border shadow-2xl space-y-4"
            style={{ 
              backgroundColor: 'var(--bg-card)', 
              borderColor: 'var(--border-theme)' 
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'var(--bg-chip)' }}
              >
                <Crosshair className="w-5 h-5 text-(--color-gold)" />
              </div>
              <h3 className="text-base font-bold text-(--text-main) font-naskh">
                چۆنیەتی کالیبرەکردنی قیبلەنما
              </h3>
            </div>

            <div className="text-xs text-(--text-muted) space-y-2.5 leading-relaxed font-naskh">
              <p>
                ١. مۆبایلەکەت لەسەر دەستت بە شێوەیەکی ئاسۆیی و ڕێک دابنێ.
              </p>
              <p>
                ٢. مۆبایلەکەت بە هەوادا بە شێوەی ژمارە <strong className="text-(--color-gold)">(8)</strong> چەند جارێک بسوڕێنەوە بۆ ئەوەی سێنسەری موگناتیسی خۆی ڕێکبخاتەوە.
              </p>
              <p>
                ٣. دوور بکەوەرەوە لە کەرەستە و کەلوپەلی ئاسن، سپیکەر و موگناتیس تاکو ئاراستەکە دروست بێت.
              </p>
              <p>
                ٤. ئەگەر سێنسەرەکە هێشتا ناڕێک بوو، مۆبایلەکەت بۆ ماوەیەکی کەم دابنێ و دووبارە هەوڵ بدەرەوە.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowCalibrateModal(false)}
                className="px-5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-md active:scale-95"
                style={{ backgroundColor: 'var(--color-gold)', color: '#031F3C' }}
              >
                تێگەیشتم
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};