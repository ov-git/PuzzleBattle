import React from "react";
import { Link } from "react-router/internal/react-server-client";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <div className="w-full h-full flex justify-center items-center bg-blue-500 text-white">
      <h1>Landing Page</h1>
      <p>Welcome to the Landing Page!</p>
      <Link to="/play">Play</Link>
    </div>
  );
};

export default LandingPage;
