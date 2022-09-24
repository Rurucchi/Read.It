import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function CredsField() {
  const [creds, setCreds] = React.useState("");

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "30vh" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="credentials"
          label="Credentials"
          value={creds}
          onChange={(e) => setCreds(e.target.value)}
        />
      </div>
    </Box>
  );
}
