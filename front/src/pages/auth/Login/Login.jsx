import { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import styles from "./styles.module.css";

// TODO : RESOLVE WARNING

// CONTEXT
import { AuthContext } from "../../../context/AuthContext";

// Components
import CredsField from "../../../components/userComponents/fields/credsField";
import PasswordField from "../../../components/userComponents/fields/passwordField";
import LoginButton from "../../../components/userComponents/buttons/loginButton";

//API REQUEST
import LoginRequest from "../../../api/user/loginRequest";
import tryLogin from "../../../api/user/tryLogin";

// OTHER FUNCTIONS

const Login = () => {
  // Hooks
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  // CHECK IF USER IS ALREADY LOGGED IN
  const [creds, setCreds] = useState("");
  const [password, setPassword] = useState("");
  const [loaded, setLoaded] = useState(false);

  if (auth.authState) {
    return navigate("/");
  }

  const handleClick = async (e) => {
    const loginSuccess = await LoginRequest(creds, password);
    if (loginSuccess) {
      console.log(loginSuccess);
      auth.setAuthState(true);
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
      <p>
        No account? <a href="/signin">Register</a>
      </p>
    </div>
  );
};

export default Login;
