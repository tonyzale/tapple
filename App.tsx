import React, { useState } from 'react';
import { GameBoard } from './components/GameBoard';
import { GameState } from './types';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-rose-900/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-indigo-900/20 rounded-full blur-[100px]"></div>
      </div>

      {/* Header */}
      <header className="mb-8 z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-indigo-400 tracking-tighter drop-shadow-sm">
          TAPPLE
        </h1>
        <p className="text-slate-400 text-sm md:text-base font-medium tracking-widest mt-2 uppercase opacity-80">
          Browser Edition
        </p>
      </header>

      {/* Game Container */}
      <main className="w-full max-w-[90vmin] aspect-square relative z-10">
        <GameBoard onGameStateChange={setGameState} />
      </main>

      {/* Footer Instructions */}
      <footer 
        className={`mt-12 text-slate-500 text-center max-w-md mx-auto text-xs md:text-sm z-10 transition-opacity duration-500 ${
          gameState !== GameState.IDLE ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <p>Press <span className="text-rose-400 font-bold">Start</span> to begin. Name a word starting with a letter, tap the letter, and reset the timer.</p>
      </footer>
    </div>
  );
};

export default App;