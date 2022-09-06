import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import ResponsiveAppBar from "../../components/navbar";

const TopicPage = () => {
  return (
    <div classname="">
      <ResponsiveAppBar></ResponsiveAppBar>
    </div>
  );
};

export default TopicPage;
