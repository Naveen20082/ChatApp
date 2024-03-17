import './App.css';
import SocketContext, { SocketContextData } from './Context/SocketContext';
import { io } from 'socket.io-client';
import { useContext, useEffect, useState } from 'react';
import MessageFeild from './Components/InputFeild/MessageFeild';
import Login from './Components/Account/Login';
import Messages from './Components/Messages';

function App() {
  const { registered, socket } = useContext(SocketContextData);

 
  return (
    <>
     {registered===false && <Login/>}
     {registered && <Messages/>}
      
    </>
  );
}

export default App;
