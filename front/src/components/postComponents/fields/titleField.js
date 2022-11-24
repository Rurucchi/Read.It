import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function TitleField() {
  const [title, setTitle] = useState("");

  return (
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
  );
}
