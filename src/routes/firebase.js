import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAL4KK5I-3IYDjpS9u5z27H9Wqp58SP6wg",
    authDomain: "scavenger-39dcb.firebaseapp.com",
    projectId: "scavenger-39dcb",
    storageBucket: "scavenger-39dcb.appspot.com",
    messagingSenderId: "379292432874",
    appId: "1:379292432874:web:f3f7da03328639a5f61a93",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
