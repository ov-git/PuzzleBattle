import React from "react";
import { Link } from "react-router";

type Props = {};

const NavBar = (props: Props) => {
  return (
    <div className="w-full h-16 bg-black flex gap-4 items-center text-white text-2xl">
      <Link className="bg-blue-500 text-white px-4 py-2 rounded" to="/">
        Home
      </Link>

      <Link className="bg-blue-500 text-white px-4 py-2 rounded" to="/play">
        Play
      </Link>

      <Link
        className="bg-blue-500 text-white px-4 py-2 rounded"
        to="/leaderboard"
      >
        Leaderboard
      </Link>
    </div>
  );
};

export default NavBar;
