import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import ResponsiveAppBar from "../../components/navbar";
import TitleBar from "../../components/postComponents/titleField";
import postWriteField from "../../components/postComponents/postWriteField";

const PostNew = () => {
  fetch("");

  return (
    <div>
      <TitleBar />
      <postWriteField />
    </div>
  );
};

export default PostNew;
