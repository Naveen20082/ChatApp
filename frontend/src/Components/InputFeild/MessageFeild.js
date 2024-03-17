import React, { useContext, useState } from 'react'
import { SocketContextData } from '../../Context/SocketContext';

const MessageFeild = () => {
    const { registered, socket } = useContext(SocketContextData);
    const [inputField, setInputField] = useState({
        message: '',
        last_name: '',
        gmail: ''
    })

    const inputsHandler = (e) => {
        setInputField({ [e.target.name]: e.target.value })
    }

    const submitButton = () => {
        alert(inputField.first_name)
    }

    const SendMessage = (event) => {
        event.preventDefault();
        const userInfo = JSON.parse(localStorage.getItem("userInfo")).userData;
        console.log(socket)
        const date = new Date();

        const Message = {
            message: inputField.message,
            user: userInfo,
            time: `${date.getHours()}:${date.getMinutes()}`,
            id: socket.id,
        }

        socket.emit("message", JSON.stringify(Message))
        setInputField((prev) => { return { ...prev, message: "" } })
    }
    return (
        <>
            {/* { registered && */}
            <form className="msger-inputarea">
                <input id="input" autoComplete="off" onChange={inputsHandler} name='message' value={inputField.message} placeholder="Enter your message..." />
                <button type="submit" className="msger-send-btn" onClick={SendMessage}>Send</button>
            </form>
            {/* } */}
        </>
    )
}

export default MessageFeild