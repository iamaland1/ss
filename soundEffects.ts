/**
 * بەڕێوەبردنی دەنگ، پێشبینینی بانگ و وەستاندنی دەنگ.
 */
import { ADHAN_VOICES } from '../data/adhanVoices';

// Audio & Haptic vibration service

class SoundEffects {
  private audioCtx: AudioContext | null = null;
  private currentAzanAudio: HTMLAudioElement | null = null;
  private playingVoiceId: string | null = null;

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    try {
      if (!this.audioCtx) {
        const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtxClass) {
          this.audioCtx = new AudioCtxClass();
        }
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume().catch(() => {});
      }
    } catch {
      return null;
    }
    return this.audioCtx;
  }

  // Soft tactile click for Tasbih beads
  playTasbihClick() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.045);
    } catch {
      // Audio click handled silently
    }
  }

  // Harmonic chime when Tasbih target (33 or 100) is reached
  playGoalChime() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C - E - G - C
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        const startTime = ctx.currentTime + idx * 0.08;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.45);
      });
    } catch {
      // Goal chime handled silently
    }
  }

  // Play Azan audio by voice ID
  playAdhanVoice(
    voiceId: string,
    customUrl?: string,
    onEnd?: () => void,
    onError?: (error: Error) => void,
  ) {
    this.stopAzan();

    const url = customUrl ?? ADHAN_VOICES.find((voice) => voice.id === voiceId)?.audioUrl;
    if (!url) {
      const error = new Error(`No audio URL is configured for adhan voice "${voiceId}".`);
      console.error(error.message);
      onError?.(error);
      onEnd?.();
      return;
    }

    try {
      const audio = new Audio(url);
      this.currentAzanAudio = audio;
      this.playingVoiceId = voiceId;

      const handlePlaybackFailure = (error: Error) => {
        if (this.currentAzanAudio !== audio) return;

        console.error(`Failed to play adhan voice "${voiceId}".`, error);
        this.currentAzanAudio = null;
        this.playingVoiceId = null;
        onError?.(error);
        onEnd?.();
      };

      audio.onended = () => {
        if (this.currentAzanAudio !== audio) return;
        this.currentAzanAudio = null;
        this.playingVoiceId = null;
        onEnd?.();
      };
      audio.onerror = () => handlePlaybackFailure(new Error(`Unable to load audio from "${url}".`));
      audio.play().catch((error: unknown) => {
        handlePlaybackFailure(error instanceof Error ? error : new Error(String(error)));
      });
    } catch {
      const error = new Error(`Unable to create audio for adhan voice "${voiceId}".`);
      console.error(error.message);
      onError?.(error);
      onEnd?.();
    }
  }

  // Backwards compatibility alias
  playAzan(type: 'makkah' | 'madinah' | string = 'makkah', onEnd?: () => void) {
    this.playAdhanVoice(type, undefined, onEnd);
  }

  stopAzan() {
    if (this.currentAzanAudio) {
      try {
        this.currentAzanAudio.pause();
        this.currentAzanAudio.currentTime = 0;
      } catch {
        // Silently handle
      }
      this.currentAzanAudio = null;
      this.playingVoiceId = null;
    }
  }

  isAzanPlaying(): boolean {
    return this.currentAzanAudio !== null && !this.currentAzanAudio.paused;
  }

  getPlayingVoiceId(): string | null {
    return this.playingVoiceId;
  }

  // Haptic feedback
  vibrate(duration = 20) {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(duration);
      } catch {
        // Silently handle
      }
    }
  }

  vibrateSuccess() {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([40, 50, 60]);
      } catch {
        // Silently handle
      }
    }
  }
}

export const soundEffects = new SoundEffects();
