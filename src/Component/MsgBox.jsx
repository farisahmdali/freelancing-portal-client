import React, { useContext, useEffect, useRef, useState } from "react";
import { userData } from "../configs/userData";
import cookie from "js-cookies";

function MsgBox({ user, users, msgUser, callUsers }) {
  const { socket, ...val } = useContext(userData);
  const [msg, setMsg] = useState("");
  const [showMsg, setShowMsg] = useState([]);
  const [room, setRoom] = useState();

  const uniqueArray = users.filter((value, index, self) => {
    // Find the index of the first occurrence of the username in the array
    const firstIndex = self.findIndex(
      (item) => item.username === value.username
    );
    // Keep the current object if its index is the same as the first index (i.e., it's the first occurrence)
    return index === firstIndex;
  });
  const divRef = useRef(null);

  const scrollToBottom = () => {
    console.log(divRef);
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    socket.emit("chatUser", {
      token: cookie.getItem("token"),
      otherUser: user?._id,
    });

    console.log(user);
    socket.on("prevChat", ({ data, room }) => {
      setRoom(room);
      setShowMsg([]);
      if(data){
        setShowMsg([...data]);
      }
    });
  }, [user]);

  // console.log(showMsg)

  socket.on("answer", (data) => {
    let chat = [...showMsg, data];
    setShowMsg(chat);
    if (chat) {
      scrollToBottom();
    }
  });

  return (
    <div>
      {user ? (
        <div className="flex-1 l sm:w-auto p:2 sm:p-6 justify-between  flex flex-col h-screen float-Right">
          <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
            <div className="relative flex items-center space-x-4">
              <div className="flex flex-col leading-tight">
                <div className="xl:text-2xl md:text-xl sm:text-lg mt-1 flex items-center">
                  <span className="text-gray-700 mr-3">{user?.name}</span>
                </div>
                <span className="xl:text-xl md:text-lg sm:text-xs text-gray-600">
                  {user?.workAs}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div>
                <button
                  type="button"
                  className="inline-flex md:hidden btn-down items-center md:hidde justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {" "}
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.49999 3.09998C7.27907 3.09998 7.09999 3.27906 7.09999 3.49998C7.09999 3.72089 7.27907 3.89998 7.49999 3.89998H14.5C14.7209 3.89998 14.9 3.72089 14.9 3.49998C14.9 3.27906 14.7209 3.09998 14.5 3.09998H7.49999ZM7.49998 5.1C7.27907 5.1 7.09998 5.27908 7.09998 5.5C7.09998 5.72091 7.27907 5.9 7.49998 5.9H14.5C14.7209 5.9 14.9 5.72091 14.9 5.5C14.9 5.27908 14.7209 5.1 14.5 5.1H7.49998ZM7.1 7.5C7.1 7.27908 7.27909 7.1 7.5 7.1H14.5C14.7209 7.1 14.9 7.27908 14.9 7.5C14.9 7.72091 14.7209 7.9 14.5 7.9H7.5C7.27909 7.9 7.1 7.72091 7.1 7.5ZM7.49998 9.1C7.27907 9.1 7.09998 9.27908 7.09998 9.5C7.09998 9.72091 7.27907 9.9 7.49998 9.9H14.5C14.7209 9.9 14.9 9.72091 14.9 9.5C14.9 9.27908 14.7209 9.1 14.5 9.1H7.49998ZM7.09998 11.5C7.09998 11.2791 7.27907 11.1 7.49998 11.1H14.5C14.7209 11.1 14.9 11.2791 14.9 11.5C14.9 11.7209 14.7209 11.9 14.5 11.9H7.49998C7.27907 11.9 7.09998 11.7209 7.09998 11.5ZM2.5 9.25003L5 6.00003H0L2.5 9.25003Z"
                      fill="currentColor"
                    />{" "}
                  </svg>
                </button>
                <div className="hidden slide-down absolute right-2.5 flex flex-col bg-slate-700 p-1 rounded">
                  {uniqueArray?.map((x) => (
                    <span
                      onClick={() => {
                        msgUser(x);
                      }}
                      className="hover:bg-none flex flex-wrap cursor-point border-solid border rounded border-slate-800 p-1 text-slate-300"
                    >
                      <img src={x.pic} width={30} />
                      <p className="">{x.username}</p>
                    </span>
                  ))}
                </div>
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                onClick={async () => {
                  callUsers({
                    token: cookie.getItem("token"),
                    id: user._id,
                    room,
                  });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-camera-video"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path
                    fill-rule="evenodd"
                    d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z"
                  />{" "}
                </svg>
              </button>
              
            </div>
          </div>
          <div
            id="messages"
            className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
          >
            {showMsg?.map((x, i) =>
              x?.user === user?._id ? (
                <div className="chat-message">
                  <div className="flex items-end">
                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                      <div>
                        <span
                          className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600"
                          ref={i === showMsg.length - 1 ? divRef : null}
                        >
                          <span className="time">{x?.time}</span>
                          <br />
                          {x?.chat}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="chat-message">
                  <div className="flex items-end justify-end">
                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                      <div>
                        <span
                          className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white "
                          ref={i === showMsg.length - 1 ? divRef : null}
                        >
                          <span className="time">{x?.time}</span>
                          <br />
                          {x?.chat}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
            <div className="relative flex">
              <input
                type="text"
                onChange={(e) => setMsg(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    if (msg) {
                      socket.emit("answerCall", {
                        token: cookie.getItem("token"),
                        otherUser: user?._id,
                        msg: msg,
                      });
                      const currentDate = new Date();
                      const currentHour = currentDate.getHours();
                      let currentMinute = currentDate.getMinutes() + "";
                      if (currentMinute.length < 2) {
                        currentMinute = 0 + currentMinute;
                      }
                      setShowMsg([
                        ...showMsg,
                        {
                          user: val.user?._id,
                          chat: msg,
                          time: currentHour + ":" + currentMinute,
                        },
                      ]);
                      setMsg("");
                    }
                    setTimeout(() => scrollToBottom(), 1000);
                  }
                }}
                value={msg}
                placeholder="Write your message!"
                className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
              />
              <div className="absolute right-0 items-center inset-y-0 sm:flex">
                <button
                  type="button"
                  onClick={() => {
                    if (msg) {
                      socket.emit("answerCall", {
                        token: cookie.getItem("token"),
                        otherUser: user?._id,
                        msg: msg,
                      });
                      const currentDate = new Date();
                      const currentHour = currentDate.getHours();
                      let currentMinute = currentDate.getMinutes() + "";
                      if (currentMinute.length < 2) {
                        currentMinute = 0 + currentMinute;
                      }
                      setShowMsg([
                        ...showMsg,
                        {
                          user: val.user?._id,
                          chat: msg,
                          time: currentHour + ":" + currentMinute,
                        },
                      ]);
                      setMsg("");
                    }
                    setTimeout(() => scrollToBottom(), 1000);
                  }}
                  className="inline-flex items-center justify-center h-full rounded-lg px-4 py-3 transition duration-500 ease-in-out text-grey hover:text-blue-400  bg-none focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-6 w-6 ml-2 transform rotate-90"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default MsgBox;
