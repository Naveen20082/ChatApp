import React, { useContext, useState } from 'react';
import { SocketContextData } from '../../Context/SocketContext';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";

const Login = () => {

    const { registered, setRegistered } = useContext(SocketContextData)
    const [loginData, setLoginData] = useState({
        Email: '',
        Password: '',
    })

    const loginInputHandler = (e) => {
        setLoginData((prev)=>{ return { ...prev,  [e.target.name]: e.target.value }})
    }

    const LoginHandler = (event) => {
        event.preventDefault();
        try {
            let data = {
                "Email": loginData.Email,
                "Password": loginData.Password,
            }
            console.log(loginData, data)
            axios.post('http://localhost:8000/login', data).then((response) => {
                const token = jwtDecode(response.data.token);
                const d = new Date();
                console.log(response.data , token,Math.floor(d.getTime()/1000));
                if (Math.floor(d.getTime()/1000)<token.exp) {
                    localStorage.setItem("userInfo", JSON.stringify(response.data))
                    setRegistered(true);
                }
            }).catch((error) => {
                console.log(error)
            })
        } catch (error) {
            console.log("Error In catch")
        }
    }
    return (
        <>
                <form id="login_form" action="" className=''>
                    <input id="input" autoComplete="off" onChange={loginInputHandler} name='Email' value={loginData.Email} placeholder="Type in your Email" />
                    <input id="input" autoComplete="off" onChange={loginInputHandler} name='Password' value={loginData.Password} placeholder="Type in your Password" />
                    <button onClick={LoginHandler}>Login</button>
                </form>
        </>
    )
}

export default Login