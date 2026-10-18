/**
 * بەشی قیبلە بە کامێرا (AR Qibla).
 */
import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  Compass, 
  Navigation, 
  AlertCircle
} from 'lucide-react';
import { Language, CityInfo } from '../types';
import { getQiblaAngle } from '../services/prayerTimes';

interface ARQiblaViewProps {
  lang: Language;
  selectedCity: CityInfo;
}

export const ARQiblaView: React.FC<ARQiblaViewProps> = ({ lang, selectedCity }) => {
  const isRtl = lang === 'ckb' || lang === 'ar';
  const qiblaAngle = getQiblaAngle(selectedCity.latitude, selectedCity.longitude);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [hasCompassPermission, setHasCompassPermission] = useState<boolean | null>(null);
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  
  // جیاوازی نێوان ئاراستەی ئێستا و قیبلە
  const rawDiff = (qiblaAngle - deviceHeading + 360) % 360;
  const normalizedDiff = rawDiff > 180 ? rawDiff - 360 : rawDiff;
  const isFacingQibla = Math.abs(normalizedDiff) <= 5; // ٥ پلە لێواری هەڵە

  // ١. داواکردنی مۆڵەتی کامێرا
  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }, // کامێرای پشتەوە
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCameraPermission(true);
      } catch (err) {
        setHasCameraPermission(false);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // ٢. داواکردنی مۆڵەتی سێنسەری ئاراستە (Compass)
  useEffect(() => {
    const requestCompass = async () => {
      const DeviceOrientation = (window as any).DeviceOrientationEvent;
      if (DeviceOrientation && typeof DeviceOrientation.requestPermission === 'function') {
        try {
          const response = await DeviceOrientation.requestPermission();
          if (response === 'granted') {
            setHasCompassPermission(true);
          } else {
            setHasCompassPermission(false);
          }
        } catch (err) {
          setHasCompassPermission(false);
        }
      } else if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
        setHasCompassPermission(true);
      } else {
        setHasCompassPermission(false);
      }
    };

    requestCompass();
  }, []);

  // ٣. گوێگرتن بۆ سێنسەرەکە
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      let heading: number | null = null;
      const anyEvent = e as any;

      // iOS
      if (typeof anyEvent.webkitCompassHeading === 'number') {
        heading = anyEvent.webkitCompassHeading;
      } 
      // Android
      else if (e.alpha !== null && e.alpha !== undefined) {
        heading = (360 - e.alpha + 360) % 360;
      }

      if (heading !== null && !isNaN(heading)) {
        setDeviceHeading(Math.round(heading));
      }
    };

    if (hasCompassPermission && typeof window !== 'undefined') {
      window.addEventListener('deviceorientationabsolute' as any, handleOrientation, true);
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('deviceorientationabsolute' as any, handleOrientation, true);
        window.removeEventListener('deviceorientation', handleOrientation, true);
      }
    };
  }, [hasCompassPermission]);

  // ئەگەر مۆڵەتی کامێرا نەبوو
  if (hasCameraPermission === false) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4 px-6">
        <div className="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-rose-400" />
        </div>
        <h2 className="text-lg font-bold text-(--text-main) font-naskh">
          مۆڵەتی کامێرا پێویستە
        </h2>
        <p className="text-sm text-(--text-muted) font-kurdish leading-relaxed">
          بۆ بەکارهێنانی ئەم تایبەتمەندییە، تکایە ڕێگە بە ئەپەکە بدە کە کامێرا بەکاربهێنێت.
        </p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full bg-black overflow-hidden select-none z-50" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* ڤیدیۆی کامێرا */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* پۆشەرێکی تاریک بۆ ئەوەی ARـەکە دیار بێت */}
      <div className={`absolute inset-0 transition-colors duration-500 pointer-events-none ${isFacingQibla ? 'bg-(--color-gold)/20' : 'bg-black/30'}`} />

      {/* ناوەندی شاشە - ئایکۆنی کەعبە */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className={`relative flex flex-col items-center justify-center transition-all duration-300 ${
            isFacingQibla ? 'scale-110' : 'scale-100'
          }`}
        >
          {/* بازنەی دەرەوە */}
          <div 
            className={`w-48 h-48 rounded-full border-4 border-dashed flex items-center justify-center transition-all duration-300 ${
              isFacingQibla 
                ? 'border-(--color-gold) rotate-0 scale-110 shadow-[0_0_50px_rgba(242,201,76,0.6)] bg-(--color-gold)/10' 
                : 'border-white/40 rotate-45'
            }`}
            style={{
              animation: isFacingQibla ? 'pulse 2s infinite' : 'spin 10s linear infinite'
            }}
          >
            {/* کەعبە */}
            <div 
              className={`text-6xl transition-all duration-300 drop-shadow-2xl ${
                isFacingQibla ? 'animate-bounce' : ''
              }`}
            >
              🕋
            </div>
          </div>

          {/* نیشانەی ئاراستە */}
          <div 
            className="absolute top-0 w-1 h-12 rounded-full -mt-12 transition-colors duration-300"
            style={{ 
              backgroundColor: isFacingQibla ? 'var(--color-gold)' : 'white',
              boxShadow: isFacingQibla ? '0 0 20px var(--color-gold)' : 'none'
            }}
          />
        </div>
      </div>

      {/* زانیاری سەرەوە */}
      <div className="absolute top-0 inset-x-0 p-6 flex flex-col items-center justify-start pointer-events-none space-y-2 pt-20">
        <div 
          className="px-4 py-2 rounded-full backdrop-blur-md border flex items-center gap-2 shadow-lg transition-colors duration-300"
          style={{ 
            backgroundColor: isFacingQibla ? 'rgba(242, 201, 76, 0.9)' : 'rgba(0, 0, 0, 0.5)',
            borderColor: isFacingQibla ? 'var(--color-gold)' : 'rgba(255,255,255,0.2)',
            color: isFacingQibla ? '#031F3C' : 'white'
          }}
        >
          <Compass className={`w-4 h-4 ${isFacingQibla ? 'text-[#031F3C]' : 'text-(--color-gold)'}`} />
          <span className="text-xs font-bold font-naskh">
            {isFacingQibla ? 'ڕاستەوخۆ بەرەو قیبلەیت! 🕋' : `گۆشەی قیبلە: ${qiblaAngle}°`}
          </span>
        </div>

        {!isFacingQibla && hasCompassPermission && (
          <div className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-[10px] font-kurdish border border-white/20 flex items-center gap-1">
            <Navigation className="w-3 h-3 animate-spin" style={{ animationDuration: '3s' }} />
            <span>
              {normalizedDiff > 0 ? 'بسوڕێ بۆ لای چەپ' : 'بسوڕێ بۆ لای ڕاست'} 
              ({Math.abs(normalizedDiff)}°)
            </span>
          </div>
        )}
      </div>

      {/* خوارەوە - پلەی ئاراستە */}
      <div className="absolute bottom-10 inset-x-0 flex flex-col items-center justify-end pointer-events-none px-6 space-y-2">
        <div className="px-4 py-2 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 shadow-xl text-center">
          <p className="text-[10px] text-white/60 font-kurdish mb-0.5">ئاراستەی ئێستای مۆبایل</p>
          <p className="text-2xl font-black font-mono text-white">
            {deviceHeading}°
          </p>
        </div>
      </div>

      {/* ئەگەر سێنسەر نەبوو */}
      {hasCompassPermission === false && (
        <div className="absolute inset-x-4 bottom-24 p-3 rounded-2xl bg-rose-500/90 backdrop-blur-md text-white text-xs font-kurdish shadow-lg flex items-start gap-2 z-10">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <p>سێنسەری ئاراستە بەردەست نییە. تکایە لە ڕێکخستنەکانی مۆبایلەکەت مۆڵەتی Motion & Orientation بدە.</p>
        </div>
      )}
    </div>
  );
};