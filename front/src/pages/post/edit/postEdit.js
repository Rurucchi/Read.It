import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// mui stuff
import { TextField, Box } from "@mui/material";

// components
import UploadButton from "../../../components/postComponents/buttons/uploadButton";
import DeleteButton from "../../../components/postComponents/buttons/deleteButton";

//api
import { getPost } from "../../../api/post/getPost";
import editPost from "../../../api/post/editPost";
import deletePost from "../../../api/post/deletePost";

const PostEdit = () => {
  // other hooks
  const navigate = useNavigate();

  // logged in?
  const [loaded, setLoaded] = useState(false);

  let { id } = useParams();
  let data;

  // page states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");

  useEffect(() => {
    (async () => {
      // REQUEST TO THE API
      data = await getPost(id);
      setTitle(data.title);
      setContent(data.content);
      setTopic(data.topic);
      setLoaded(true);
    })();
  }, []);
  // HOOKS

  const handleSave = async (e) => {
    const postSuccess = await editPost(title, content, topic, null, id);
    if (postSuccess.status === 200) {
      navigate("/");
    }
  };

  const handleDelete = async (e) => {
    const postSuccess = await deletePost(id);
    if (postSuccess.status === 200) {
      navigate("/");
    }
  };

  if (loaded) {
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
        <UploadButton onClick={handleSave} />
        <DeleteButton onClick={handleDelete} />
      </div>
    );
  }
};

export default PostEdit;
