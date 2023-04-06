import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function DeleteButton({ onClick }) {
  return (
    <Button variant="outlined" color="error" onClick={onClick}>
      Delete
    </Button>
  );
}
