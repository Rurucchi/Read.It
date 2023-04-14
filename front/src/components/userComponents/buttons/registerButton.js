import * as React from "react";
import Button from "@mui/material/Button";

export default function RegisterButton({ onClick }) {
  return (
    <div>
      <Button variant="outlined" id="login" onClick={onClick}>
        Register
      </Button>
    </div>
  );
}
