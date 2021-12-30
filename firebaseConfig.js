// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth } from 'firebase/auth';  //getting authentication sector
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqFNPx3vif7x3lANqTymadtntaOM6YdvE",
  authDomain: "chatapp-f0953.firebaseapp.com",
  projectId: "chatapp-f0953",
  storageBucket: "chatapp-f0953.appspot.com",
  messagingSenderId: "394646949927",
  appId: "1:394646949927:web:97590c595d40ccbd8dfe02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);  // saying this "app" will have authentication.
