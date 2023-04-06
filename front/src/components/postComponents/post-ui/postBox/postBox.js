import * as React from "react";

// mui components
import { Divider } from "@mui/material";

// styling
import styles from "./styles.module.css";

export default function PostBox({ data }) {
  return (
    <div className={styles.postContainer}>
      <div className={styles.votesContainer}>
        <p>{data.votes}</p>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.infoContainer}>
          <h2>{data.topic}</h2>
          <h2>Posted by {data.user}</h2>
        </div>
        <Divider />
        <h1>{data.title}</h1>
        <Divider />
        <p>{data.content}</p>
      </div>
    </div>
  );
}
