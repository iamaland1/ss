/**
 * پێکهاتەی هەڵبژاردنی شوێن لەسەر نەخشە.
 */
import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Compass, 
  Crosshair, 
  Info,
  Check,
  Search,
  Globe
} from 'lucide-react';
import { CityInfo, Language } from '../types';
import { CITIES } from '../data/cities';
import { getDistanceToKaaba, getQiblaAngle } from '../services/prayerTimes';

interface InteractiveMapPickerProps {
  lang: Language;
  selectedCity: CityInfo;
  onSelectCity: (city: CityInfo) => void;
}

export const InteractiveMapPicker: React.FC<InteractiveMapPickerProps> = ({
  lang,
  selectedCity,
  onSelectCity,
}) => {
  const [isLocating, setIsLocating] = useState(false);
  const [gpsError, setGpsError] = useState('');
  const [manualSearch, setManualSearch] = useState('');

  // Geographic bounds for Kurdistan / Iraq / Middle East region
  const MIN_LAT = 21.0; // Near Makkah
  const MAX_LAT = 38.5; // Northern Kurdistan (Zakho/Duhok border)
  const MIN_LNG = 38.0; // West
  const MAX_LNG = 48.5; // East

  // Map projection helpers
  const latToPercent = (lat: number) => {
    const clamped = Math.max(MIN_LAT, Math.min(MAX_LAT, lat));
    return 100 - ((clamped - MIN_LAT) / (MAX_LAT - MIN_LAT)) * 100;
  };

  const lngToPercent = (lng: number) => {
    const clamped = Math.max(MIN_LNG, Math.min(MAX_LNG, lng));
    return ((clamped - MIN_LNG) / (MAX_LNG - MIN_LNG)) * 100;
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPct = Math.max(0, Math.min(1, x / rect.width));
    const yPct = Math.max(0, Math.min(1, y / rect.height));

    const clickedLat = Number((MAX_LAT - yPct * (MAX_LAT - MIN_LAT)).toFixed(4));
    const clickedLng = Number((MIN_LNG + xPct * (MAX_LNG - MIN_LNG)).toFixed(4));

    const customCity: CityInfo = {
      id: `custom-${Date.now()}`,
      nameKu: `شوێنی دیاریکراو (${clickedLat}°, ${clickedLng}°)`,
      nameAr: `موقع محدد (${clickedLat}°, ${clickedLng}°)`,
      nameEn: `Custom Pin (${clickedLat}°, ${clickedLng}°)`,
      countryKu: 'کوردستان / عێراق',
      countryAr: 'إقليم كردستان',
      countryEn: 'Custom Location',
      latitude: clickedLat,
      longitude: clickedLng,
      timezone: 'Asia/Baghdad'
    };

    onSelectCity(customCity);
  };

  const handleUseGPS = () => {
    if (!navigator.geolocation) {
      setGpsError('وێبگەڕەکەت پشتگیری لە دیاریکردنی شوێن (GPS) ناکات.');
      return;
    }

    setIsLocating(true);
    setGpsError('');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = Number(pos.coords.latitude.toFixed(4));
        const lng = Number(pos.coords.longitude.toFixed(4));

        const gpsCity: CityInfo = {
          id: 'gps-current',
          nameKu: 'شوێنی ئێستات (GPS)',
          nameAr: 'موقعك الحالي (GPS)',
          nameEn: 'Current Location (GPS)',
          countryKu: 'کوردستان / عێراق',
          countryAr: 'الموقع الجغرافي',
          countryEn: 'Custom GPS',
          latitude: lat,
          longitude: lng,
          timezone: 'Asia/Baghdad'
        };

        onSelectCity(gpsCity);
        setIsLocating(false);
      },
      () => {
        setGpsError('دەستگەیشتن بە شوێن ڕەتکرایەوە. دەتوانیت شارەکەت لە لیستەکەدا یان لەسەر نەخشەکە هەڵبژێریت.');
        setIsLocating(false);
      },
      { timeout: 9000, enableHighAccuracy: true }
    );
  };

  const distanceKm = getDistanceToKaaba(selectedCity.latitude, selectedCity.longitude);
  const qiblaAngle = getQiblaAngle(selectedCity.latitude, selectedCity.longitude);

  const filteredCities = CITIES.filter(c => {
    const q = manualSearch.trim().toLowerCase();
    if (!q) return true;
    return (
      c.nameKu.includes(q) ||
      c.nameAr.includes(q) ||
      c.nameEn.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4">
      {/* City Dropdown & GPS Detect Action */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute inset-s-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={manualSearch}
            onChange={(e) => setManualSearch(e.target.value)}
            placeholder="گەڕان لە شارەکان (سلێمانی، هەولێر، دهۆک، کەرکووک...)"
            className="w-full ps-9 pe-3 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-medium text-slate-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <button
          type="button"
          onClick={handleUseGPS}
          disabled={isLocating}
          className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer"
        >
          <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
          <span>{isLocating ? 'دیاریکردنی شوێن...' : 'شوێنی خۆکار (GPS)'}</span>
        </button>
      </div>

      {gpsError && (
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-300">
          {gpsError}
        </div>
      )}

      {/* Interactive Visual Regional Map */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
          <span>نەخشەی هەرێم و ناوچەکە (لەسەر نەخشە کلیک بکە بۆ دانانی نیشانە):</span>
          <span className="font-mono text-[11px] font-bold text-emerald-600">
            {selectedCity.latitude}° N, {selectedCity.longitude}° E
          </span>
        </div>

        <div 
          onClick={handleMapClick}
          className="relative w-full h-64 sm:h-72 rounded-2xl bg-linear-to-br from-slate-900 via-slate-950 to-zinc-900 border-2 border-emerald-600/30 overflow-hidden cursor-crosshair select-none shadow-inner"
        >
          {/* Subtle Map Grid lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] bg-size-[24px_24px] opacity-15 pointer-events-none" />

          {/* Stylized Topography contour outlines */}
          <div className="absolute top-4 inset-x-8 h-28 rounded-full border border-emerald-500/10 pointer-events-none" />
          <div className="absolute bottom-6 inset-e-10 w-40 h-28 rounded-full border border-amber-400/10 pointer-events-none" />

          {/* Region Landmark Labels */}
          <div className="absolute top-3 inset-e-4 text-[10px] font-bold text-emerald-400/60 uppercase tracking-widest pointer-events-none">
            کوردستان • کوردستان
          </div>
          <div className="absolute bottom-3 inset-s-4 text-[10px] font-bold text-amber-400/60 uppercase tracking-widest pointer-events-none">
            مەککەی پیرۆز 🕋
          </div>

          {/* Fixed Quick City Anchor Badges */}
          {CITIES.slice(0, 8).map((city) => {
            const isSelected = selectedCity.id === city.id;
            const topPct = latToPercent(city.latitude);
            const leftPct = lngToPercent(city.longitude);

            return (
              <button
                key={city.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectCity(city);
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded-md text-[9px] font-bold flex items-center gap-1 transition-transform hover:scale-110 z-10 ${
                  isSelected
                    ? 'bg-amber-400 text-zinc-950 ring-2 ring-white shadow-lg'
                    : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800 hover:bg-emerald-800'
                }`}
                style={{ top: `${topPct}%`, left: `${leftPct}%` }}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-zinc-950' : 'bg-emerald-400'}`} />
                <span>{lang === 'ckb' ? city.nameKu : city.nameEn}</span>
              </button>
            );
          })}

          {/* Current Active Pin (Glowing Pin) */}
          <div 
            className="absolute -translate-x-1/2 -translate-y-full pointer-events-none transition-all duration-300 z-20 flex flex-col items-center"
            style={{ 
              top: `${latToPercent(selectedCity.latitude)}%`, 
              left: `${lngToPercent(selectedCity.longitude)}%` 
            }}
          >
            <div className="relative">
              <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-75"></span>
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg border-2 border-white">
                <MapPin className="w-4 h-4" />
              </div>
            </div>
            <div className="bg-zinc-950/90 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow border border-emerald-500/50 mt-1 whitespace-nowrap">
              {lang === 'ckb' ? selectedCity.nameKu : selectedCity.nameEn}
            </div>
          </div>
        </div>
      </div>

      {/* Selected City Details Strip */}
      <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs">
        <div>
          <span className="font-bold text-slate-800 dark:text-zinc-100 block">
            {lang === 'ckb' ? selectedCity.nameKu : selectedCity.nameEn} ({selectedCity.latitude}°, {selectedCity.longitude}°)
          </span>
          <span className="text-[11px] text-slate-500 dark:text-zinc-400">
            دووری لە کەعبە: <strong className="font-mono text-emerald-600">{distanceKm.toLocaleString()} کم</strong> • گۆشەی قیبلە: <strong className="font-mono text-emerald-600">{qiblaAngle}°</strong>
          </span>
        </div>
        <div className="flex items-center gap-1 text-emerald-700 dark:text-emerald-300 font-bold">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>هەڵبژێردرا</span>
        </div>
      </div>

      {/* Filtered City Buttons */}
      <div className="space-y-1">
        <span className="text-xs font-semibold text-slate-600 dark:text-zinc-400 block">
          شارە خێراکان:
        </span>
        <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1">
          {filteredCities.map((city) => {
            const isSelected = selectedCity.id === city.id;
            return (
              <button
                key={city.id}
                type="button"
                onClick={() => onSelectCity(city)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-50'
                }`}
              >
                {lang === 'ckb' ? city.nameKu : city.nameEn}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
