import type { Puzzle, PuzzleItem } from "./Types";
import { getDifficultyString } from "./Utils";

export const fetchPuzzles = async (
  difficulty?: number,
): Promise<PuzzleItem[]> => {
  //   const response = await fetch("https://lichess.org/api/puzzle/next", {
  const difficultyParam = getDifficultyString(difficulty);
  console.log(difficultyParam);
  const response = await fetch(
    `https://lichess.org/api/puzzle/batch/mix?nb=15&difficulty=${difficultyParam}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + import.meta.env.VITE_LICHESS_API,
      },
    },
  );
  const data = await response.json();
  const puzzle = data.puzzles;
  return puzzle;
};

export const fetchPuzzlebyId = async (id: string): Promise<Puzzle> => {
  const response = await fetch(`https://lichess.org/api/puzzle/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + import.meta.env.VITE_LICHESS_API,
    },
  });
  const data = await response.json();
  return data.puzzle;
};
