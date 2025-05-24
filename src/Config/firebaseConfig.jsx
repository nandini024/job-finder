




import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyDeY9glKiWjn94g4J6M3bg6f_Xu_35jbQ8",
  authDomain: "job-founter-react-app.firebaseapp.com",
  projectId: "job-founter-react-app",
  storageBucket: "job-founter-react-app.firebasestorage.app",
  messagingSenderId: "338281395459",
  appId: "1:338281395459:web:f016ad03307e802ae4a536",
  measurementId: "G-12P8NG0RCT"
};


const app = initializeApp(firebaseConfig);
 export const authentication=getAuth(app)
 export const db=getFirestore(app)




