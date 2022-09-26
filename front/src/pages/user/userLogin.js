import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import ResponsiveAppBar from "../../components/navbar";

// Components
import CredsField from "../../components/userComponents/credsField";
import PasswordField from "../../components/userComponents/passwordField";
import LoginButton from "./loginButton";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <CredsField />
      <PasswordField />
      <LoginButton />
    </div>
  );
};

export default Login;
