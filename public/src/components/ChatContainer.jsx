import React, { useState, useEffect, useRef } from 'react'
import styled from "styled-components"
import ChatInput from './ChatInput';
import Logout from './Logout';
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes'
import { v4 as uuidv4 } from "uuid";
import "./cssComponents/ChatContainer.css"

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();


  //fetches the data needed to send a message
  useEffect(() => {

    const fetchData = async () => {
      if (currentChat) {
        const response = await axios.post(getAllMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    }
    fetchData();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({
      fromSelf: true,
      message: msg,
    });
    setMessages(msgs);
  };

  
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieved", (msg) => {
        setArrivalMessage({
          fromSelf: false,
          message: msg,
        });
      })
    }
  }, []);

  //Updates the messages
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);


  //Always shows the newest message on the screen
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {
        currentChat && (
          <div className='ChatContainer'>
            <div className="chat-header">
              <div className="user-details">
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                    alt="avatar" />
                </div>
                <div className="username">
                  <h3>{currentChat.username}</h3>
                </div>
              </div>
              <Logout />
            </div>
            <div className="chat-messages">
              {messages.map((message) => {
                return (
                  <div ref={scrollRef} key={uuidv4()}>
                    <div
                      className={`message ${message.fromSelf ?
                        "sended" :
                        "recieved"
                        }`}
                    >
                      <div className="content ">
                        <p>{message.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <ChatInput handleSendMsg={handleSendMsg} />
          </div>
        )
      }
    </>
  );
}

