import React from "react";
import Game from "../components/Game";

type Props = {};

export default function MainPage({}: Props) {
  return (
    <div className="w-full h-full flex justify-center items-center bg-red-500">
      <Game></Game>
    </div>
  );
}
