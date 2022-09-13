import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import ResponsiveAppBar from "../../components/navbar";
import postBox from "../../components/postComponents/postbox";

const TopicPage = () => {
  return (
    <div className="">
      <postBox></postBox>
    </div>
  );
};

export default TopicPage;
