// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOGVWVieTnkDyQKpf3T_qWlqeqyvub6zE",
  authDomain: "letschat-91e5b.firebaseapp.com",
  projectId: "letschat-91e5b",
  storageBucket: "letschat-91e5b.firebasestorage.app",
  messagingSenderId: "206639189113",
  appId: "1:206639189113:web:6852341803589c3db4d8a8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
