import React from 'react'
import Navbar from "../components/navbar.jsx"
import { Link } from "react-router-dom";


function HomePage() {
  return (
    <div>
        <Navbar />
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>


    </div>
  )
}

export default HomePage