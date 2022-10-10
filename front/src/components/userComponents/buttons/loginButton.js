import * as React from "react";
import Button from "@mui/material/Button";

export default function LoginButton({ onClick }) {
  return (
    <div>
      <Button variant="outlined" id="login" onClick={onClick}>
        Login
      </Button>
    </div>
  );
}
