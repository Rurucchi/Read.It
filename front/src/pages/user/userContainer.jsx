import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import ResponsiveAppBar from "../../components/main-ui/navbar";

const UserContainer = () => {
  return <Outlet></Outlet>;
};

export default UserContainer;
