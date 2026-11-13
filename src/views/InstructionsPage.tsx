const InstructionsPage = () => {
  return (
    <div className="flex flex-col gap-4 items-center text-white max-w-300 p-12">
      <h2 className="text-2xl font-bold ">What are chess puzzles?</h2>
      <p>
        Chess puzzles are problems that require the solver to find a specific
        sequence of moves to achieve a particular goal, such as checkmate or
        capturing a piece. All puzzles only have one possible solution that
        leads to winning advantage or sometimes saves a draw.
      </p>
      <h2 className="text-2xl font-bold mt-4 ">New to chess?</h2>
      <p>
        Rules of chess and how to move the pieces is explained in this chess.com
        article.
      </p>
      <a
        href="https://www.chess.com/learn-how-to-play-chess"
        className="font-bold hover:underline"
      >
        Chess.com/learn-how-to-play-chess
      </a>
    </div>
  );
};

export default InstructionsPage;
