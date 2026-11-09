import { useEffect, useRef, useState } from "react";
import Board from "./Board";
import { Chess } from "chess.js";
import usePuzzle from "../hooks/usePuzzle";
import { parseMove } from "../lib/Utils";

import type { PieceDropHandlerArgs } from "react-chessboard";

type Props = {};

const Game = (props: Props) => {
  const chessGameRef = useRef(new Chess());
  const chessGame = chessGameRef.current;

  // track the current position of the chess game in state to trigger a re-render of the chessboard
  const [chessPosition, setChessPosition] = useState(chessGame.fen());
  const [solved, setSolved] = useState(0);
  const { loading, nextPuzzle, loadPuzzle, checkMove, fen, getResponse } =
    usePuzzle();

  useEffect(() => {
    chessGame.load(fen);
    setChessPosition(chessGame.fen());
  }, [fen, solved]);

  // handle piece drop
  const onPieceDrop = ({
    sourceSquare,
    targetSquare,
  }: PieceDropHandlerArgs) => {
    // type narrow targetSquare potentially being null (e.g. if dropped off board)
    if (!targetSquare) {
      return false;
    }

    const move = {
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    };
    try {
      const parsedMove = parseMove(move);
      const { correct, solved } = checkMove(parsedMove);

      if (solved) {
        setSolved((prev) => prev + 1);
        nextPuzzle();
      } else if (correct) {
        const response = getResponse();
        makeMove(parsedMove);
        setTimeout(() => makeMove(response), 500);
      }

      return true;
    } catch {
      return false;
    }
  };

  const makeMove = (move: string) => {
    chessGame.move(move);
    setChessPosition(chessGame.fen());
  };

  // set the chessboard options

  const chessboardOptions = {
    position: chessPosition,
    onPieceDrop: onPieceDrop,
    orientation: "white",
    // your config options here
  };
  return (
    <div className="flex">
      <Board chessboardOptions={chessboardOptions} />
      <h1 className="text-xl text-red-200">Solved: {solved}</h1>
      <button onClick={nextPuzzle} disabled={loading}>
        {loading ? "Loading..." : "New Puzzle"}
      </button>
    </div>
  );
};

export default Game;
