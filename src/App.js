import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

function App() {

    const [user, setUser] = useState({})

    var provider = new firebase.auth.GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                var user = result.user;
                console.log(token, user);
                setUser(user);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorCode, errorMessage, email, credential);
            });
    }

    return (
        <div className="App">
            <button onClick={handleGoogleSignIn}>sign in using google</button>
            <h2>{user.displayName}</h2>
            <h3>{user.email}</h3>
            <img src={user.photoURL} alt="" />
        </div>
    );
}

export default App;
