// LIBRARIES
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { React, useEffect, useState, useContext } from "react";

// --------- PAGES

// MAIN PAGES
import Home from "./pages/main/home";
import TopicPage from "./pages/main/topic";
import NoMatch from "./pages/main/noMatch";

// --------- POST PAGES
import PostContainer from "./pages/post/postContainer";

import PostNew from "./pages/post/new/postNew";
import PostEdit from "./pages/post/edit/postEdit";
import PostView from "./pages/post/view/postView";

// --------- USER PAGES
import UserContainer from "./pages/user/userContainer";

import UserSettings from "./pages/user/userSettings";
import UserPage from "./pages/user/userPage";

// --------- Auth pages
import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register/Register";

// --------- Context variables
import { AuthContext } from "./context/AuthContext";

// functions
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signin" element={<Register />}></Route>
          <Route path="/" element={<Home />}>
            <Route path="/topic" element={<TopicPage />}></Route>
            <Route path="/post" element={<PostContainer />}>
              <Route path="new" element={<PostNew />}></Route>
              <Route path="view/:id" element={<PostView />}></Route>
              <Route path="edit/:id" element={<PostEdit />}></Route>
            </Route>
            <Route path="/user" element={<UserContainer />}>
              <Route path="view" element={<UserPage />}></Route>
              <Route path="settings" element={<UserSettings />}></Route>
            </Route>
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
