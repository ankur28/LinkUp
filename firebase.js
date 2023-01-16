
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBlKz1HBY1dCjFOCUcaxlUQsaVJupoiJtA",
  authDomain: "linkup-7c45e.firebaseapp.com",
  projectId: "linkup-7c45e",
  storageBucket: "linkup-7c45e.appspot.com",
  messagingSenderId: "809602489268",
  appId: "1:809602489268:web:b8aca400dd4f9e56c130e1",
  measurementId: "G-ERBEHLZBW9"
};


const app = initializeApp(firebaseConfig);  
   const auth = getAuth(app)
   const db = getFirestore(app);

   export { auth ,db}