import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

// COMPONENTS
import UploadButton from "../../../components/postComponents/buttons/uploadButton";

// mui stuff
import { TextField, Box } from "@mui/material";

// API
import createPost from "../../../api/post/createPost";

const PostNew = () => {
  const navigate = useNavigate();

  // HOOKS
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");

  // REQUEST TO THE API

  const handleClick = async (e) => {
    const postSuccess = await createPost(title, content, topic);
    if (postSuccess.status === 200) {
      navigate("/");
    }
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25vh" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="topicField"
            label="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
      </Box>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "65vh" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="postTitle"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </Box>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "65vh" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="postContent"
          multiline
          rows={20}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Box>
      <UploadButton onClick={handleClick} />
    </div>
  );
};

export default PostNew;
