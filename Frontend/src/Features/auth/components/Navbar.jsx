import React from 'react'
import { Link } from 'react-router'
import '../navbar.scss'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/">
                        <span className="logo-icon">◆</span>
                        <span className="logo-text">InterviewAI</span>
                    </Link>
                </div>

                <div className="navbar-cta">
                    <Link to="/register" className="button cta-button">Get Started</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
