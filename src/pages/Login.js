import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import './Login.css'
import axios from 'axios';
import { Button } from "@mui/material";

const Login = ({ setLoggedIn }) => {

    const [ name, setName ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ hasAccount, setHasAccount ] = useState(true);
    const [ error, setError ] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError("");
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            sessionStorage.setItem('uid', response.data.user.uid)
            sessionStorage.setItem('name', response.data.user.name)
            sessionStorage.setItem('username', response.data.user.username)
            sessionStorage.setItem('email', response.data.user.email)
            sessionStorage.setItem('avatar', response.data.url)
            localStorage.setItem('token', response.data.token)

            setTimeout(() => {
                localStorage.removeItem('token')
                navigate('/login')
                setLoggedIn(false);
            }, 36000000);

            navigate('/')

            setLoggedIn(true);
        } catch (err) {
            console.log(err)
            setError(err.response.data.error);
            setLoggedIn(false);
        }
    }

    const handleSignup = async () => {
        console.log('signing up')
        setError("");
        try {
            const response = await axios.post('http://localhost:5000/signup', { name, password, email, username });
            sessionStorage.setItem('uid', response.data.user.uid)
            sessionStorage.setItem('name', response.data.user.name)
            sessionStorage.setItem('username', response.data.user.username)
            sessionStorage.setItem('email', response.data.user.email)
            sessionStorage.setItem('avatar', response.data.user.avatar)
            localStorage.setItem('token', response.data.token)

            setTimeout(() => {
                localStorage.removeItem('token')
                navigate('/login')
                setLoggedIn(false);
            }, 36000000);

            navigate('/')

            setLoggedIn(true);
        } catch (err) {
            setError(err.response.data.error);
            console.log(err)
            setLoggedIn(false);
        }
    }

    const handleSignupError = async () => {
        setError("")
        if (name.length < 1) {setError("Please Enter Valid Name"); return;}
        else if (!email.includes('@') || !email.includes('.')) {setError("Please Enter a Valid Email"); return;}
        else if (username.length < 3) {setError("Username Must be at Least 3 Characters"); return;}
        else if (password.length < 6) {setError("Password Must be Atleast 6 Characters"); return;}
        handleSignup();
    }

    const handleLoginError = () => {
        setError("")
        if (!email.includes('@') && !email.includes('.')) {setError("Please Enter a Valid Email"); return;}
        else if (password.length < 6) {setError("Password Must be Atleast 6 Characters"); return;}
        handleLogin();
    }

    useEffect(() => {
        if (localStorage.getItem('token')) window.location.href = '/'
    }, [])

    return (
        <section className="login">

            <div className="loginContainer">
                <div className="btnContainer">
                    {hasAccount ? (
                        <>
                        <h2>Welcome Back</h2>
                        <label>Email</label>
                        <input type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label>Password</label>
                        <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                        <p className="errorMsg">{error}</p>
                        <Button className="sign__in" onClick={handleLoginError}>Sign In</Button>
                        <p>Don't Have an Account? <span onClick={() => {setHasAccount(false); setError("");}}>Sign Up</span></p>
                        </>
                    ) : (
                        <>
                        <h2>Welcome</h2>
                        <label >Name</label>
                        <input type="text" autoFocus required value={name} onChange={(e) => setName(e.target.value)} />
                        <label>Email</label>
                        <input type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label >Username</label>
                        <input type="text" autoFocus required value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label>Password</label>
                        <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                        <p className="errorMsg">{error}</p>
                        <Button className="sign__up" onClick={handleSignupError}>Sign Up</Button>
                        <p>Have an Account? <span onClick={() => {setHasAccount(true); setError("");}}>Sign In</span></p>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
};

export default Login;