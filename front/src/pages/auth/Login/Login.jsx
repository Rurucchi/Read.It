import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import styles from "./styles.module.css";

// Components
import CredsField from "../../../components/userComponents/fields/credsField";
import PasswordField from "../../../components/userComponents/fields/passwordField";
import LoginButton from "../../../components/userComponents/buttons/loginButton";

//API REQUEST
import LoginRequest from "../../../api/user/loginRequest";
import getUserName from "../../../api/user/me";

// OTHER FUNCTIONS

const Login = () => {
  // Hooks
  const navigate = useNavigate();

  // CHECK IF USER IS ALREADY LOGGED IN

  useEffect(() => {
    getUserName(localStorage.getItem("token")).then((data) => {
      if (data) {
        navigate("/");
      }
    });
  }, []);

  const [creds, setCreds] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = (e) => {
    const loginSuccess = LoginRequest(creds, password);
    if (loginSuccess) {
      navigate("/");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <CredsField value={creds} onChange={(e) => setCreds(e.target.value)} />
      <PasswordField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <LoginButton onClick={handleClick} />
    </div>
  );
};

export default Login;
