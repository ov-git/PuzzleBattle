import {
  Chessboard,
  defaultPieces,
  type PieceDropHandlerArgs,
  type PieceRenderObject,
} from "react-chessboard";
import Toast from "./Toast";
import type { PieceSymbol } from "chess.js";

type Props = {
  toast: number;
  orientation: "white" | "black";
  chessboardOptions: {
    position: string;
    onPieceDrop: ({
      sourceSquare,
      targetSquare,
    }: PieceDropHandlerArgs) => boolean;
  };
  onPromotionPieceSelect: (piece: PieceSymbol) => void;
  getPromotionDialogXLocation: (targetSquare: string) => number;
  promotionMove: Omit<PieceDropHandlerArgs, "piece"> | null;
};

export default function Board({
  onPromotionPieceSelect,
  chessboardOptions,
  toast,
  promotionMove,
  orientation,
  getPromotionDialogXLocation,
}: Props) {
  // number of columns
  const leftOffset =
    "left-" + getPromotionDialogXLocation(promotionMove?.targetSquare ?? "a1");
  const promotionColor = orientation === "white" ? "w" : "b";
  const promotionBg = orientation === "white" ? "bg-black" : "bg-white";
  return (
    <div className="w-120 h-120 flex flex-col justify-center items-center relative bg-red-50">
      {promotionMove ? (
        <div
          className={`z-2 absolute top-0 w-15 h-60 flex flex-col justify-center items-center ${promotionBg} ${leftOffset}`}
        >
          {(["q", "r", "n", "b"] as PieceSymbol[]).map((piece) => (
            <button
              className="w-full h-16 flex justify-center items-center hover:bg-gray-700 p-1 border-black border"
              key={piece}
              onClick={() => {
                onPromotionPieceSelect(piece);
              }}
              onContextMenu={(e) => {
                e.preventDefault();
              }}
            >
              {defaultPieces[
                `${promotionColor}${piece.toUpperCase()}` as keyof PieceRenderObject
              ]()}
            </button>
          ))}
        </div>
      ) : (
        <></>
      )}
      <Chessboard options={chessboardOptions} />
      <Toast toast={toast} />
    </div>
  );
}
