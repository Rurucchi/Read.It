import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

// COMPONENTS

import TitleBar from "../../components/postComponents/titleField";
import PostWriteField from "../../components/postComponents/postWriteField";
import UploadButton from "../../components/postComponents/uploadButton";

const PostNew = () => {
  return (
    <div>
      <TitleBar />
      <PostWriteField />
      <UploadButton />
    </div>
  );
};

export default PostNew;
