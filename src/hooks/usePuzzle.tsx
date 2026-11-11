import { useCallback, useEffect, useState } from "react";
import { DEFAULT_FEN } from "../lib/Utils";
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
  const [puzzleVersion, setPuzzleVersion] = useState(0);

  useEffect(() => {
    if (puzzles.length === 0 && loading === false) {
      loadPuzzle();
    }
  }, []);

  useEffect(() => {
    if (currentPuzzle) {
      setfen(currentPuzzle.fen);
      setSolution(currentPuzzle.solution);
      setCurrentMove(0);
    }
  }, [currentPuzzle]);

  const loadPuzzle = useCallback(async () => {
    setLoading(true);
    try {
      const puzzles = await fetchPuzzles();
      const first = puzzles[index].puzzle;
      setNextPuzzle(first.id);
      setPuzzles(puzzles);
      setPuzzleVersion((prev) => prev + 1);
    } finally {
      setLoading(false);
    }
  }, []);

  const setNextPuzzle = async (id: string) => {
    const puzzle = await fetchPuzzlebyId(id);
    console.log("Fetched Puzzle by ID:", puzzle);
    setCurrentPuzzle(puzzle);
  };

  const nextPuzzle = () => {
    const nextIndex = (index + 1) % puzzles.length;
    setIndex(nextIndex);
    const puzzle = puzzles[nextIndex].puzzle;
    setNextPuzzle(puzzle.id);
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

  const getResponse = () => {
    return solution[currentMove + 1];
  };

  return {
    fen,
    checkMove,
    loadPuzzle,
    loading,
    nextPuzzle,
    getResponse,
  };
};

export default usePuzzle;
