export type Move = {
  from: string;
  to: string;
  promotion: string;
};

export type PuzzleItem = {
  puzzle: Puzzle;
};

export type Puzzle = {
  id: string;
  fen: string;
  solution: string[];
};
