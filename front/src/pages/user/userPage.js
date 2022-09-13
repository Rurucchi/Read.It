import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import ResponsiveAppBar from "../../components/navbar";

const UserPage = () => {
  return (
    <div className="">
      <ResponsiveAppBar></ResponsiveAppBar>
    </div>
  );
};

export default UserPage;
