import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA1lSiByusA-PXPTrWfi4S7zaf24Dybh3k",
  authDomain: "grapher-api-unique.firebaseapp.com",
  projectId: "grapher-api-unique",
  storageBucket: "grapher-api-unique.appspot.com",
  messagingSenderId: "332710245008",
  appId: "1:332710245008:web:8b46ced9edf899362c5e15",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
