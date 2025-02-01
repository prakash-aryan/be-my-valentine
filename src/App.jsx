import React, { useState, useEffect } from 'react';
import { Heart, Stars, Music, Star, Sparkles } from 'lucide-react';

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);
  const [currentVideo, setCurrentVideo] = useState('cat_hi.gif');
  const [showConfetti, setShowConfetti] = useState(false);

  const noReactionVideos = [
    'cat_bigeye.mp4',
    'cat_cry.mp4',
    'cat_knife.mp4',
    'cat_sad_one.mp4',
    'cat_sad_two.mp4',
    'cat_sat_three.mp4'
  ];

  const moveButton = () => {
    const newX = Math.random() * 200 - 100;
    const newY = Math.random() * 200 - 100;
    setPosition({ x: newX, y: newY });
    setNoCount(prev => prev + 1);
    setCurrentVideo(noReactionVideos[noCount % noReactionVideos.length]);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleYesClick = () => {
    setAnswer('yes');
    setCurrentVideo('catsdance.mp4');
    setShowConfetti(true);
  };

  const confetti = [...Array(150)].map((_, i) => ({
    left: `${Math.random() * 100}%`,
    size: Math.random() * 8 + 4,
    animationDelay: `${Math.random() * 3}s`,
    animationDuration: `${Math.random() * 2 + 2}s`,
    rotation: Math.random() * 360,
    color: [
      '#ff69b4',
      '#ff1493',
      '#ffd700',
      '#ff6b6b',
      '#4caf50',
      '#64b5f6',
    ][Math.floor(Math.random() * 6)],
    shape: Math.random() > 0.5 ? 'circle' : 'square'
  }));

  const renderIcon = (index) => {
    const IconComponent = [Heart, Stars, Music, Star][index % 4];
    return <IconComponent className="text-pink-200/50 w-4 h-4" />;
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Sure?",
      "Really?",
      "Think again!",
      "Last chance!",
      "Pls no?",
      "Don't go!",
      "Think twice!",
      "Are you sure?",
      "Bad choice!",
      "Have a heart!",
      "Stay please!",
      "Change mind?",
      "Reconsider?",
      "Final answer?",
      "Breaking heart!"
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 to-teal-100 flex flex-col items-center justify-center p-4 relative overflow-visible">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {renderIcon(i)}
          </div>
        ))}
      </div>

      {/* Enhanced Confetti animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {confetti.map((config, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: config.left,
                width: config.size,
                height: config.size,
                backgroundColor: config.color,
                borderRadius: config.shape === 'circle' ? '50%' : '2px',
                transform: `rotate(${config.rotation}deg)`,
                animation: `confetti ${config.animationDuration} ease-in-out ${config.animationDelay} infinite`,
                zIndex: 50,
              }}
            />
          ))}
        </div>
      )}

      {/* Main Card */}
      <div 
        className={`w-[380px] bg-white rounded-3xl shadow-xl transform transition-all duration-500 relative ${
          showMessage ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-16 h-16 bg-pink-100/50 rounded-br-full" />
        <div className="absolute top-0 right-0 w-16 h-16 bg-pink-100/50 rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-pink-100/50 rounded-tr-full" />
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-pink-100/50 rounded-tl-full" />

        {/* Decorative floating elements */}
        <div className="absolute top-4 left-4 animate-pulse-slow">
          <Heart className="w-4 h-4 text-pink-200" />
        </div>
        <div className="absolute top-4 right-4 animate-pulse-slow">
          <Star className="w-4 h-4 text-yellow-200" />
        </div>
        <div className="absolute bottom-4 left-4 animate-pulse-slow">
          <Music className="w-4 h-4 text-pink-200" />
        </div>
        <div className="absolute bottom-4 right-4 animate-pulse-slow">
          <Heart className="w-4 h-4 text-pink-200" />
        </div>

        <div className="p-6 space-y-4 relative z-10">
          {/* Title with decorative underline */}
          <div className="text-center relative">
            <h1 className="text-3xl font-bold text-pink-500 inline-block">
              Hey cutie! <Sparkles className="inline-block ml-1" />
            </h1>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
          </div>

          {/* Media Display with decorative border */}
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 p-1">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-white to-pink-100 opacity-50" />
            {currentVideo.endsWith('.mp4') ? (
              <video 
                src={`/${currentVideo}`} 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover rounded-xl relative z-10"
              />
            ) : (
              <img 
                src={`/${currentVideo}`} 
                alt="Cat animation" 
                className="w-full h-full object-cover rounded-xl relative z-10"
              />
            )}
          </div>

          {!answer && (
            <>
              <p className="text-xl text-gray-700 text-center mt-4 relative">
                Will you be my valentine? 🥺
                <span className="absolute -right-2 -top-2">
                  <Stars className="w-4 h-4 text-yellow-300 animate-sparkle" />
                </span>
              </p>

              <div className="flex flex-col gap-3 items-center justify-center mt-4">
                <button
                  onClick={handleYesClick}
                  className="w-32 px-6 py-2 text-white font-medium bg-gradient-to-r from-pink-400 to-pink-500 rounded-full hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  Yes! 💝
                </button>

                <div className="relative w-32 h-10">
                  <button
                    style={{
                      transform: noCount ? `translate(${position.x}px, ${position.y}px)` : 'none',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={moveButton}
                    onClick={moveButton}
                    className="absolute px-4 py-2 text-gray-500 text-sm font-medium bg-gray-100 rounded-full hover:bg-gray-200 transition-all w-32 truncate overflow-hidden z-50"
                  >
                    {getNoButtonText()}
                  </button>
                </div>
              </div>
            </>
          )}

          {answer === 'yes' && (
            <div className="text-center space-y-4 animate-bounce">
              <h2 className="text-2xl font-bold text-pink-500">
                YAAAAAAY! 🎉
              </h2>
              <p className="text-lg text-gray-700">
                I promise to make you the happiest! 💕
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% { transform: translateY(-20vh) rotate(0deg); }
          25% { transform: translateY(20vh) rotate(180deg) translateX(20px); }
          50% { transform: translateY(40vh) rotate(360deg) translateX(-20px); }
          75% { transform: translateY(60vh) rotate(540deg) translateX(20px); }
          100% { transform: translateY(110vh) rotate(720deg); }
        }
      `}</style>
    </div>
  );
}

export default App;