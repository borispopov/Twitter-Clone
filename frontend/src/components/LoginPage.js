// import React, {useState, useEffect} from 'react';
// import firebaseApp from "./firebase";
// import LoginComp from './LoginComp';
// // import ProfileBar from "./ProfileBar";
// import "./LoginPage.css";
// import Twit from './Twit';

// const LoginPage = () => {
//     const [user, setUser] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [emailError, setEmailError] = useState("");
//     const [passwordError, setPasswordError] = useState("");
//     const [hasAccount, setHasAccount] = useState(false);

//     const clearInputs = () => {
//         setEmail("");
//         setPassword("");
//     }

//     const clearErrors = () => {
//         setEmailError("");
//         setPasswordError("");
//     }

//     const handleLogin = () => {
//         clearErrors();
//         firebaseApp
//         .auth()
//         .signInWithEmailAndPassword(email, password)
//         .catch((err) => {
//             switch(err.code){
//                 case "auth/invalid-email":
//                 case "auth/user-disabled":
//                 case "auth/user-not-found":
//                     setEmailError(err.message);
//                 break;
//                 case "auth/wrong-password":
//                     setPasswordError(err.message);
//                 break;
//             }
//         });
//     }

//     const handleSignup = () => {
//         clearErrors();
//         firebaseApp
//         .auth()
//         .createUserWithEmailAndPassword(email, password)
//         .catch((err) => {
//             switch(err.code){
//                 case "auth/email-already-in-use":
//                 case "auth/invalid-email":
//                     setEmailError(err.message);
//                 break;
//                 case "auth/weak-password":
//                     setPasswordError(err.message);
//                 break;
//             }
//         });
//     }

//     const handleLogout = () => {
//         firebaseApp.auth().signOut();
//     }

//     const authListener = () => {
//         firebaseApp.auth().onAuthStateChanged(user => {
//             if(user){
//                 clearInputs();
//                 setUser(user);
//             } else {
//                 setUser("");
//             }
//         })
//     }

//     useEffect(() => {
//         authListener();
//     }, []);

//   return (
//     <div className="LoginPage">
//         {user ? (
//             <Twit handleLogout={handleLogout}/>
//         ) : (
//             <LoginComp 
//             email={email} 
//             setEmail={setEmail} 
//             password={password} 
//             setPassword={setPassword} 
//             handleLogin={handleLogin} 
//             handleSignup={handleSignup}
//             hasAccount={hasAccount}
//             setHasAccount={setHasAccount}
//             emailError={emailError}
//             passwordError={passwordError}
//             />
//         )}
        
//     </div>
//   );
// };

// export default LoginPage;