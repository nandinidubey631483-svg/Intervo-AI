import React from 'react'
import "../login.scss"
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Login = () =>{
    const { loading,handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit =  async (e) =>{
        e.preventDefault();
        await handleLogin({ email, password })
        navigate("/")
    }
    if(loading){
        return (
            <div className="login-page-wrapper">
                <Navbar />
                <main className="login-main">
                    <h1>loading...</h1>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="login-page-wrapper">
            <Navbar />
            <main className="login-main">  
                <div className="form-container">
                    <div className="form-header">
                        <h1>Welcome Back</h1>
                        <p className="subtitle">Continue your journey to professional excellence.</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                            onChange={(e)=>{setEmail(e.target.value)}}
                             type="email" id="email" name="email" placeholder='Enter your email' required/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                             onChange={(e)=>{setPassword(e.target.value)}}
                             type="password" id="password" name="password" placeholder='Enter your password' required/>
                        </div>
                        <div className="forgot-password">
                            <Link to="#">Forgot Password?</Link>
                        </div>
                        <button className="button primary-button" type="submit">Sign In</button>
                    </form>
                    <p className="register-link">New to the platform? <Link to={"/register"}>Create an account</Link></p>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Login