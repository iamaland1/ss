/**
 * شاشەی پێشوەخت (Splash Screen) بۆ ئەپی سیرات.
 * کاتێک ئەپەکە دەکرێتەوە، ئەم شاشەیە بۆ ٢.٥ چرکە پیشان دەدرێت.
 */
import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('بەخێربێیت بۆ سیرات');

  useEffect(() => {
    // ئەنیمەیشنی پێشکەوتن
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // گۆڕینی دەقی بارکردن
    const textTimers = [
      setTimeout(() => setLoadingText('بارکردنی کاتی بانگ...'), 600),
      setTimeout(() => setLoadingText('ئامادەکردنی قورئانی پیرۆز...'), 1200),
      setTimeout(() => setLoadingText('ڕێکخستنی ئەپەکەت...'), 1800),
      setTimeout(() => setLoadingText('بەخێربێیت بۆ سیرات '), 2300),
    ];

    // کۆتایی هاتنی شاشەکە
    const finishTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onFinish(), 400); // کاتی ئەنیمەیشنی دەرچوون
    }, 2800);

    return () => {
      clearInterval(progressInterval);
      textTimers.forEach(clearTimeout);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-100 flex flex-col items-center justify-center overflow-hidden transition-opacity duration-400 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        background: 'linear-gradient(135deg, #031F3C 0%, #0A2D52 50%, #031F3C 100%)',
      }}
    >
      {/* پاشبنەمای ڕازاوە - ئەستێرەکان */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#F2C94C]"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.2,
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* بازنەی گەورەی درەوشاوە لە پشتەوە */}
      <div
        className="absolute rounded-full blur-3xl opacity-30"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, #F2C94C 0%, transparent 70%)',
          animation: 'pulseSlow 3s ease-in-out infinite',
        }}
      />

      {/* ناوەڕۆکی سەرەکی */}
      <div className="relative z-10 flex flex-col items-center space-y-6 px-6">
        {/* لۆگۆ */}
        <div
          className="relative"
          style={{ animation: 'logoEnter 1s ease-out' }}
        >
          {/* بازنەی درەوشاوە لە دەوری لۆگۆ */}
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-60"
            style={{
              background: 'radial-gradient(circle, #F2C94C 0%, transparent 70%)',
              animation: 'pulseSlow 2s ease-in-out infinite',
            }}
          />
          
          {/* وێنەی کەعبە */}
          <div
            className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-2xl border-4 flex items-center justify-center"
            style={{
              borderColor: '#F2C94C',
              boxShadow: '0 0 60px rgba(242, 201, 76, 0.4), 0 0 100px rgba(242, 201, 76, 0.2)',
              animation: 'rotateIn 1.2s ease-out',
            }}
          >
            <img
              src="/sirat-logo.png"
              alt="Sirat"
              className="w-full h-full object-cover"
              style={{ animation: 'zoomIn 1.5s ease-out' }}
            />
          </div>

          {/* حەلقەی سوڕاوە لە دەوری لۆگۆ */}
          <div
            className="absolute inset-0 rounded-full border-2 border-dashed"
            style={{
              borderColor: 'rgba(242, 201, 76, 0.5)',
              animation: 'spinSlow 8s linear infinite',
              transform: 'scale(1.2)',
            }}
          />
        </div>

        {/* ناوی ئەپ */}
        <div className="text-center space-y-2" style={{ animation: 'fadeInUp 1s ease-out 0.3s both' }}>
          <h1
            className="text-4xl sm:text-5xl font-black font-naskh tracking-tight"
            style={{
              color: '#F2C94C',
              textShadow: '0 0 30px rgba(242, 201, 76, 0.5)',
            }}
          >
            سیرات
          </h1>
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-px bg-[#F2C94C]/50" />
            <p
              className="text-xs sm:text-sm font-bold tracking-[0.3em] text-[#F2C94C]/80 font-sans"
            >
              SIRAT
            </p>
            <div className="w-8 h-px bg-[#F2C94C]/50" />
          </div>
        </div>

        {/* دەقی بارکردن */}
        <p
          className="text-sm text-[#3DBE9C] font-kurdish font-bold tracking-wide"
          style={{ animation: 'fadeInOut 2s ease-in-out infinite' }}
        >
          {loadingText}
        </p>

        {/* شریتی پێشکەوتن */}
        <div className="w-64 sm:w-80 space-y-2">
          <div
            className="w-full h-1.5 rounded-full overflow-hidden"
            style={{ backgroundColor: 'rgba(242, 201, 76, 0.15)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-100 ease-out"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #F2C94C 0%, #3DBE9C 100%)',
                boxShadow: '0 0 10px rgba(242, 201, 76, 0.6)',
              }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-[#F2C94C]/60 font-mono">
            <span>0%</span>
            <span>{progress}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* نیشانەی خوارەوە */}
        <div
          className="absolute bottom-8 text-center space-y-1"
          style={{ animation: 'fadeInUp 1s ease-out 0.8s both' }}
        >
         
        </div>
      </div>

      {/* CSS ئەنیمەیشنەکان */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.5); }
        }
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }
        @keyframes logoEnter {
          0% { transform: scale(0.3) rotate(-180deg); opacity: 0; }
          60% { transform: scale(1.1) rotate(10deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes rotateIn {
          0% { transform: rotate(-180deg); opacity: 0; }
          100% { transform: rotate(0deg); opacity: 1; }
        }
        @keyframes zoomIn {
          0% { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes spinSlow {
          0% { transform: scale(1.2) rotate(0deg); }
          100% { transform: scale(1.2) rotate(360deg); }
        }
        @keyframes fadeInUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};