import React from 'react';

interface CrystalBallProps {
  onClick: () => void;
  isLoading: boolean;
  label?: string;
  subLabel?: string;
}

const CrystalBall: React.FC<CrystalBallProps> = ({ onClick, isLoading, label = "粉色水晶球", subLabel }) => {
  return (
    <div className="relative p-2 bg-pink-200 rounded-full border-4 border-double border-pink-400 shadow-xl inline-block">
        <button
        onClick={onClick}
        disabled={isLoading}
        className={`
            relative group flex flex-col items-center justify-center
            w-56 h-56 rounded-full
            bg-gradient-to-b from-pink-300 to-pink-500
            border-4 border-white
            overflow-hidden
            transition-all duration-300
            ${isLoading ? 'scale-95 opacity-90 cursor-wait' : 'hover:scale-105 active:scale-95 cursor-pointer'}
        `}
        aria-label="Ask the Crystal Ball"
        >
        {/* Shine/Reflection for "Glass" look */}
        <div className="absolute top-4 left-6 w-16 h-10 bg-white/40 rounded-full rotate-[-20deg] blur-[2px]"></div>
        <div className="absolute bottom-4 right-8 w-8 h-8 bg-pink-600/20 rounded-full blur-sm"></div>
        
        {/* Content */}
        <div className="z-10 text-center p-4 relative">
            <div className="bg-white/80 px-4 py-1 rounded-full border border-pink-300 shadow-sm mb-1 transform -rotate-2">
                <p className="text-pink-600 font-bold text-lg tracking-widest">
                {isLoading ? "讀取中..." : label}
                </p>
            </div>
            {subLabel && (
                <div className="bg-pink-100/90 px-2 py-0.5 mt-1 rounded border border-pink-300 transform rotate-1">
                     <p className="text-pink-600 font-bold text-sm">
                        {subLabel}
                    </p>
                </div>
            )}
        </div>

        {/* Retro Sparkles */}
        {!isLoading && (
            <>
                <div className="absolute top-10 right-10 text-white opacity-80 animate-pulse text-xl">✦</div>
                <div className="absolute bottom-12 left-10 text-white opacity-60 animate-pulse delay-75 text-lg">✨</div>
            </>
        )}

        {/* Loading Spinner */}
        {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                 <div className="w-full h-full border-4 border-t-white border-pink-600/0 rounded-full animate-spin"></div>
            </div>
        )}
        </button>
    </div>
  );
};

export default CrystalBall;