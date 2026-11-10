import { Outlet } from "react-router";
import NavBar from "./components/NavBar";

const Layout = () => {
  return (
    <div className="h-full w-full bg-black font-squealer min-h-screen ">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Layout;
