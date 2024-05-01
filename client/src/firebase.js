import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyD7k7A0N7oTV3iyebb2Hx2JihvbO3hAYXk",
    authDomain: "blog-app-a9b33.firebaseapp.com",
    projectId: "blog-app-a9b33",
    storageBucket: "blog-app-a9b33.appspot.com",
    messagingSenderId: "351565370626",
    appId: "1:351565370626:web:fd8509821e633ff6e51e1b"
};

export const app = initializeApp(firebaseConfig);