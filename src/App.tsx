import { Route, Routes } from "react-router";
import MainPage from "./views/MainPage";
import Layout from "./Layout";
import LandingPage from "./views/LandingPage";
import LeaderboardPage from "./views/LeaderboardPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="play" element={<MainPage />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
