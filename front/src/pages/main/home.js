import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import ResponsiveAppBar from "../../components/navbar";

// COMPONENTS
import LoginSuccess from "../../components/userComponents/loginSuccess";

const Home = () => {
  return (
    <div>
      <ResponsiveAppBar></ResponsiveAppBar>
      <div className="body">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Home;
