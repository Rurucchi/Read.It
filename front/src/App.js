// LIBRARIES

import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";

// --------- PAGES

// MAIN PAGES
import Home from "./pages/main/home";
import SettingsPage from "./pages/main/settings";
import TopicPage from "./pages/main/topic";

// --------- POST PAGES
import PostNew from "./pages/post/postNew";
import PostEdit from "./pages/post/postEdit";
import PostView from "./pages/post/postView";

// --------- USER PAGES

import UserEdit from "./pages/user/userEdit";
import UserLogin from "./pages/user/userLogin";
import UserSignin from "./pages/user/userSignin";
import UserPage from "./pages/user/userPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/settings" element={<SettingsPage />}></Route>
        <Route path="/topic" element={<TopicPage />}></Route>
        <Route path="/post/new" element={<PostNew />}></Route>
        <Route path="/post/edit" element={<PostView />}></Route>
        <Route path="/post/view" element={<PostEdit />}></Route>
        <Route path="/user/edit" element={<UserEdit />}></Route>
        <Route path="/user/login" element={<UserLogin />}></Route>
        <Route path="/user/signin" element={<UserSignin />}></Route>
        <Route path="/user/view" element={<UserPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
