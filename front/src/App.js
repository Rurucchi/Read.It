// LIBRARIES
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// --------- PAGES

// MAIN PAGES
import Home from "./pages/main/home";
import TopicPage from "./pages/main/topic";
import NoMatch from "./pages/main/noMatch";

// --------- POST PAGES
import PostContainer from "./pages/post/postContainer";

import PostNew from "./pages/post/postNew";
import PostEdit from "./pages/post/postEdit";
import PostView from "./pages/post/postView";

// --------- USER PAGES
import UserContainer from "./pages/user/userContainer";

import UserSettings from "./pages/user/userSettings";
import UserLogin from "./pages/user/userLogin";
import UserSignin from "./pages/user/userSignin";
import UserPage from "./pages/user/userPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/topic" element={<TopicPage />}></Route>
          <Route path="/post" element={<PostContainer />}>
            <Route path="new" element={<PostNew />}></Route>
            <Route path="view" element={<PostView />}></Route>
            <Route path="edit" element={<PostEdit />}></Route>
          </Route>
          <Route path="/user" element={<UserContainer />}>
            <Route path="login" element={<UserLogin />}></Route>
            <Route path="signin" element={<UserSignin />}></Route>
            <Route path="view" element={<UserPage />}></Route>
            <Route path="settings" element={<UserSettings />}></Route>
          </Route>
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
