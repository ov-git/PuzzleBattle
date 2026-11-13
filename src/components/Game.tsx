import { useEffect, useRef, useState } from "react";
import Board from "./Board";
import { Chess, type Square } from "chess.js";
import usePuzzle from "../hooks/usePuzzle";
import { parseMove } from "../lib/Utils";

import type { PieceDropHandlerArgs, SquareHandlerArgs } from "react-chessboard";
import InfoPanel from "./InfoPanel";

type Props = {};

const Game = (props: Props) => {
  const chessGameRef = useRef(new Chess());
  const chessGame = chessGameRef.current;

  // track the current position of the chess game in state to trigger a re-render of the chessboard
  const [chessPosition, setChessPosition] = useState(chessGame.fen());
  const [orientation, setOrientation] = useState<"white" | "black">("white");

  const [moveFrom, setMoveFrom] = useState("");
  const [optionSquares, setOptionSquares] = useState({});

  const [solved, setSolved] = useState(0);
  // const [incorrect, setIncorrect] = useState(0);
  const [toast, setToast] = useState(0);

  const {
    loading,
    nextPuzzle,
    loadPuzzle,
    checkMove,
    fen,
    getResponse,
    loadByDifficulty,
  } = usePuzzle();

  useEffect(() => {
    console.log("Loading puzzle with FEN:", fen);
    chessGame.load(fen);
    setOrientation(chessGame.turn() === "w" ? "white" : "black");
    setChessPosition(chessGame.fen());
  }, [fen]);

  // drag and drop handler
  const onPieceDrop = ({
    sourceSquare,
    targetSquare,
  }: PieceDropHandlerArgs) => {
    if (!targetSquare) {
      return false;
    }
    const success = trySolution(sourceSquare, targetSquare);
    return success;
  };

  const makeMove = (move: string) => {
    chessGame.move(move);
    setChessPosition(chessGame.fen());
  };

  // get the move options for a square to show valid moves
  function getMoveOptions(square: Square) {
    // get the moves for the square
    const moves = chessGame.moves({
      square,
      verbose: true,
    });

    // if no moves, clear the option squares
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    // create a new object to store the option squares
    const newSquares: Record<string, React.CSSProperties> = {};

    // loop through the moves and set the option squares
    for (const move of moves) {
      newSquares[move.to] = {
        background:
          chessGame.get(move.to) &&
          chessGame.get(move.to)?.color !== chessGame.get(square)?.color
            ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)" // larger circle for capturing
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)", // smaller circle for moving
        borderRadius: "50%",
      };
    }
    // set the square clicked to move from to yellow
    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)",
    };

    setOptionSquares(newSquares);
    return true; // return true to indicate that there are move options
  }

  function onSquareClick({ square, piece }: SquareHandlerArgs) {
    // piece clicked to move
    if (!moveFrom && piece) {
      // get the move options for the square
      const hasMoveOptions = getMoveOptions(square as Square);
      if (hasMoveOptions) {
        setMoveFrom(square);
      }
      return;
    }

    if (moveFrom === square) {
      // if the same square is clicked again, clear moveFrom and optionSquares
      setMoveFrom("");
      setOptionSquares({});
      return;
    }

    // square clicked to move to, check if valid move
    const moves = chessGame.moves({
      square: moveFrom as Square,
      verbose: true,
    });
    const foundMove = moves.find((m) => m.from === moveFrom && m.to === square);

    // not a valid move
    if (!foundMove) {
      // check if clicked on new piece
      const hasMoveOptions = getMoveOptions(square as Square);

      // if new piece, setMoveFrom, otherwise clear moveFrom
      setMoveFrom(hasMoveOptions ? square : "");
      return;
    }
    trySolution(moveFrom, square);
    setChessPosition(chessGame.fen());
    // clear moveFrom and optionSquares
    setMoveFrom("");
    setOptionSquares({});
  }

  const changeDifficulty = (newDifficulty: number) => {
    loadByDifficulty(newDifficulty);
  };

  const trySolution = (from: string, to: string) => {
    // check if the move is correct for the current puzzle
    try {
      const move = {
        from,
        to,
        promotion: "q",
      };

      const parsedMove = parseMove(move);
      const { correct, solved } = checkMove(parsedMove);
      if (solved) {
        makeMove(parsedMove);
        setToast(1);
        setTimeout(() => {
          setSolved((prev) => prev + 1);
          nextPuzzle();
          setToast(0);
        }, 1000);
      } else if (correct) {
        const response = getResponse();
        makeMove(parsedMove);
        setTimeout(() => makeMove(response), 500);
      } else {
        setToast(2);
        setTimeout(() => {
          setToast(0);
        }, 1000);
      }
      return true;
    } catch {
      // if invalid, setMoveFrom and getMoveOptions
      const hasMoveOptions = getMoveOptions(to as Square);

      // if new piece, setMoveFrom, otherwise clear moveFrom
      if (hasMoveOptions) {
        setMoveFrom(to);
      }
      return false;
    }
  };

  const showToast = (type: number) => {
    setToast(type);

    setTimeout(() => {
      setToast(0);
    }, 1000);
  };

  // set the chessboard options
  const chessboardOptions = {
    position: chessPosition,
    onPieceDrop,
    onSquareClick,
    boardOrientation: orientation,
    squareStyles: optionSquares,
    id: "click-or-drag-to-move",
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <Board chessboardOptions={chessboardOptions} toast={toast} />
      <InfoPanel
        orientation={orientation}
        nextPuzzle={nextPuzzle}
        solved={solved}
        loading={loading}
        changeDifficulty={changeDifficulty}
      />
    </div>
  );
};

export default Game;
