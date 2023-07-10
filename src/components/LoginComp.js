import React, {useState, useEffect} from 'react'
// import {Button} from "@material-ui/core"
import db from "./firebase"
import {collection, addDoc, setDoc, doc} from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"

const LoginComp = (props) => {

    const { email, setEmail, password, setPassword, handleLogin, handleSignup, hasAccount, setHasAccount, emailError, passwordError, user } = props;

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [nameError, setNameError] = useState("");

    const handleError = () => {
        setUsernameError("");
        setNameError("");
      if (username.length < 3) setUsernameError("username must be at least 3 characters");
      if (name.length < 1) setNameError("name is required");
        console.log(emailError);
        console.log(passwordError);
    }

    const auth = getAuth();

    const curUser = auth.currentUser;

    // const userCollectionRef = collection(db, "profile");

    const createUser = async () => {
        await setDoc(doc(db, "profile", email), {
            email: email,
            displayName: name,
            username: username
        });
        console.log("user created");
    }

  return (
    <section className="login">

        <div className="loginContainer">
            <h2>Welcome</h2>

            <div className="btnContainer">
                {hasAccount ? (
                    <>
                    <label>Email</label>
                    <input type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <p className="errorMsg">{emailError}</p>
                    <label>Password</label>
                    <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                    <p className="errorMsg">{passwordError}</p>
                    <button className="sign__in" onClick={handleLogin}>Sign In</button>
                    <p>Don't Have an Account? <span onClick={() => setHasAccount(!hasAccount)}>Sign Up</span></p>
                    </>

                ) : (
                    <>
                    <label >Name</label>
                    <input type="text" autoFocus required value={name} onChange={(e) => setName(e.target.value)} />
                    <p className="errorMsg">{nameError}</p>
                    <label>Email</label>
                    <input type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <p className="errorMsg">{emailError}</p>
                    <label >Username</label>
                    <input type="text" autoFocus required value={username} onChange={(e) => setUsername(e.target.value)} />
                    <p className="errorMsg">{usernameError}</p>
                    <label>Password</label>
                    <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                    <p className="errorMsg">{passwordError}</p>
                    <button className="sign__up" onClick={() => {handleError(); handleSignup(); if (username.length > 2 && name.length > 0 ) createUser()}}>Sign Up</button>
                    <p>Have an Account? <span onClick={() => setHasAccount(!hasAccount)}>Sign In</span></p>
                    </>

                )}
            </div>
        </div>
    </section>
  )
};

export default LoginComp;