import React, { useContext, useEffect, useState } from "react";
import NavBar2 from "../Component/NavBar2";
import { userData } from "../configs/userData";
import instance from "../axios/axios";
import cookies from "js-cookies";
import CardNotification from "../Component/CardNotification";
import Updations from "../Component/Updations";
import CardDashboard from "../Component/CardDashboard"
import io from "socket.io-client"
import ChatCard from "../Component/ChatCard";
import MsgBox from "../Component/MsgBox";
import VideoCall from "./Chat/VideoCall";


const NotificationPage = () => {
  const [activeSection, setActiveSection] = useState("chat");
  const [workFlow, setWorkFlow] = useState([]);
  const [requests,setRequests]=useState([])
  const [updations,setUpdations]=useState()
  const [msgUser,setMsgUser]=useState();
  const [connectUsers,setConnectUsers]=useState([])
  const [videoChat,setVideoChat]=useState();

  const val = useContext(userData);
  const {socket}=useContext(userData)
  const handleChatClick = () => {
    setActiveSection("chat");
  };

  const handleRequestsClick = () => {
    setActiveSection("requests");
  };

  const handlePostsRequestsClick = () => {
    setActiveSection("postsRequests");
  }; // Initially set to 'chat' section

  
  useEffect(() => {
    instance
      .get("/notifications", {
        params: {
          token: cookies.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setWorkFlow(res.data.data.workFlow);
        setRequests(res.data.data.requests)
        setConnectUsers(res.data.data.connectUsers);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);


  return (
    <>
    {videoChat ? <VideoCall data={videoChat} close={setVideoChat}/> :<>
      {/* Header */}
      <NavBar2 />
{updations ? <Updations close={setUpdations} data={updations.posts} user={updations.user[0]}/> :
      <div className="notification-container">

        <div className="notification-buttons">
          <button
            className={`notification-button ${
              activeSection === "chat" ? "active" : ""
            }`}
            onClick={handleChatClick}
          >
            Chat
          </button>
          <button
            className={`notification-button ${
              activeSection === "requests" ? "active" : ""
            }`}
            onClick={handleRequestsClick}
          >
            Requests
          </button>
          <button
            className={`notification-button ${
              activeSection === "postsRequests" ? "active" : ""
            }`}
            onClick={handlePostsRequestsClick}
          >
            Work Flow
          </button>
        </div>

        {/* Content Sections */}
        <div className="notification-content">
          {activeSection === "chat" && (
            <div className="notification-card">
              
              <div className="notification-card-body">
                <ChatCard users={connectUsers} msgUser={setMsgUser}/>
                <MsgBox user={msgUser ||connectUsers[0] } msgUser={setMsgUser} users={connectUsers} callUsers={setVideoChat}/>
              </div>
            </div>
          )}
          {activeSection === "requests" && (
            <div className="notification-card">
              <div className="notification-card-header">Requests</div>
              <hr className="hr" />
              <div className="card-grid">
              {requests?.map((x) => (
                  <CardDashboard gig={x.posts} view={false}/>
                ))}
              </div>
            </div>
          )}
          {activeSection === "postsRequests" && (
            <div className="notification-card">
              <div className="notification-card-header">Work Flow</div>
              <hr className="hr" />
              <div className="d-flex flex-column">
                {workFlow?.map((x) => (
                  <CardNotification data={x} updations={()=>{
                    setUpdations(x)
                  }}/>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
}</>}
    </>
  );
};

export default NotificationPage;
