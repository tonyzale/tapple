export enum GameState {
  IDLE = 'IDLE',
  PLAYING = 'PLAYING',
  GAME_OVER = 'GAME_OVER',
}

export interface GameConfig {
  timerDuration: number; // in seconds
}

export const TAPPLE_LETTERS = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
  'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'W'
]; // Excludes Q, U, V, X, Y, Z
