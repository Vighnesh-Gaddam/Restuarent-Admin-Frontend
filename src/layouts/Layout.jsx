import { Outlet } from "react-router-dom";
import Header from "../layouts/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />  {/* Renders child routes here */}
    </>
  );
};

export default Layout;
