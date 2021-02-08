import firebase from "firebase";
import "firebase/analytics";
import "firebase/storage";
import "firebase/firestore";

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
// 	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
// 	projectId: process.env.REACT_APP_PROJECT_ID,
// 	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
// 	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
// 	appId: process.env.REACT_APP_APP_ID,
// 	measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };

const firebaseConfig = {
    apiKey: "AIzaSyBZUPRHJEiwBxTs4GCszUFr8VFCpmdM4dU",
    authDomain: "weverse-web.firebaseapp.com",
    projectId: "weverse-web",
    storageBucket: "weverse-web.appspot.com",
    messagingSenderId: "539644177452",
    appId: "1:539644177452:web:ea1070f225f6d729da3589",
    measurementId: "G-N603WH6E8Q",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
firebase.analytics
    .isSupported()
    .then((isSupported) => {
        if (isSupported) {
            firebase.analytics();
        }
    })
    .catch((e) => {
        return e;
    });

export const google = new firebase.auth.GoogleAuthProvider();
export const twitter = new firebase.auth.TwitterAuthProvider();
export const facebook = new firebase.auth.FacebookAuthProvider();

export default app;
