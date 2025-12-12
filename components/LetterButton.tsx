import React from 'react';

interface LetterButtonProps {
  letter: string;
  angle: number; // in degrees
  isActive: boolean;
  isDisabled: boolean;
  onClick: (letter: string) => void;
  totalLetters: number;
}

const LetterButton: React.FC<LetterButtonProps> = ({ 
  letter, 
  angle, 
  isActive, 
  isDisabled, 
  onClick 
}) => {
  // We position the button absolutely from the center of the board
  // We rotate the container to the correct angle, then push it out by the radius
  // Then we rotate the text back so it is upright.
  
  const radius = '42%'; // Distance from center

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
      style={{
        transform: `translate(-50%, -50%) rotate(${angle}deg) translate(0, -${400}px) rotate(-${angle}deg)`, 
        // Note: The pixel value in translate(0, -400px) above is tricky for responsiveness.
        // A better approach for responsive circles is using percentages within a container.
        // Let's refactor the style to be purely percent based in the GameBoard wrapper, 
        // or here using a variable radius.
      }}
    >
      {/* 
        We use a wrapper div for the rotation context. 
        Actually, the style block below is better for responsive layout:
      */}
    </div>
  );
};

// Re-implementing specifically for the GameBoard loop context to keep it simple
// We will export a simpler component that just handles the look, position is handled by parent
export const LetterButtonSimple: React.FC<{
  letter: string;
  disabled: boolean;
  onClick: () => void;
  style: React.CSSProperties;
}> = ({ letter, disabled, onClick, style }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={`
        absolute w-[12vmin] h-[12vmin] max-w-20 max-h-20
        rounded-full flex items-center justify-center
        text-[4vmin] font-bold shadow-lg transition-all duration-200
        border-b-4 select-none
        ${disabled 
          ? 'bg-slate-800 text-slate-600 border-slate-900 shadow-none scale-90 cursor-not-allowed inset-shadow' 
          : 'bg-gradient-to-br from-rose-500 to-rose-600 text-white border-rose-800 hover:brightness-110 active:scale-95 active:border-b-0 active:translate-y-1'
        }
      `}
      aria-label={`Letter ${letter}`}
    >
      <span className="drop-shadow-md">{letter}</span>
    </button>
  );
};
