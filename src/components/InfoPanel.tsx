import DifficultySelector from "./DifficultySelector";

type Props = {
  solved: number;
  loading: boolean;
  nextPuzzle: () => void;
  orientation: "white" | "black";
  changeDifficulty: (difficulty: number) => void;
  showHint: () => void;
};

const InfoPanel = ({
  nextPuzzle,
  solved,
  loading,
  orientation,
  changeDifficulty,
  showHint,
}: Props) => {
  return (
    <div className="flex lg:flex-col items-center gap-4 p-4 lg:p-12 rounded-lg w-full max-w-120 lg:w-72 bg-slate-800">
      <h1 className="text-xl font-bold text-white m-3">Solved: {solved}</h1>
      <h3 className="text-xl font-bold text-white m-3">
        {orientation.toUpperCase()} to move{" "}
      </h3>
      <DifficultySelector changeDifficulty={changeDifficulty} />
      <div className="flex gap-2">
        <button
          className="hover:bg-green-700 text-white px-4 py-1 rounded bg-green-800 font-bold mt-auto"
          onClick={showHint}
          disabled={loading}
        >
          {loading ? "Loading..." : "HINT"}
        </button>
        <button
          className="hover:bg-green-700 text-white px-4 py-1 rounded bg-green-800 font-bold mt-auto"
          onClick={nextPuzzle}
          disabled={loading}
        >
          {loading ? "Loading..." : "SKIP"}
        </button>
      </div>
    </div>
  );
};
export default InfoPanel;
