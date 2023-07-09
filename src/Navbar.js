import React from 'react'
import { DarkMode } from './DarkMode'
import { FaTrophy } from "react-icons/fa"
import { Languages } from './Languages'

export const Navbar = () => {
  
  
  return (
    <div className="navbar">
      <FaTrophy />
      <Languages />
      <DarkMode />
    </div>
  )
}
