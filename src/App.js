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
    var fbProvider = new firebase.auth.FacebookAuthProvider();
    var ghProvider = new firebase.auth.GithubAuthProvider();

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

    const handleFacebookSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                var credential = result.credential;
                var user = result.user;
                var accessToken = credential.accessToken;
                console.log('fb user', user);
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

    const handleGithubSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(ghProvider)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                var user = result.user;
                console.log('gh user', user)
                setUser(user);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log('error', errorCode, errorMessage, email, credential);
            });
    }

    return (
        <div className="App">
            <button onClick={handleGoogleSignIn}>sign in using google</button>
            <br />
            <button onClick={handleFacebookSignIn}>sign in using facebook</button>
            <br />
            <button onClick={handleGithubSignIn}>sign in using github</button>
            <h2>{user.displayName}</h2>
            <h3>{user.email}</h3>
            <img src={user.photoURL} alt="" />
        </div>
    );
}

export default App;
