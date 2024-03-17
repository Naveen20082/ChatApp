import React, { useContext, useState } from 'react';
import { SocketContextData } from '../../Context/SocketContext';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";

const Login = () => {

    const { registered, setRegistered } = useContext(SocketContextData)
    const [inputField, setInputField] = useState({
        Name: '',
        Email: '',
        Password: '',
    })

    const inputsHandler = (e) => {
        setInputField((prev)=>{ return { ...prev,  [e.target.name]: e.target.value }})
    }

    const LoginHandler = (event) => {
        event.preventDefault();
        try {
            let data = {
                "Name": inputField.Name,
                "Email": inputField.Email,
                "Password": inputField.Password,
            }
            console.log(inputField, data)
            axios.post('http://localhost:8000/registration', data).then((response) => {
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
                    <input id="input" autoComplete="off" onChange={inputsHandler} name='Name' value={inputField.Name} placeholder="Type in your Name" />
                    <input id="input" autoComplete="off" onChange={inputsHandler} name='Email' value={inputField.Email} placeholder="Type in your Email" />
                    <input id="input" autoComplete="off" onChange={inputsHandler} name='Password' value={inputField.Password} placeholder="Type in your Password" />
                    <button onClick={LoginHandler}>Send</button>
                </form>
        </>
    )
}

export default Login