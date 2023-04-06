import * as React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

export default function UploadButton({ onClick }) {
  return (
    <Button variant="contained" endIcon={<SendIcon />} onClick={onClick}>
      Save
    </Button>
  );
}
