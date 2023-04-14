// TODO : make an actual UI 😂

import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

// ui elements
import PostBox from "../../../components/postComponents/post-ui/postBox/postBox";

// api calls
import { getPost } from "../../../api/post/getPost";
import searchUserWithUID from "../../../api/user/getUsername";

//css
import styles from "./styles.module.css";

// context stuff
import { AuthContext } from "../../../context/AuthContext";

const PostView = () => {
  //hooks

  // states
  const [loaded, setLoaded] = useState(false);
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [user, setUser] = useState("");
  const [content, setContent] = useState("");
  const [votes, setVotes] = useState("");
  const [embed, setEmbed] = useState("");

  // router
  const navigate = useNavigate();

  //auth
  const auth = useContext(AuthContext);

  // params
  let { id } = useParams();

  useEffect(() => {
    (async () => {
      const query = await getPost(id);
      const userQuery = await searchUserWithUID(query.user);
      // post content
      setTopic(query.topic);
      setTitle(query.title);
      setUser(userQuery.user);
      setContent(query.content);
      setVotes(query.votes);
      setEmbed(query.emebed);
      setContent(query.content);
      setLoaded(true);
    })();
  }, []);

  if (loaded) {
    return (
      <div className={styles.body}>
        <PostBox
          data={{
            topic: topic,
            title: title,
            user: user,
            content: content,
            votes: votes,
            embed: null,
          }}
        />
      </div>
    );
  }
};

export default PostView;
