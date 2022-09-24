import * as React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

export default function UploadButton() {
  // await function sendPost(postTitle, postContent, ) {
  //   try {
  //     const requestBody = {
  //       "user": ,
  //       "title": req.body.title,
  //       "topic": req.body.topic,
  //       "create": req.body.date,
  //       "content": req.body.content,
  //       votes: 0,
  //     }

  //   fetch (process.env.SERVER,
  //     {
  //       method: "POST",
  //       body: requestBody,
  //     })
  // }
  // };

  return (
    <Button variant="contained" endIcon={<SendIcon />}>
      Send
    </Button>
  );
}
