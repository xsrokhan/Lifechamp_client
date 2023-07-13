import React, { createContext, useState } from "react"

export const Context = createContext()

export const ContextProvider = ({ children }) => {
    const [lang, setLang] = useState(localStorage.getItem("LF_lang") ? localStorage.getItem("LF_lang") : "LF_en")
    const [theme, setTheme] = useState(localStorage.getItem("LF_theme") === "dark" ? "dark" : "light")
    const [userData, setUserData] = useState(localStorage.getItem("LF_userData") ? JSON.parse(localStorage.getItem("LF_userData")) : null)
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("LF_loggedIn") === "true" ? true : false) 

    const changeLang = (selectedLang) => {
        setLang(`LF_${selectedLang}`)
        localStorage.setItem("LF_lang", `LF_${selectedLang}`)
    }

    return (
        <Context.Provider value={{lang, changeLang, theme, setTheme, userData, setUserData, loggedIn, setLoggedIn}}>{children}</Context.Provider>
    )
}