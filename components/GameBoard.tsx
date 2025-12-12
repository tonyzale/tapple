import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TAPPLE_LETTERS, GameState } from '../types';
import { LetterButtonSimple } from './LetterButton';
import { CenterHub } from './CenterHub';
import { soundManager } from '../utils/sound';

interface GameBoardProps {
  onGameStateChange?: (state: GameState) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ onGameStateChange }) => {
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [disabledLetters, setDisabledLetters] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState<number>(10);
  
  const timerRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(0);

  // Sync state with parent
  useEffect(() => {
    onGameStateChange?.(gameState);
  }, [gameState, onGameStateChange]);

  // Sound and Timer Loop
  useEffect(() => {
    if (gameState === GameState.PLAYING) {
      const startTime = Date.now();
      const initialTime = timeLeft;

      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 0.1;
          
          // Audio ticks
          const currentSecond = Math.ceil(newTime);
          if (currentSecond !== lastTickRef.current && currentSecond <= 10 && currentSecond > 0) {
            soundManager.playTick(currentSecond <= 3);
            lastTickRef.current = currentSecond;
          }

          if (newTime <= 0) {
            handleGameOver();
            return 0;
          }
          return newTime;
        });
      }, 100);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [gameState]);

  const handleGameOver = () => {
    setGameState(GameState.GAME_OVER);
    setTimeLeft(0);
    soundManager.playBuzzer();
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleStartTimer = () => {
    setGameState(GameState.PLAYING);
    setTimeLeft(10);
    lastTickRef.current = 11; // Reset tick tracker
    soundManager.playClick();
  };

  const handleFullReset = () => {
    setGameState(GameState.IDLE);
    setDisabledLetters(new Set());
    setTimeLeft(10);
    if (timerRef.current) clearInterval(timerRef.current);
    soundManager.playClick();
  };

  const handlePartialReset = () => {
    setGameState(GameState.IDLE);
    // Do not reset disabled letters
    setTimeLeft(10);
    if (timerRef.current) clearInterval(timerRef.current);
    soundManager.playClick();
  };

  const handleLetterClick = (letter: string) => {
    if (disabledLetters.has(letter)) return;
    
    const newDisabled = new Set(disabledLetters);
    newDisabled.add(letter);
    setDisabledLetters(newDisabled);
    
    // Reset timer
    setTimeLeft(10);
    lastTickRef.current = 11; 
    
    if (gameState === GameState.IDLE) {
      setGameState(GameState.PLAYING);
    }
    
    soundManager.playClick();
  };

  // Layout calculations
  // We want letters in a circle.
  // 20 letters. 360 / 20 = 18 degrees.
  // Start at -90deg (top).
  
  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-square flex items-center justify-center">
      {/* Board Background/Base */}
      <div className="absolute inset-4 rounded-full bg-slate-800 shadow-2xl border-8 border-slate-700"></div>
      <div className="absolute inset-8 rounded-full bg-slate-900 shadow-inner"></div>

      {/* Letters */}
      <div className="absolute inset-0 z-0">
        {TAPPLE_LETTERS.map((letter, index) => {
          const total = TAPPLE_LETTERS.length;
          const angleDeg = (index * (360 / total)) - 90; // Start at top
          const angleRad = (angleDeg * Math.PI) / 180;
          
          // Radius as percentage of container half-width
          // Container is square. 
          // We want the buttons centered on a circle that is maybe 75% of the way to the edge.
          const radiusPercent = 38; 
          
          const left = 50 + radiusPercent * Math.cos(angleRad);
          const top = 50 + radiusPercent * Math.sin(angleRad);

          return (
            <LetterButtonSimple
              key={letter}
              letter={letter}
              disabled={disabledLetters.has(letter) || gameState === GameState.GAME_OVER}
              onClick={() => handleLetterClick(letter)}
              style={{
                left: `${left}%`,
                top: `${top}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          );
        })}
      </div>

      {/* Center Hub */}
      <CenterHub 
        gameState={gameState}
        timeLeft={timeLeft}
        onStart={handleStartTimer}
        onReset={handlePartialReset}
      />
      
      {/* Global Reset Button (Floating or distinct from center) */}
      <div className="absolute bottom-[-80px] left-1/2 -translate-x-1/2">
        <button
          onClick={handleFullReset}
          className="bg-slate-700 hover:bg-slate-600 text-slate-300 px-6 py-3 rounded-full font-bold uppercase tracking-wider text-xs transition-colors shadow-lg border border-slate-600 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 12"/><path d="M3 3v9h9"/></svg>
          Reset Game
        </button>
      </div>

    </div>
  );
};
