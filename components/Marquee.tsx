import React from 'react';
import { MARQUEE_TEXTS } from '../constants';

const Marquee: React.FC = () => {
  return (
    <div className="w-full max-w-full overflow-hidden bg-[#fff0f5] border-2 border-dashed border-pink-400 mb-6 shadow-sm relative">
        <div className="py-1 bg-pink-100/50 w-full">
            <div className="flex whitespace-nowrap animate-marquee w-max">
                {/* Duplicated strictly for infinite scroll illusion */}
                {[...MARQUEE_TEXTS, ...MARQUEE_TEXTS, ...MARQUEE_TEXTS].map((text, i) => (
                    <span key={i} className="mx-4 text-pink-600 font-bold text-sm flex items-center">
                        <span className="mr-2">✦</span> {text}
                    </span>
                ))}
            </div>
        </div>
        <style>{`
        .animate-marquee {
            animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        `}</style>
    </div>
  );
};

export default Marquee;