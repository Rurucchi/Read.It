import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import ResponsiveAppBar from "../../components/navbar";
import TitleBar from "../../components/postComponents/titlebar";
import PostWriteBox from "../../components/postComponents/postWriteBox";

const PostNew = () => {
  fetch("");

  return (
    <div>
      <TitleBar></TitleBar>
      <PostWriteBox></PostWriteBox>
    </div>
  );
};

export default PostNew;
