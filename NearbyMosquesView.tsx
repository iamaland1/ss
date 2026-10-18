/**
 * بەشی دۆزینەوەی نزیکترین مزگەوتەکان لەسەر نەخشە.
 */
import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Navigation, 
  Loader2, 
  Search,
  Compass,
  AlertCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Language } from '../types';
import { findNearbyMosques, Mosque } from '../services/mosqueFinder';

// چاککردنی ئایکۆنی مارکەری Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// ئایکۆنی تایبەت بۆ مزگەوت
const mosqueIcon = new L.DivIcon({
  className: 'custom-mosque-icon',
  html: `<div style="
    background-color: #F2C94C;
    width: 32px;
    height: 32px;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    border: 3px solid #031F3C;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  ">
    <span style="transform: rotate(45deg); font-size: 16px;">🕌</span>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// ئایکۆنی تایبەت بۆ شوێنی بەکارهێنەر
const userIcon = new L.DivIcon({
  className: 'custom-user-icon',
  html: `<div style="
    background-color: #3DBE9C;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 4px solid white;
    box-shadow: 0 0 0 4px rgba(61, 190, 156, 0.3), 0 4px 12px rgba(0,0,0,0.3);
    animation: pulse 2s infinite;
  "></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// کۆمپۆنێنتێک بۆ گۆڕینی نەخشە کاتێک شوێن دەگۆڕێت
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

interface NearbyMosquesViewProps {
  lang: Language;
}

export const NearbyMosquesView: React.FC<NearbyMosquesViewProps> = ({ lang }) => {
  const isRtl = lang === 'ckb' || lang === 'ar';

  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [radius, setRadius] = useState<number>(5);
  const [selectedMosque, setSelectedMosque] = useState<Mosque | null>(null);

  // دۆزینەوەی شوێنی بەکارهێنەر
  const locateUser = () => {
    if (!navigator.geolocation) {
      setError('GPS لەم وێبگەڕەدا پشتگیری ناکرێت');
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        searchMosques(latitude, longitude);
      },
      (err) => {
        setIsLoading(false);
        setError('نەتوانرا شوێنی تۆ دیاری بکرێت. تکایە مۆڵەتی شوێن بدە.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // گەڕان بۆ مزگەوتەکان
  const searchMosques = async (lat: number, lng: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const results = await findNearbyMosques(lat, lng, radius);
      setMosques(results);

      if (results.length === 0) {
        setError('هیچ مزگەوتێک لەم ناوچەیەدا نەدۆزرایەوە. تکایە ڕادیۆسەکە گەورەتر بکە.');
      }
    } catch (err) {
      setError('هەڵەیەک ڕوویدا لە گەڕان بۆ مزگەوتەکان');
    } finally {
      setIsLoading(false);
    }
  };

  // گەڕانەوە بۆ شوێنی بەکارهێنەر کاتێک ڕادیۆس دەگۆڕێت
  useEffect(() => {
    if (userLocation) {
      searchMosques(userLocation[0], userLocation[1]);
    }
  }, [radius]);

  // کردنەوەی نەخشەی گووگڵ بۆ مزگەوت
  const openInGoogleMaps = (mosque: Mosque) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${mosque.latitude},${mosque.longitude}`;
    window.open(url, '_blank');
  };

  return (
    <div 
      className="w-full max-w-4xl mx-auto space-y-4 animate-fadeIn pb-28 text-(--text-main) font-kurdish"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* کارتی سەرەوە */}
      <div 
        className="p-5 rounded-3xl border shadow-lg space-y-4 relative overflow-hidden"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: 'var(--color-gold)' }} />

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner shrink-0" style={{ backgroundColor: 'var(--color-gold-muted)' }}>
            <Compass className="w-7 h-7 text-(--color-gold)" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-naskh tracking-tight" style={{ color: 'var(--color-gold)' }}>
              نزیکترین مزگەوتەکان
            </h1>
            <p className="text-xs text-(--text-muted) font-kurdish">
              مزگەوتەکان لە دەوروبەری شوێنی ئێستای تۆ بدۆزەرەوە
            </p>
          </div>
        </div>
      </div>

      {/* کۆنترۆڵەکان */}
      <div 
        className="p-4 rounded-3xl border shadow-sm space-y-3"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
      >
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={locateUser}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-sm transition-all cursor-pointer active:scale-95 disabled:opacity-50 shadow-md"
            style={{ backgroundColor: 'var(--color-gold)', color: '#031F3C' }}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
            <span className="font-naskh">{isLoading ? 'دەدۆزرێتەوە...' : 'شوێنی من بدۆزەرەوە'}</span>
          </button>

          <div className="flex items-center gap-1.5 ms-auto">
            <span className="text-[10px] text-(--text-muted) font-kurdish">ڕادیۆس:</span>
            {[2, 5, 10, 25].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRadius(r)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  radius === r ? 'shadow-sm' : ''
                }`}
                style={
                  radius === r
                    ? { backgroundColor: 'var(--color-gold)', color: '#031F3C' }
                    : { backgroundColor: 'var(--bg-chip)', color: 'var(--text-muted)' }
                }
              >
                {r} کم
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-2xl border flex items-start gap-2" style={{ backgroundColor: 'rgba(244, 63, 94, 0.1)', borderColor: 'rgba(244, 63, 94, 0.3)' }}>
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <p className="text-xs text-rose-400 font-kurdish">{error}</p>
          </div>
        )}
      </div>

      {/* نەخشە و لیست */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* نەخشە */}
        <div 
          className="rounded-3xl overflow-hidden border shadow-lg h-100 lg:h-125"
          style={{ borderColor: 'var(--border-theme)' }}
        >
          {userLocation ? (
            <MapContainer
              center={userLocation}
              zoom={14}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapUpdater center={userLocation} />
              
              {/* مارکەری شوێنی بەکارهێنەر */}
              <Marker position={userLocation} icon={userIcon}>
                <Popup>
                  <div className="text-center font-kurdish">
                    <strong>شوێنی تۆ</strong>
                  </div>
                </Popup>
              </Marker>

              {/* مارکەری مزگەوتەکان */}
              {mosques.map((mosque) => (
                <Marker
                  key={mosque.id}
                  position={[mosque.latitude, mosque.longitude]}
                  icon={mosqueIcon}
                  eventHandlers={{
                    click: () => setSelectedMosque(mosque),
                  }}
                >
                  <Popup>
                    <div className="space-y-1 font-kurdish" style={{ minWidth: '150px' }}>
                      <strong className="text-sm">{mosque.name}</strong>
                      {mosque.address && (
                        <p className="text-xs text-gray-600">{mosque.address}</p>
                      )}
                      <p className="text-xs font-bold" style={{ color: '#F2C94C' }}>
                        {mosque.distance.toFixed(2)} کم
                      </p>
                      <button
                        onClick={() => openInGoogleMaps(mosque)}
                        className="text-xs text-blue-600 underline"
                      >
                        ئاراستە بکە →
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          ) : (
            <div 
              className="h-full flex flex-col items-center justify-center gap-3 p-6 text-center"
              style={{ backgroundColor: 'var(--bg-card)' }}
            >
              <MapPin className="w-12 h-12 text-(--color-gold) opacity-50" />
              <p className="text-sm text-(--text-muted) font-kurdish">
                تکایە شوێنی خۆت بدۆزەرەوە بۆ بینینی نەخشە
              </p>
            </div>
          )}
        </div>

        {/* لیستی مزگەوتەکان */}
        <div 
          className="rounded-3xl border shadow-lg p-4 space-y-2 max-h-100 lg:max-h-125 overflow-y-auto"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
        >
          <h3 className="text-sm font-bold text-(--text-main) font-naskh flex items-center gap-1.5 mb-2">
            <Search className="w-4 h-4 text-(--color-gold)" />
            لیستی مزگەوتەکان ({mosques.length})
          </h3>

          {mosques.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-xs text-(--text-muted) font-kurdish">
                هێشتا هیچ مزگەوتێک نەدۆزراوەتەوە
              </p>
            </div>
          ) : (
            mosques.map((mosque, idx) => (
              <button
                key={mosque.id}
                type="button"
                onClick={() => setSelectedMosque(mosque)}
                className="w-full p-3 rounded-2xl border text-start transition-all hover:border-(--color-gold) cursor-pointer"
                style={{ 
                  backgroundColor: selectedMosque?.id === mosque.id ? 'var(--color-gold-muted)' : 'var(--bg-chip)', 
                  borderColor: selectedMosque?.id === mosque.id ? 'var(--color-gold)' : 'var(--border-theme)' 
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold font-mono shrink-0" style={{ backgroundColor: 'var(--color-gold)', color: '#031F3C' }}>
                      {idx + 1}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-(--text-main) font-naskh truncate">
                        {mosque.name}
                      </h4>
                      {mosque.address && (
                        <p className="text-[10px] text-(--text-muted) truncate">{mosque.address}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold font-mono shrink-0" style={{ color: 'var(--color-gold)' }}>
                    {mosque.distance.toFixed(2)} کم
                  </span>
                </div>
              </button>
            ))
          )}

          {selectedMosque && (
            <div 
              className="p-3 rounded-2xl border mt-2"
              style={{ backgroundColor: 'var(--color-gold-muted)', borderColor: 'var(--color-gold)' }}
            >
              <h4 className="text-sm font-bold text-(--text-main) font-naskh mb-1">
                {selectedMosque.name}
              </h4>
              <p className="text-[10px] text-(--text-muted) mb-2">
                دووری: {selectedMosque.distance.toFixed(2)} کم
              </p>
              <button
                type="button"
                onClick={() => openInGoogleMaps(selectedMosque)}
                className="w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
                style={{ backgroundColor: 'var(--color-gold)', color: '#031F3C' }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="font-naskh">ئاراستەکردن لە Google Maps</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* تێبینی */}
      <div 
        className="p-3 rounded-2xl border text-[11px] text-(--text-muted) leading-relaxed flex gap-2"
        style={{ backgroundColor: 'var(--color-gold-muted)', borderColor: 'rgba(242, 201, 76, 0.3)' }}
      >
        <Sparkles className="w-3.5 h-3.5 text-(--color-gold) shrink-0 mt-0.5" />
        <p>
          <strong className="text-(--color-gold)">تێبینی:</strong> زانیاری مزگەوتەکان لە OpenStreetMap وەرگیراون کە خۆڕاییە و لەلایەن خۆبەخشانەوە نوێ دەکرێتەوە. ئەگەر مزگەوتێک لە ناوچەکەتدا نەدۆزرایەوە، ڕەنگە هێشتا لە نەخشەکەدا تۆمار نەکرابێت.
        </p>
      </div>
    </div>
  );
};