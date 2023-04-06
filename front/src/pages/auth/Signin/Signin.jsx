import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import ResponsiveAppBar from "../../../components/main-ui/navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Stack } from "@mui/system";

// COMPONENTS
import NameField from "../../../components/userComponents/fields/nameField";
import CredsField from "../../../components/userComponents/fields/credsField";
import PasswordField from "../../../components/userComponents/fields/passwordField";
import SigninButton from "../../../components/userComponents/buttons/signinButton";

// API REQUESTS
import CreateUserRequest from "../../../api/user/createUserRequest";
import LoginRequest from "../../../api/user/loginRequest.js";
import getUserName from "../../../api/user/me";

const Signin = () => {
  // Hooks
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async () => {
    const createUserSuccess = await CreateUserRequest(name, password);
    if (createUserSuccess) {
      const loginSuccess = await LoginRequest(name, password);
      if (loginSuccess) {
        navigate("/");
      }
    }
  };

  return (
    <div>
      <Stack>
        <h1>Sign-in</h1>
        <NameField value={name} onChange={(e) => setName(e.target.value)} />
        <PasswordField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SigninButton onClick={handleClick} />
      </Stack>
    </div>
  );
};

export default Signin;
