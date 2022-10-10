import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function CredsField(rest) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "30vh" },
      }}
      noValidate
    >
      <div>
        <TextField required id="credentials" label="Credentials" {...rest} />
      </div>
    </Box>
  );
}
