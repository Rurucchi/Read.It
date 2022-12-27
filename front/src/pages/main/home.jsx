import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import ResponsiveAppBar from "../../components/main-ui/navbar";

// COMPONENTS
import LoginSuccess from "../../components/userComponents/loginSuccess";

const Home = () => {
  return (
    <div>
      <ResponsiveAppBar></ResponsiveAppBar>
      <div className="appBody">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Home;
