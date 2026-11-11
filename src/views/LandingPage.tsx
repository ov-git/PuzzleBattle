import { Link } from "react-router/internal/react-server-client";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <div className="w-full h-[55vh] sm:h-[85vh] flex flex-col justify-center items-center gap-6 bg-slate-900 text-white">
      <h1 className="text-4xl font-bold">Puzzle Battle</h1>
      <p>Welcome to my chess puzzle trainer!</p>
      <Link
        className=" hover:underline text-white px-4 py-2 rounded bg-green-800"
        to="/play"
      >
        Start solving
      </Link>
    </div>
  );
};

export default LandingPage;
