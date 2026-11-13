import { useEffect, useState } from "react";
import { DEFAULT_FEN, getMoveFrom } from "../lib/Utils";
import type { Puzzle, PuzzleItem } from "../lib/Types";
import { fetchPuzzlebyId, fetchPuzzles } from "../lib/Api";

const usePuzzle = () => {
  const [index, setIndex] = useState(0);
  const [puzzles, setPuzzles] = useState<PuzzleItem[]>([]);
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle>();
  const [fen, setfen] = useState<string>(DEFAULT_FEN);
  const [solution, setSolution] = useState<string[]>([]);
  const [currentMove, setCurrentMove] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (puzzles.length === 0 && loading === false) {
      loadPuzzles();
    }
  }, []);

  useEffect(() => {
    if (currentPuzzle) {
      setfen(currentPuzzle.fen);
      setSolution(currentPuzzle.solution);
      setCurrentMove(0);
    }
    console.log("Current puzzle updated:", currentPuzzle);
  }, [currentPuzzle]);

  const setNextPuzzle = async (id: string) => {
    const puzzle = await fetchPuzzlebyId(id);
    setCurrentPuzzle(puzzle);
  };

  const nextPuzzle = () => {
    const nextIndex = (index + 1) % puzzles.length;
    setIndex(nextIndex);
    const puzzle = puzzles[nextIndex].puzzle;
    setNextPuzzle(puzzle.id);
  };

  const loadPuzzles = async (difficulty?: number) => {
    setLoading(true);
    try {
      const puzzles = await fetchPuzzles(difficulty);
      const first = puzzles[index].puzzle;
      setNextPuzzle(first.id);
      setPuzzles(puzzles);
    } catch (error) {
      console.error("Error loading puzzle by difficulty:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkMove = (move: string) => {
    if (move !== solution[currentMove]) {
      return { correct: false, solved: false };
    }
    const nextMove = currentMove + 2;
    setCurrentMove(nextMove);

    return {
      correct: true,
      solved: nextMove >= solution.length,
    };
  };

  const getHint = () => {
    return getMoveFrom(solution[currentMove]);
  };

  const getResponse = () => {
    return solution[currentMove + 1];
  };

  return {
    fen,
    checkMove,
    getHint,
    loading,
    nextPuzzle,
    getResponse,
    loadPuzzles,
  };
};

export default usePuzzle;
