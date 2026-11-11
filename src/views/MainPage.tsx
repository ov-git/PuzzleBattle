import Game from "../components/Game";

type Props = {};

export default function MainPage({}: Props) {
  return (
    <div className="mt-20 w-full h-full flex justify-center">
      <Game></Game>
    </div>
  );
}
