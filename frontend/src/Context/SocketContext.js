import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';



export const SocketContextData = createContext(null);
const socket = io('http://localhost:8080');
const SocketContext = ({ children }) => {

  // let socket = io();

  const [first, setfirst] = useState("Hello World");
  const [registered, setRegistered] = useState(false);
  const [messages, setMessages] = useState(["kljsdhflkjd"]);

  // whether the session has expired or not
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo !== null) {
      const token = jwtDecode(userInfo.token);
      if (Math.floor(new Date().getTime() / 1000) < token.exp) {
        setRegistered(true);
      } else {
        setRegistered(false);
        localStorage.setItem("userInfo", null)
      }
    }
  }, [])


  socket.on('connect', () => {
    console.log('Connected to the server!');
  });

  // Event handler for custom events from the server
  socket.off('chat_message').on('chat_message', (data) => {
    console.log('Received data from server:', data);
    // if (messages.length<14) {
    setMessages(data)
    // } else {
    //   setMessages((prev)=> [data,...prev.slice(-13)])
    // }
  });

  // Event handler for when the client is disconnected from the server
  socket.on('disconnect', () => {
    console.log('Disconnected from the server!');
  });



  return (
    <SocketContextData.Provider value={{
      // name, age, happyBirthday
      first,
      socket,
      registered, setRegistered,
      messages,
    }}>
      {children}
    </SocketContextData.Provider>
  );

}

export default SocketContext