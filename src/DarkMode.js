import React, { useContext } from 'react'
import { ReactComponent as Sun } from './Sun.svg'
import { ReactComponent as Moon } from './Moon.svg'
import './styles/DarkMode.css'
import { Context } from './Context'

export const DarkMode = () => {
    const { setTheme } = useContext(Context)

    const setDarkMode = () => {
        document.querySelector("body").setAttribute("data-theme", "dark")
        localStorage.setItem("LF_theme", "dark")
    }

    const setLightMode = () => {
        document.querySelector("body").setAttribute("data-theme", "light")
        localStorage.setItem("LF_theme", "light")
    }

    const toggleTheme = e => {
        if (e.target.checked) {
            setDarkMode()
            setTheme("dark")
        } else {
            setLightMode()
            setTheme("light")
        }       
    }

    const selectedTheme = localStorage.getItem("LF_theme")

    if (selectedTheme === "dark") {
        setDarkMode()
    }

    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
                checked={selectedTheme === "dark"}
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
        </div>
    );
};
