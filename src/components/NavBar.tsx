import { Link } from "react-router";

const NavBar = () => {
  return (
    <div className="w-full h-16 bg-slate-800 flex gap-4 items-center text-white text-2xl border-b border-gray-500">
      <Link className=" hover:underline text-white px-4 py-2 rounded" to="/">
        Home
      </Link>

      <Link
        className=" hover:underline text-white px-4 py-2 rounded"
        to="/play"
      >
        Play
      </Link>

      <Link
        className=" hover:underline text-white px-4 py-2 rounded"
        to="/instructions"
      >
        Instructions
      </Link>
    </div>
  );
};

export default NavBar;
