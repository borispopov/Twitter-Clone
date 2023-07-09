import React, { useState, useEffect} from "react";
// import firebaseApp from "./firebase";
import LoginComp from './LoginComp';
import Twit from "./Twit";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import './App.css';


// import {Route, Link} from "react-router-dom";

const App = () => {

    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [hasAccount, setHasAccount] = useState(false);


    const clearInputs = () => {
        setEmail("");
        setPassword("");
    }

    const clearErrors = () => {
        setEmailError("");
        setPasswordError("");
    }

    const auth = getAuth();

    const handleLogin = () => {
        clearErrors();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            user = userCredential.user;
        })
        .catch((err) => {
            console.log(err.code)
            if (err.code === "auth/user-disabled") {
                setEmailError("user is banned");
            }
            if (err.code === "auth/invalid-email") {
                setEmailError("invalid email");
            }
            if (err.code === "auth/user-not-found") {
                setEmailError("user not found");
            }
            if (err.code === "auth/missing-email"){
                setEmailError("email is required");
            }
            if (err.code === "auth/wrong-password") {
                setPasswordError("wrong password");
            }
        });
    }

    const handleSignup = () => {
        clearErrors();
        createUserWithEmailAndPassword(auth, email, password)
        .catch((err) => {
            console.log(err.code);
            if (err.code === "auth/email-already-in-use") {
                setEmailError("user already exists");
            }
            if (err.code === "auth/invalid-email") {
                setEmailError("invalid email");
            }
            if (err.code === "auth/missing-email"){
                setEmailError("email is required");
            }
            if (err.code === "auth/weak-password") {
                setPasswordError("password must be 6 characters or more");
            }
        });
    }

    const handleLogout = () => {
        signOut(auth);
    }

    const authListener = () => {
        onAuthStateChanged(auth, user => {
            if(user){
                clearInputs();
                setUser(user);

            } else {
                setUser("");
            }
        })
    }

    useEffect(() => {

      authListener();

    }, []);

  return (
    // <div className="app">
    //   {/* <Route exact path="/" component={LoginPage} /> */}
    //   {/* <Route exact path="/" component={Twit} /> */}
    // </div>

    <div className="app">

        {user ? (
            <Twit handleLogout={handleLogout}/>
        ) : (
            <LoginComp
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
                handleSignup={handleSignup}
                hasAccount={hasAccount}
                setHasAccount={setHasAccount}
                emailError={emailError}
                passwordError={passwordError}
                user={user}
            />

        )};
    </div>
  );
};

export default App;