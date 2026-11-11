type Props = {
  solved: number;
  loading: boolean;
  nextPuzzle: () => void;
};

const InfoPanel = ({ nextPuzzle, solved, loading }: Props) => {
  return (
    <>
      <h1 className="text-xl font-bold text-white m-3">Solved: {solved}</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-center"
        onClick={nextPuzzle}
        disabled={loading}
      >
        {loading ? "Loading..." : "SKIP"}
      </button>
    </>
  );
};
export default InfoPanel;
