import React from "react";
import { Chessboard, type PieceDropHandlerArgs } from "react-chessboard";

type Props = {
  chessboardOptions: {
    position: string;
    onPieceDrop: ({
      sourceSquare,
      targetSquare,
    }: PieceDropHandlerArgs) => boolean;
  };
};

export default function Board({ chessboardOptions }: Props) {
  return (
    <div className="w-96 h-96 flex justify-center items-center bg-black">
      <Chessboard options={chessboardOptions} />;
    </div>
  );
}
