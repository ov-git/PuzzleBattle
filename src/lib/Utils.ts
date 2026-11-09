import type { Move } from "./Types";

export const parseMove = (move: Move): string => {
  return `${move.from}${move.to}`;
};
