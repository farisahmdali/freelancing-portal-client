import React, { useContext, useEffect, useState } from 'react';
import './ChatBox.css';
import { userData } from '../../configs/userData';

const ChatBox = () => {
    const {socket }= useContext(userData)

  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello!', sender: 'other' },
    { id: 2, text: 'Hi there!', sender: 'user' },
  ]);


  const [userInput, setUserInput] = useState('');

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSendMessage = () => {
   socket.emit("answerCall","hi")
    
  };

  useEffect(()=>{
    socket.on("me",(data)=>{
        socket.emit("chatUser",data)
    })

    socket.on("answer",(data)=>{
        console.log(data)
    })

  },[])

  return (
    <div className="chat-box">
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
