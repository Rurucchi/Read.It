import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function PostWriteField() {
  const [content, setContent] = React.useState("");

  return (
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
  );
}
