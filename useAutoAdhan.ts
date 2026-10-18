import { useEffect, useRef } from 'react';
import { PrayerTimings } from '../types';
import { soundEffects } from '../services/soundEffects';

export const useAutoAdhan = (
  timings: PrayerTimings | null,
  enabled: boolean,
  selectedVoiceId: string,
  isAudioUnlocked: boolean,
  onAzanStart: () => void,
  onAzanEnd: () => void
) => {
  const lastPlayedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!enabled || !timings || !isAudioUnlocked) return;

    const checkTime = () => {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentDay = now.toISOString().split('T')[0];

      const prayers = [
        { key: 'fajr', time: timings.fajr },
        { key: 'dhuhr', time: timings.dhuhr },
        { key: 'asr', time: timings.asr },
        { key: 'maghrib', time: timings.maghrib },
        { key: 'isha', time: timings.isha },
      ];

      for (const prayer of prayers) {
        if (!prayer.time || prayer.time === '--:--') continue;

        const [prayerHours, prayerMinutes] = prayer.time.split(':').map(Number);

        // پشکنینی وردی کات (کاتژمێر و خولەک)
        if (currentHours === prayerHours && currentMinutes === prayerMinutes) {
          const playKey = `${currentDay}-${prayer.key}-${prayerHours}-${prayerMinutes}`;

          if (lastPlayedRef.current !== playKey) {
            lastPlayedRef.current = playKey;
            console.log(`🕌 کاتی بانگ هات: ${prayer.key}`);

            onAzanStart();
            soundEffects.playAdhanVoice(selectedVoiceId, undefined, () => {
              onAzanEnd();
            });
          }
        }
      }
    };

    const interval = setInterval(checkTime, 1000);
    checkTime();

    return () => clearInterval(interval);
  }, [timings, enabled, selectedVoiceId, isAudioUnlocked, onAzanStart, onAzanEnd]);
};