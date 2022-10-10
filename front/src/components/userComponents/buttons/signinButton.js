import * as React from "react";
import Button from "@mui/material/Button";

export default function SigninButton({ onClick }) {
  return (
    <div>
      <Button variant="outlined" id="login" onClick={onClick}>
        Sign-in
      </Button>
    </div>
  );
}
