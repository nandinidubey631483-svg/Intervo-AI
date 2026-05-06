import React from 'react'
import { useNavigate, Link } from 'react-router'
import { useState } from 'react'
import { useAuth } from "../hooks/useAuth"

import "../register.scss"



const Register = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {
        loading,
        handleRegister
    } = useAuth()



    const handleSubmit = async (e) => {

        e.preventDefault()

        await handleRegister({
            username,
            email,
            password
        })

        navigate("/")
    }



    if(loading){

        return (

            <main className="register-loading">

                <h1>
                    Loading...
                </h1>

            </main>
        )
    }



    return (

        <div className="register-page">


            {/* NAVBAR */}
            <header className="register-navbar">

                <div className="register-logo">

                    <div className="logo-dot"></div>

                    <h2>
                        InterviewAI
                    </h2>

                </div>


                <button className="register-nav-btn">

                    Get Started

                </button>

            </header>



            {/* CENTER */}
            <main className="register-container">


                {/* CARD */}
                <div className="register-card">


                    <h1>
                        Create Account
                    </h1>

                    <p>
                        Start your AI-powered interview journey.
                    </p>



                    {/* FORM */}
                    <form
                        className="register-form"
                        onSubmit={handleSubmit}
                    >


                        {/* USERNAME */}
                        <div className="input-group">

                            <label htmlFor="username">
                                USERNAME
                            </label>

                            <input
                                onChange={(e)=>{
                                    setUsername(e.target.value)
                                }}
                                type="text"
                                id="username"
                                name="username"
                                placeholder='Enter your username'
                                required
                            />

                        </div>



                        {/* EMAIL */}
                        <div className="input-group">

                            <label htmlFor="email">
                                EMAIL
                            </label>

                            <input
                                onChange={(e)=>{
                                    setEmail(e.target.value)
                                }}
                                type="email"
                                id="email"
                                name="email"
                                placeholder='Enter your email'
                                required
                            />

                        </div>



                        {/* PASSWORD */}
                        <div className="input-group">

                            <label htmlFor="password">
                                PASSWORD
                            </label>

                            <input
                                onChange={(e)=>{
                                    setPassword(e.target.value)
                                }}
                                type="password"
                                id="password"
                                name="password"
                                placeholder='Enter your password'
                                required
                            />

                        </div>



                        {/* BUTTON */}
                        <button
                            className="register-btn"
                            type="submit"
                        >
                            Register
                        </button>

                    </form>



                    {/* FOOTER */}
                    <p className="register-footer">

                        Already have an account?

                        <Link to={"/login"}>
                            Login
                        </Link>

                    </p>

                </div>

            </main>

        </div>
    )
}

export default Register