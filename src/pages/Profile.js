import React, { useState } from 'react'
import { FaEye } from "react-icons/fa"
import { FaEyeSlash } from "react-icons/fa"
import { LangProvider } from '../LangProvider'

export const Profile = ({ userData, setUserData }) => {
  const { username, password } = userData
  const [state, setState] = useState({ username, password })
  const [disabled, setDisabled] = useState(true)
  const [type, setType] = useState("password")
  const regEx = /^([A-Za-z0-9]{4,9})$/

  function handleChange(e) {
    const credential = e.target.name
    const value = e.target.value
    setState({...state, [credential]: value})
    console.log(state.username)
    if (((credential === "username" && value !== username) || (credential === "password" && value !== password)) && (regEx.test(value) && regEx.test(credential === "username" ? state.password : state.username))) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }

  function saveChanges() {
    setUserData({...userData, username: state.username, password: state.password})
    setDisabled(true)
  }

  return (
    <div className="profile-container-outer">
    <div className="profile-container">
      <input type="text" value={state.username} name="username" maxLength="9" onChange={handleChange} />
      <div className="inp-container">
      {type === "password" ? <FaEye onClick={() => setType("text")} /> : <FaEyeSlash onClick={() => setType("password")} />}
      <input type={type} value={state.password} name="password" maxLength="9" onChange={handleChange} />
      </div>
      <button disabled={disabled} onClick={saveChanges}><LangProvider location="save" /></button>
    </div>
    </div>
  )
}
