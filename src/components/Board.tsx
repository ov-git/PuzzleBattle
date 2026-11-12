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
    <div className="w-120 h-120 flex justify-center items-center bg-black">
      <Chessboard options={chessboardOptions} />
    </div>
  );
}
