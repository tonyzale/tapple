import React from 'react';
import { GameState } from '../types';
import { Play, RotateCcw, AlertTriangle } from 'lucide-react';

interface CenterHubProps {
  gameState: GameState;
  timeLeft: number;
  onStart: () => void;
  onReset: () => void;
}

export const CenterHub: React.FC<CenterHubProps> = ({ gameState, timeLeft, onStart, onReset }) => {
  
  const isPlaying = gameState === GameState.PLAYING;
  const isGameOver = gameState === GameState.GAME_OVER;
  
  // Progress ring calculation
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(timeLeft / 10, 0), 1);
  const strokeDashoffset = circumference - progress * circumference;

  const getColor = () => {
    if (isGameOver) return 'stroke-red-500';
    if (timeLeft <= 3) return 'stroke-orange-500';
    return 'stroke-emerald-400';
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vmin] h-[40vmin] bg-slate-800 rounded-full shadow-2xl flex items-center justify-center border-4 border-slate-700 z-10">
      
      {/* Timer Progress Ring */}
      <div className="absolute inset-0 p-2">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Track */}
          <circle
            className="text-slate-900 stroke-current"
            strokeWidth="8"
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
          />
          {/* Indicator */}
          <circle
            className={`${getColor()} transition-all duration-200 ease-linear`}
            strokeWidth="8"
            strokeLinecap="round"
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
            style={{ strokeDasharray: circumference, strokeDashoffset }}
          />
        </svg>
      </div>

      {/* Inner Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        
        {gameState === GameState.IDLE && (
          <button 
            onClick={onStart}
            className="group flex flex-col items-center gap-2 transition-transform active:scale-95"
          >
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg border-b-4 border-emerald-700 group-hover:bg-emerald-400">
              <Play className="w-8 h-8 text-white fill-current" />
            </div>
            <span className="text-emerald-400 font-bold tracking-widest uppercase text-sm">Start Round</span>
          </button>
        )}

        {isPlaying && (
           <div className="flex flex-col items-center animate-pulse-fast">
             <span className={`text-[12vmin] font-black tabular-nums leading-none ${timeLeft <= 3 ? 'text-red-500' : 'text-white'}`}>
               {Math.ceil(timeLeft)}
             </span>
             <span className="text-slate-400 text-xs uppercase tracking-widest font-semibold mt-2">Seconds</span>
           </div>
        )}

        {isGameOver && (
          <div className="flex flex-col items-center animate-bounce-short">
             <AlertTriangle className="w-12 h-12 text-red-500 mb-2" />
             <span className="text-2xl font-bold text-red-500 uppercase tracking-wider">Time's Up!</span>
             <button 
                onClick={onReset}
                className="mt-4 px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-full text-white font-semibold text-sm transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Timer
             </button>
          </div>
        )}
      </div>
    </div>
  );
};