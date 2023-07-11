import React, {useState, useEffect} from 'react'
import axios from 'axios';
import App from './App';
import { Button } from "@mui/material";


const LoginComp = () => {

    const [ name, setName ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");
    const [ hasAccount, setHasAccount ] = useState(false);
    const [ login, setLogin ] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            const token = response.data.token;

            // Store the token in local storage or cookies for subsequent requests
            localStorage.setItem('token', token);
            setLogin(true);
        } catch (err) {
            console.log(err)
            setError('Invalid username or password');
            setLogin(false);
        }
    }

    const handleSignup = async () => {
        setError("")
        try {
            const response = await axios.post('http://localhost:5000/signup', { name, password, email, username });
            const token = response.data.token;
            localStorage.setItem('token', token);
            setLogin(true);
        } catch (err) {
            setError(err.message);
            setLogin(false);
        }
    }

    const handleError = () => {
        setError("");
        if (username.length < 3) setError("username must be at least 3 characters");
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        setLogin(false);
        console.log(login)
    }

    return (
        <section className="login">

            <div className="loginContainer">
                {login ? (
                    <App
                        handleLogout={handleLogout}/>
                ) : (
                    <>
                        <h2>Welcome</h2>
                        <div className="btnContainer">
                            {hasAccount ? (
                                <>
                                <label>Email</label>
                                <input type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />
                                <p className="errorMsg">{error}</p>
                                <label>Password</label>
                                <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                                <p className="errorMsg">{error}</p>
                                <Button className="sign__in" onClick={handleLogin}>Sign In</Button>
                                <p>Don't Have an Account? <span onClick={() => setHasAccount(false)}>Sign Up</span></p>
                                </>
                            ) : (
                                <>
                                <label >Name</label>
                                <input type="text" autoFocus required value={name} onChange={(e) => setName(e.target.value)} />
                                <p className="errorMsg">{error}</p>
                                <label>Email</label>
                                <input type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />
                                <p className="errorMsg">{error}</p>
                                <label >Username</label>
                                <input type="text" autoFocus required value={username} onChange={(e) => setUsername(e.target.value)} />
                                <p className="errorMsg">{error}</p>
                                <label>Password</label>
                                <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                                <p className="errorMsg">{error}</p>
                                <Button className="sign__up" onClick={() => {handleError(); if (username.length > 2 && name.length > 0 ) handleSignup()}}>Sign Up</Button>
                                <p>Have an Account? <span onClick={() => setHasAccount(true)}>Sign In</span></p>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    )
};

export default LoginComp;