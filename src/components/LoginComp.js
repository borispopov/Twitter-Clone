import React, {useState, useEffect} from 'react'
import axios from 'axios';
import App from './App';
import { Button } from "@mui/material";


const LoginComp = ({ setLoggedIn, loggedIn}) => {

    const [ name, setName ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ hasAccount, setHasAccount ] = useState(true);
    const [ error, setError ] = useState("");

    const handleLogin = async (e) => {
        setError("")

        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            const token = response.data.token;

            // Store the token in local storage or cookies for subsequent requests
            localStorage.setItem('token', token);
            setLoggedIn(true);
        } catch (err) {
            console.log(err)
            setError('Invalid email or password');
            setLoggedIn(false);
        }
    }

    const handleSignup = async () => {
        console.log('signing up')
        setError("");
        try {
            const response = await axios.post('http://localhost:5000/signup', { name, password, email, username });
            const token = response.data.token;
            localStorage.setItem('token', token);
            console.log('token set');
            setLoggedIn(true);
        } catch (err) {
            setError(err.message);
            setLoggedIn(false);
        }
    }

    const handleSignupError = () => {
        setError("")
        if (name.length < 1) {setError("please enter valid name"); return;}
        else if (!email.includes('@') && !email.includes('.')) {setError("please enter valid email"); return;}
        else if (username.length < 3) {setError("username must be at least 3 characters"); return;}
        else if (password.length < 6) {setError("password must be atleast 6 characters"); return;}
        handleSignup();
    }

    const handleLoginError = () => {
        setError("")
        if (!email.includes('@') && !email.includes('.')) {setError("please enter valid email"); return;}
        else if (password.length < 6) {setError("password must be atleast 6 characters"); return;}
        handleLogin();
    }

    return (
        <section className="login">

            <div className="loginContainer">
                <div className="btnContainer">
                    {hasAccount ? (
                        <>
                        <h2>Welcome Back Brother</h2>
                        <label>Email</label>
                        <input type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label>Password</label>
                        <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                        <p className="errorMsg">{error}</p>
                        <Button className="sign__in" onClick={handleLoginError}>Sign In</Button>
                        <p>Don't Have an Account? <span onClick={() => setHasAccount(false)}>Sign Up</span></p>
                        </>
                    ) : (
                        <>
                        <h2>Welcome Ser</h2>
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
                        <p>Have an Account? <span onClick={() => setHasAccount(true)}>Sign In</span></p>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
};

export default LoginComp;