import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const config = {
  apiKey: "AIzaSyB24OI4aSQwHajSL6_D_h_FbenpbDq4zvo",
  authDomain: "layanan-paspor-online.firebaseapp.com",
  projectId: "layanan-paspor-online",
  storageBucket: "layanan-paspor-online.appspot.com",
  messagingSenderId: "492452492939",
  appId: "1:492452492939:web:bcc76e9e4d061896fb468e",
  measurementId: "G-L6RJ9JS02J",
};

const app = initializeApp(config);

const auth = getAuth();
const db = getFirestore(app);

export { auth, db };
