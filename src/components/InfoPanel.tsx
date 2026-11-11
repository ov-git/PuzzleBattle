type Props = {
  solved: number;
  loading: boolean;
};

const InfoPanel = ({ solved, loading }: Props) => {
  return (
    <>
      <h1 className="text-xl text-red-200">Solved: {solved}</h1>
      {/* <button onClick={nextPuzzle} disabled={loading}>
        {loading ? "Loading..." : "New Puzzle"}
      </button> */}
    </>
  );
};
export default InfoPanel;
