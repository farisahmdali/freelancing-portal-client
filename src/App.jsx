import "./App.css";
import { Routes, Route } from "react-router-dom";
import { userData } from "./configs/userData";
import { useState } from "react";
import Home from "./Home/Home";
import Login from "./Login/Login";
import DashBoard from "./DashBoard/DashBoard";
import Profile from "./Profile/Profile";
import MyPosts from "./MyPosts/MyPosts";
import Admin from "./Admin/Admin";
import CreatePost from "./MyPosts/CreatePost.jsx/CreatePost";
import Admin_panel from "./Admin/Admin_panel/Adminpanel";
import More from "./Admin/Admin_panel/More";
import View from "./DashBoard/ViewPost/ViewPost";
import NotificationPage from "./Notifications/Notifications";
import ViewProfiles from "./ViewProfiles/ViewProfiles";
import  io  from "socket.io-client";
import VideoCall from "./Notifications/Chat/VideoCall";
import Saved  from "./Saved/Saved"

const socket = io.connect("https://server.getdone.site/")

function App() {
  const [user, setUser] = useState("");
 
  return (
    <div className="App">
      <userData.Provider value={{ user, setUser,socket}}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/myPosts" element={<MyPosts />} />
          <Route path="/notification" element={<NotificationPage />} />
          <Route path="/saved" element={<Saved/>} />
          <Route path="/Login" element={<Login />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin_panel" element={<Admin_panel />} />
          <Route path="/admin_panel/more" element={<More />} />
          <Route path="/post/:userId/:postId" element={<View />} />
          <Route path="/user/:userId" element={<ViewProfiles/>} />
          <Route path="/vide" element={<VideoCall/>} />
        </Routes>
      </userData.Provider>
    </div>
  );
}

export default App;
