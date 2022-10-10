import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function PasswordField(rest) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "30ch" },
      }}
      noValidate
    >
      <TextField
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        {...rest}
      />
    </Box>
  );
}
