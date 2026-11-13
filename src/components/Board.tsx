import { Chessboard, type PieceDropHandlerArgs } from "react-chessboard";
import Toast from "./Toast";

type Props = {
  toast: number;
  chessboardOptions: {
    position: string;
    onPieceDrop: ({
      sourceSquare,
      targetSquare,
    }: PieceDropHandlerArgs) => boolean;
  };
};

export default function Board({ chessboardOptions, toast }: Props) {
  return (
    <div className="w-120 h-120 flex flex-col justify-center items-center bg-black relative">
      <Chessboard options={chessboardOptions} />
      <Toast toast={toast} />
    </div>
  );
}
