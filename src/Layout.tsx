import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="h-full w-full bg-black font-squealer min-h-screen ">
      <div className="w-full h-16 bg-black flex justify-center items-center text-white text-2xl">
        Puzzle Battle
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
