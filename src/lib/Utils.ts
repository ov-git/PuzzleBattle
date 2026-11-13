import type { Move } from "./Types";

export const DEFAULT_FEN =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const parseMove = (move: Move): string => {
  return `${move.from}${move.to}`;
};

export const getMoveFrom = (move: string): string => {
  return move.substring(0, 2);
};

export const getDifficultyString = (difficulty?: number): string => {
  switch (difficulty) {
    case 1:
      return "easiest"; // corresponds to easy in selector
    case 2:
      return "medium"; // corresponds to hard in selector
    case 3:
      return "hard"; // corresponds to very hard in selector
    case 4:
      return "hardest"; // corresponds to insane in selector
    default:
      return "easy"; // corresponds to medium in selector
  }
};
