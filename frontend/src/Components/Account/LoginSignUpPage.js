import React, { useContext, useEffect, useState } from 'react'
import { SocketContextData } from '../../Context/SocketContext';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";

const LoginSignUpPage = () => {

    
    const {  setRegistered } = useContext(SocketContextData)
    const [signUpData, setSignUpData] = useState({
        Name: '',
        Email: '',
        Password: '',
    });

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
            axios.post('http://localhost:8000/login', data).then((response) => {
                console.log(response , loginData)
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

    const signUpInputHandler = (e) => {
        setSignUpData((prev)=>{ return { ...prev,  [e.target.name]: e.target.value }})
    }

    const SignUpHandler = (event) => {
        event.preventDefault();
        try {
            let data = {
                "Name": signUpData.Name,
                "Email": signUpData.Email,
                "Password": signUpData.Password,
            }
            console.log(signUpData, data)
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

    useEffect(()=>{
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');
        
        signUpButton.addEventListener('click', () =>
        container.classList.add('right-panel-active'));
        
        signInButton.addEventListener('click', () =>
        container.classList.remove('right-panel-active'));
    },[]);

    return (
        <>
            <div class="container" id="container">
                <div class="form-container sign-up-container">
                    <form action="#">
                        <h1>Create Account</h1>
                        <div class="social-container">
                            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Name" onChange={signUpInputHandler} name='Name' value={signUpData.Name}/>
                        <input type="email" placeholder="Email" onChange={signUpInputHandler} name='Email' value={signUpData.Email} />
                        <input type="password" placeholder="Password" onChange={signUpInputHandler} name='Password' value={signUpData.Password}/>
                        <button onClick={SignUpHandler}>Sign Up</button>
                    </form>
                </div>
                <div class="form-container sign-in-container">
                    <form action="#">
                        <h1>Sign in</h1>
                        <div class="social-container">
                            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your account</span>
                        <input type="email" placeholder="Email" onChange={loginInputHandler} name='Email' value={loginData.Email} />
                        <input type="password" placeholder="Password" onChange={loginInputHandler} name='Password' value={loginData.Password} />
                        <a href="#">Forgot your password?</a>
                        <button onClick={LoginHandler}>Sign In</button>
                    </form>
                </div>
                <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button class="ghost" id="signIn">Sign In</button>
                        </div>
                        <div class="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button class="ghost" id="signUp">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer">
                <b>	Follow me on </b>
                <div class="icons">
                    <a href="" target="_blank" class="social"><i class="fab fa-github"></i></a>
                    <a href="" target="_blank" class="social"><i class="fab fa-instagram"></i></a>
                    <a href="" target="_blank" class="social"><i class="fab fa-medium"></i></a>
                    <a href="" target="_blank" class="social"><i class="fab fa-twitter-square"></i></a>
                    <a href="" target="_blank" class="social"><i class="fab fa-linkedin"></i></a>
                </div>
            </div>
        </>
    )
}

export default LoginSignUpPage