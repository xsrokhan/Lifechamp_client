import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { LangProvider } from '../LangProvider'
import '../styles/Login.css'
import Axios from 'axios'

export const Login = ({ loggedIn, setUserData, setTasks, setPastTasks }) => {
    const [loginPage, setLoginPage] = useState(true)
    const [registered, setRegistered] = useState(false)
    const [loginCredentials, setLoginCredentials] = useState({ username: "", password: "" })
    const [registerCredentials, setRegisterCredentials] = useState({ username: "", password: "" })
    const [validCredential, setValidCredential] = useState(true)
    const [userExists, setUserExists] = useState(false)
    const [userNotFound, setUserNotFound] = useState(false)
    const [loginAnimation, setLoginAnimation] = useState(false)
    const regEx = /^([A-Za-z0-9]{4,9})$/
    const navigate = useNavigate()

    useEffect(() => {
        navigate("/")
    }, [])

    useEffect(() => {
        if (registered) {
            let timer = setTimeout(() => setLoginPage(true), 2000)
            return () => clearTimeout(timer) 
        }
    }, [registered])

    function loggedInTimeout () {
        let timer = setTimeout(() => {loggedIn(true); localStorage.setItem("LF_loggedIn", "true")}, 1300)
        return () => clearTimeout(timer)  
    }

    function handleRegisterChange(e) {
        const credential = e.target.name
        const value = e.target.value
        setRegisterCredentials(prev => ({...prev, [credential]: value}))
    }

    function handleLoginChange(e) {
        const credential = e.target.name
        const value = e.target.value
        setLoginCredentials(prev => ({...prev, [credential]: value}))
    }
    

    function register() {
        const { username, password } = registerCredentials
        if (!regEx.test(username) || !regEx.test(password)) {
            setValidCredential(false)
            setUserExists(false)
            setRegistered(false)
        } else {
            Axios.post("https://lifechampserver-production.up.railway.app/createUser", { password, username, current: [], past: [], medals: {"gold": 0, "silver": 0, "bronze": 0} })
            .then(res => {
                setRegistered(true)
                setValidCredential(true)
                setUserExists(false)
                setUserNotFound(false)
                setRegisterCredentials({ username: "", password: "" })
            })
            .catch(err => {
                const msg = err.response.data.message
                setUserExists(msg === "username exists" ? true : false)
                setValidCredential(msg === "username exists" ? true : false)
                setRegistered(msg === "username exists" ? false : true)
                console.log(msg)
            })
        }
    }

    function login() {
        const { username, password } = loginCredentials
        Axios.post("https://lifechampserver-production.up.railway.app/getUser", { username, password }).then(res => { setUserData(res.data); setTasks(res.data.current); setPastTasks(res.data.past); localStorage.setItem("LF_userData", JSON.stringify(res.data)) })
        .then(() => {setUserNotFound(false); setLoginAnimation(true); loggedInTimeout()})
        .catch(err => {
            const msg = err.response.data.message
            setUserNotFound(msg === "user not found" ? true : false)
            setRegistered(false)
            console.log(msg)
        })
    }

    return (
        <div className="container-wrapper">
        <div className={`container ${loginPage ? "flip-to-login" : "flip-to-register"} ${loginAnimation ? "loggedIn" : ""}`}>
            <div className="front">
                <div className="input">
                    <span><LangProvider location="username"/></span>
                    <input type="text" name="username" onChange={handleLoginChange} />
                </div>
                <div className="input">
                    <span><LangProvider location="password"/></span>
                    <input type="password" name="password" onChange={handleLoginChange} />
                </div>
                {registered && <span className="login-register-msgs"><LangProvider location="login-new-cred" /></span>}
                {userNotFound && <span className="login-register-msgs"><LangProvider location="user-not-found" /></span>}
                <button onClick={login}><LangProvider location="login"/></button>
                <div className="flip-text"><LangProvider location="no-account"/> <span onClick={() => {setLoginPage(false); setRegistered(false)}} className="highlighted-text"><LangProvider location="reg-here"/></span></div>
            </div>
            <div className="back">
                <div className="input">
                    <span><LangProvider location="username"/></span>
                    <input type="text" name="username" onChange={handleRegisterChange} value={registerCredentials.username} />
                </div>
                <div className="input">
                    <span><LangProvider location="password"/></span>
                    <input type="password" name="password" onChange={handleRegisterChange} value={registerCredentials.password} />
                </div>
                {!validCredential && <span className="login-register-msgs"><LangProvider location="invalid-reg" /></span>}
                {userExists && <span className="login-register-msgs"><LangProvider location="user-exists" /></span>}
                {registered && <span className="login-register-msgs"><LangProvider location="reg-success" /></span>}
                <button onClick={register}><LangProvider location="register"/></button>
                <div className="flip-text"><LangProvider location="have-account"/> <span onClick={() => setLoginPage(true)} className="highlighted-text"><LangProvider location="login-here"/></span></div>
            </div>
        </div>
        </div>
    )
}
