import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function NameField(rest) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "30vh" },
      }}
      noValidate
    >
      <div>
        <TextField required id="name" label="Username" {...rest} />
      </div>
    </Box>
  );
}
