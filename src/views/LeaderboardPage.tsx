import { useEffect, useState } from "react";

const DEFAULT_LEADERBOARD = [1, 5, 8, 10];

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState<number[]>([
    1, 5, 10, 15, 20, 25, 30, 35, 40, 45,
  ]);

  useEffect(() => {
    const storedData = localStorage.getItem("myData");

    if (storedData) {
      try {
        const parsedLeaderboard = JSON.parse(storedData);
        setLeaderboard(parsedLeaderboard.concat(DEFAULT_LEADERBOARD));
      } catch (error) {
        console.error("Error parsing stored data:", error);
        setLeaderboard(DEFAULT_LEADERBOARD);
      }
    } else {
      setLeaderboard(DEFAULT_LEADERBOARD);
    }
  }, []);
  return (
    <div className="flex flex-col items-center  min-h-screen bg-gray-900 text-white pt-20">
      <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
      <h2 className="text-xl font-bold mb-4 ">Solved:</h2>
      <ul>
        {leaderboard
          .sort((a, b) => b - a)
          .map((score, index) => (
            <li
              key={index}
              className={
                index === 0
                  ? "text-yellow-400 font-bold"
                  : index === 1
                    ? "text- font-bold"
                    : index === 2
                      ? "text-amber-500 font-bold"
                      : "text-white"
              }
            >
              {score}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default LeaderboardPage;
