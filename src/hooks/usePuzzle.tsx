import { useCallback, useEffect, useState } from "react";

type ApiResponse = {
  puzzle: Puzzle;
};

type Puzzle = {
  id: string;
  fen: string;
  solution: string[];
};

const fetchPuzzle = async (): Promise<Puzzle> => {
  const response = await fetch("https://lichess.org/api/puzzle/next", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + import.meta.env.VITE_LICHESS_API,
    },
  });
  const data = await response.json();
  console.log("Fetched Position:", data);
  const puzzle = data.puzzle;
  return puzzle;
};

const usePuzzle = () => {
  const [initialPosition, setInitialPosition] = useState<string>(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  );
  const [solution, setSolution] = useState<String[]>([]);
  const [currentMove, setCurrentMove] = useState(0);
  const [loading, setLoading] = useState(false);
  const [puzzleVersion, setPuzzleVersion] = useState(0);

  useEffect(() => {
    loadPuzzle();
  }, []);

  const loadPuzzle = useCallback(async () => {
    setLoading(true);
    try {
      const puzzle = await fetchPuzzle();
      setInitialPosition(puzzle.fen);
      setSolution(puzzle.solution);
      setCurrentMove(0);
      setPuzzleVersion((prev) => prev + 1);
    } finally {
      setLoading(false);
    }
  }, []);

  const checkMove = (move: string) => {
    if (move !== solution[currentMove]) {
      return { correct: false, solved: false };
    }

    const nextMove = currentMove + 1;
    setCurrentMove(nextMove);

    return {
      correct: true,
      solved: nextMove === solution.length,
    };
  };

  const getResponseMove = () => {};

  return {
    initialPosition,
    checkMove,
    loadPuzzle,
    loading,
  };
};

export default usePuzzle;
