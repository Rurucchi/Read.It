import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import ResponsiveAppBar from "../../components/navbar";

const UserSignin = () => {
  return (
    <div className="">
      <h3>New user?</h3>
      <h1>Sign-in</h1>
    </div>
  );
};

export default UserSignin;
