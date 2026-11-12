import { Outlet } from "react-router";
import NavBar from "./components/NavBar";

const Layout = () => {
  return (
    <div className="h-full w-full font-squealer min-h-screen  bg-slate-900 ">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Layout;
