import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import ResponsiveAppBar from "../../components/navbar";
import postBox from "../../components/postComponents/postbox";

const PostView = () => {
  return (
    <div>
      <postBox></postBox>
    </div>
  );
};

export default PostView;
