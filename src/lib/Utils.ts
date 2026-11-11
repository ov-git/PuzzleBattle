import type { Move } from "./Types";

export const DEFAULT_FEN =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const parseMove = (move: Move): string => {
  return `${move.from}${move.to}`;
};
