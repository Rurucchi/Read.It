import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";

// COMPONENTS

import TitleBar from "../../components/postComponents/fields/titleField";
import PostWriteField from "../../components/postComponents/fields/postWriteField";
import UploadButton from "../../components/postComponents/buttons/uploadButton";
import TopicField from "../../components/postComponents/fields/topicField";

// API
import createPost from "../../api/post/createPost";

const PostNew = () => {
  const navigate = useNavigate();

  // HOOKS
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");

  // REQUEST TO THE API

  const handleClick = (e) => {
    const postSuccess = createPost(title, content, topic);
    if (postSuccess) {
      navigate("/");
    }
  };

  return (
    <div>
      <TopicField value={topic} onChange={(e) => setTitle(e.target.value)} />
      <TitleBar value={title} onChange={(e) => setTitle(e.target.value)} />
      <PostWriteField
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <UploadButton onClick={handleClick} />
    </div>
  );
};

export default PostNew;
