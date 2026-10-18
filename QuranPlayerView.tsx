/**
 * بەشی پلەیەری دەنگی قورئان بە دەنگی قورئانخوێنە بەناوبانگەکان.
 */
import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Mic2, 
  ListMusic,
  Search,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock
} from 'lucide-react';
import { Language, SurahMeta, Reciter } from '../types';
import { SURAH_LIST } from '../data/quranData';
import { RECITERS } from '../data/reciters';

interface QuranPlayerViewProps {
  lang: Language;
}

export const QuranPlayerView: React.FC<QuranPlayerViewProps> = ({ lang }) => {
  const isRtl = lang === 'ckb' || lang === 'ar';

  const [selectedReciter, setSelectedReciter] = useState<Reciter>(RECITERS[0]);
  const [activeSurah, setActiveSurah] = useState<SurahMeta>(SURAH_LIST[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showReciterPicker, setShowReciterPicker] = useState(false);
  const [showSurahPicker, setShowSurahPicker] = useState(false);
  
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentAyah, setCurrentAyah] = useState(1);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getAudioUrl = (reciter: Reciter, surahNumber: number, ayahNumber: number) => {
    const s = surahNumber.toString().padStart(3, '0');
    const a = ayahNumber.toString().padStart(3, '0');
    return `${reciter.serverUrl}/${s}${a}.mp3`;
  };

  useEffect(() => {
    setCurrentAyah(1);
    loadAyah(1, false);
  }, [activeSurah, selectedReciter]);

  const loadAyah = (ayahNumber: number, autoPlay: boolean = true) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const url = getAudioUrl(selectedReciter, activeSurah.number, ayahNumber);
    const audio = new Audio(url);
    audioRef.current = audio;
    
    audio.volume = isMuted ? 0 : volume;
    audio.playbackRate = playbackRate;
    
    audio.onloadedmetadata = () => {
      setDuration(audio.duration || 0);
    };

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.onended = () => {
      if (ayahNumber < activeSurah.numberOfAyahs) {
        const nextAyah = ayahNumber + 1;
        setCurrentAyah(nextAyah);
        loadAyah(nextAyah, true);
      } else {
        setIsPlaying(false);
        setCurrentTime(0);
      }
    };

    if (autoPlay) {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleNextAyah = () => {
    if (currentAyah < activeSurah.numberOfAyahs) {
      const next = currentAyah + 1;
      setCurrentAyah(next);
      loadAyah(next, isPlaying);
    }
  };

  const handlePrevAyah = () => {
    if (currentAyah > 1) {
      const prev = currentAyah - 1;
      setCurrentAyah(prev);
      loadAyah(prev, isPlaying);
    }
  };

  const handleSpeedChange = () => {
    const speeds = [0.75, 1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackRate);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    setPlaybackRate(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
    if (vol > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (audioRef.current) {
      audioRef.current.volume = newMuted ? 0 : volume;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredSurahs = SURAH_LIST.filter(s => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      s.number.toString() === q ||
      s.nameAr.includes(q) ||
      s.nameKu.includes(q) ||
      s.nameEn.toLowerCase().includes(q)
    );
  });

  return (
    <div 
      className="w-full max-w-3xl mx-auto space-y-5 animate-fadeIn pb-32 text-(--text-main) font-kurdish"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* ===== کارتی سەرەوە ===== */}
      <div 
        className="p-5 rounded-3xl border shadow-lg space-y-4 relative overflow-hidden"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
      >
        <div 
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: 'var(--color-gold)' }}
        />

        <div className="flex items-center gap-3 relative z-10">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner shrink-0 relative"
            style={{ backgroundColor: 'var(--color-gold-muted)' }}
          >
            <BookOpen className="w-7 h-7 text-(--color-gold)" />
          </div>
          <div>
            <h1 
              className="text-2xl font-bold font-naskh tracking-tight"
              style={{ color: 'var(--color-gold)' }}
            >
              قورئانی دەنگی
            </h1>
            <p className="text-xs text-(--text-muted) font-kurdish">
              گوێگرتن لە قورئانی پیرۆز بە دەنگی قورئانخوێنە بەناوبانگەکان
            </p>
          </div>
        </div>
      </div>

      {/* ===== هەڵبژاردنی قورئانخوێن ===== */}
      <button
        type="button"
        onClick={() => setShowReciterPicker(!showReciterPicker)}
        className="w-full p-4 rounded-3xl border text-start flex items-center justify-between gap-3 cursor-pointer transition-all hover:border-(--color-gold)"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm"
            style={{ backgroundColor: 'var(--color-gold-muted)' }}
          >
            <Mic2 className="w-5 h-5 text-(--color-gold)" />
          </div>
          <div>
            <span className="text-[10px] text-(--text-muted) font-kurdish block">قورئانخوێن</span>
            <span className="text-sm font-bold text-(--text-main) font-naskh">
              {selectedReciter.nameKu}
            </span>
          </div>
        </div>
        {showReciterPicker ? <ChevronUp className="w-5 h-5 text-(--text-muted)" /> : <ChevronDown className="w-5 h-5 text-(--text-muted)" />}
      </button>

      {showReciterPicker && (
        <div 
          className="p-3 rounded-3xl border shadow-lg space-y-2 animate-fadeIn"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
        >
          {RECITERS.map((reciter) => {
            const isSelected = selectedReciter.id === reciter.id;
            return (
              <button
                key={reciter.id}
                onClick={() => {
                  setSelectedReciter(reciter);
                  setShowReciterPicker(false);
                }}
                className={`w-full p-3 rounded-2xl text-start flex items-center justify-between gap-2 transition-all cursor-pointer ${
                  isSelected ? 'shadow-sm' : 'hover:bg-white/5'
                }`}
                style={
                  isSelected
                    ? { backgroundColor: 'var(--color-gold-muted)', border: '1px solid var(--color-gold)' }
                    : { backgroundColor: 'var(--bg-chip)', border: '1px solid var(--border-theme)' }
                }
              >
                <div>
                  <span className={`text-xs font-bold font-naskh block ${isSelected ? 'text-(--color-gold)' : 'text-(--text-main)'}`}>
                    {reciter.nameKu}
                  </span>
                  <span className="text-[10px] text-(--text-muted) font-mono">{reciter.nameEn}</span>
                </div>
                {isSelected && <div className="w-2 h-2 rounded-full bg-(--color-gold)" />}
              </button>
            );
          })}
        </div>
      )}

      {/* ===== هەڵبژاردنی سورە ===== */}
      <button
        type="button"
        onClick={() => setShowSurahPicker(!showSurahPicker)}
        className="w-full p-4 rounded-3xl border text-start flex items-center justify-between gap-3 cursor-pointer transition-all hover:border-(--color-gold)"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm"
            style={{ backgroundColor: 'var(--color-gold-muted)' }}
          >
            <ListMusic className="w-5 h-5 text-(--color-gold)" />
          </div>
          <div>
            <span className="text-[10px] text-(--text-muted) font-kurdish block">سورە</span>
            <span className="text-sm font-bold text-(--text-main) font-naskh">
              {activeSurah.nameKu} ({activeSurah.numberOfAyahs} ئایەت)
            </span>
          </div>
        </div>
        {showSurahPicker ? <ChevronUp className="w-5 h-5 text-(--text-muted)" /> : <ChevronDown className="w-5 h-5 text-(--text-muted)" />}
      </button>

      {showSurahPicker && (
        <div 
          className="p-3 rounded-3xl border shadow-lg space-y-3 animate-fadeIn"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
        >
          <div 
            className="rounded-2xl border px-3 py-2 flex items-center gap-2"
            style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
          >
            <Search className="w-4 h-4 text-(--color-gold)" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="گەڕان بۆ سورە..."
              className="w-full bg-transparent text-xs text-(--text-main) outline-none font-kurdish"
            />
          </div>
          
          <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1">
            {filteredSurahs.map((surah) => {
              const isSelected = activeSurah.number === surah.number;
              return (
                <button
                  key={surah.number}
                  onClick={() => {
                    setActiveSurah(surah);
                    setShowSurahPicker(false);
                  }}
                  className={`w-full p-2.5 rounded-2xl text-start flex items-center justify-between gap-2 transition-all cursor-pointer ${
                    isSelected ? 'shadow-sm' : 'hover:bg-white/5'
                  }`}
                  style={
                    isSelected
                      ? { backgroundColor: 'var(--color-gold-muted)', border: '1px solid var(--color-gold)' }
                      : { backgroundColor: 'var(--bg-chip)', border: '1px solid var(--border-theme)' }
                  }
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold font-mono"
                      style={{ backgroundColor: isSelected ? 'var(--color-gold)' : 'var(--bg-page)', color: isSelected ? '#031F3C' : 'var(--text-muted)' }}
                    >
                      {surah.number}
                    </div>
                    <span className={`text-xs font-bold font-naskh ${isSelected ? 'text-(--color-gold)' : 'text-(--text-main)'}`}>
                      {surah.nameKu}
                    </span>
                  </div>
                  <span className="text-[10px] text-(--text-muted) font-kurdish">{surah.numberOfAyahs} ئایەت</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ===== پلەیەری سەرەکی ===== */}
      <div 
        className="p-6 rounded-3xl border shadow-xl space-y-6 relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, var(--color-gold-muted) 0%, var(--bg-card) 100%)',
          borderColor: 'var(--color-gold)' 
        }}
      >
        <div 
          className="absolute -top-10 -left-10 w-40 h-40 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ backgroundColor: 'var(--color-gold)' }}
        />

        <div className="relative z-10 space-y-6 text-center">
          <div>
            <h2 className="text-2xl font-bold font-naskh text-(--color-gold)">
              {activeSurah.nameAr}
            </h2>
            <p className="text-xs text-(--text-muted) font-kurdish mt-1">
              {activeSurah.nameKu} • ئایەتی {currentAyah} لە {activeSurah.numberOfAyahs}
            </p>
          </div>

          <div className="space-y-1">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full accent-(--color-gold) cursor-pointer h-1.5 rounded-lg appearance-none"
              style={{ backgroundColor: 'var(--bg-chip)' }}
            />
            <div className="flex items-center justify-between text-[10px] text-(--text-muted) font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrevAyah}
              disabled={currentAyah === 1}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95 disabled:opacity-30 text-(--text-main)"
              style={{ backgroundColor: 'var(--bg-chip)' }}
            >
              <SkipForward className="w-5 h-5" />
            </button>

            <button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-lg"
              style={{ backgroundColor: 'var(--color-gold)', color: '#031F3C' }}
            >
              {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ms-1" />}
            </button>

            <button
              onClick={handleNextAyah}
              disabled={currentAyah === activeSurah.numberOfAyahs}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95 disabled:opacity-30 text-(--text-main)"
              style={{ backgroundColor: 'var(--bg-chip)' }}
            >
              <SkipBack className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-4 pt-4 border-t border-(--border-theme)/50">
            <button
              onClick={handleSpeedChange}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all active:scale-95"
              style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)', color: 'var(--color-gold)' }}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{playbackRate}x</span>
            </button>

            <div className="flex items-center gap-2 flex-1 max-w-30">
              <button onClick={toggleMute} className="text-(--text-muted)">
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full accent-(--color-gold) cursor-pointer h-1 rounded-lg appearance-none"
                style={{ backgroundColor: 'var(--bg-chip)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};