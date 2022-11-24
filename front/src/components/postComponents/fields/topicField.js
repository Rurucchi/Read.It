import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function TopicField() {
  const [topic, setTopic] = useState("");

  return (
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
  );
}
