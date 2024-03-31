import React, { useContext } from 'react'
import { SocketContextData } from '../Context/SocketContext'
import MessageFeild from './InputFeild/MessageFeild'

const Messages = () => {
    const { messages, socket, setRegistered } = useContext(SocketContextData);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userInfo)

    const LogOutHandler = ()=>{
        localStorage.setItem("userInfo", null);
        setRegistered(false)
    }
    return (

        <>
            <button onClick={LogOutHandler}>LogOut</button>
            <section className="msger">
                <header className="msger-header">
                    <div className="msger-header-title">
                        <i className="fas fa-comment-alt"></i> SimpleChat
                    </div>
                    <div className="msger-header-options">
                        <span><i className="fas fa-cog"></i></span>
                    </div>
                </header>

                <main className="msger-chat">
                    {
                        messages.map((message, index, array) => {
                            return (
                                <div className={userInfo.userData.Name !== message?.user?.Name ? "msg left-msg" : "msg right-msg"} key={index}>
                                    <div
                                        className="msg-img"
                                    // style={{ backgroundImage: "url(https://image.flaticon.com/icons/svg/327/327779.svg)" }}
                                    ></div>

                                    <div className="msg-bubble">
                                        <div className="msg-info">
                                            <div className="msg-info-name">{message?.user?.Name}</div>
                                            <div className="msg-info-time">{message?.time}</div>
                                        </div>

                                        <div className="msg-text">
                                            {message.message}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </main>

                <MessageFeild />
            </section>
        </>
    )
}

export default Messages


