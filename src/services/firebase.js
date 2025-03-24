// Este archivo sirve para inicializar Firebase y los accesos a sus servicios.
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgZKPAJBYf8Bwr0da9AqLBuKrEntbaya4",
  authDomain: "clientes-web-83330.firebaseapp.com",
  projectId: "clientes-web-83330",
  storageBucket: "clientes-web-83330.appspot.com",
  messagingSenderId: "828084829452",
  appId: "1:828084829452:web:67ef1396b4bf46d3bb1d29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const storage = getStorage(app);
