import { useState } from "react";
import DifficultySelector from "./DifficultySelector";

type Props = {
  solved: number;
  loading: boolean;
  nextPuzzle: () => void;
  orientation: "white" | "black";
  changeDifficulty: (difficulty: number) => void;
};

const InfoPanel = ({
  nextPuzzle,
  solved,
  loading,
  orientation,
  changeDifficulty,
}: Props) => {
  return (
    <div className="flex flex-col items-center gap-4 p-4 lg:p-12 rounded-lg">
      <h1 className="text-xl font-bold text-white m-3">Solved: {solved}</h1>
      <h3 className="text-xl font-bold text-white m-3">
        {orientation.toUpperCase()} to move{" "}
      </h3>
      <DifficultySelector changeDifficulty={changeDifficulty} />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-auto"
        onClick={nextPuzzle}
        disabled={loading}
      >
        {loading ? "Loading..." : "SKIP"}
      </button>
    </div>
  );
};
export default InfoPanel;
