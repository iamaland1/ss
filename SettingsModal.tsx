/**
 * قاپی مۆداڵی ڕێکخستنەکان؛ لەسەر پەڕەی سەرەکی دەکرێتەوە و بە کلیک لە دەرەوە دادەخرێت.
 */
import React from 'react';
import { Language, CityInfo, AppearanceMode } from '../types';
import { SettingsView } from './Settings';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
  selectedCity: CityInfo;
  onSelectCity: (city: CityInfo) => void;
  appearanceMode: AppearanceMode;
  setAppearanceMode: (mode: AppearanceMode) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  lang,
  setLang,
  selectedCity,
  onSelectCity,
  appearanceMode,
  setAppearanceMode,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-md animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-4xl bg-slate-50 dark:bg-zinc-950 rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-200 dark:border-zinc-800 max-h-[92vh] overflow-y-auto relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <SettingsView
          lang={lang}
          setLang={setLang}
          selectedCity={selectedCity}
          onSelectCity={onSelectCity}
          appearanceMode={appearanceMode}
          setAppearanceMode={setAppearanceMode}
          onClose={onClose}
        />
      </div>
    </div>
  );
};
