// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
// import {getStorage} from
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "splitify-pdf.firebaseapp.com",
    projectId: "splitify-pdf",
    storageBucket: "splitify-pdf.appspot.com",
    messagingSenderId: "323514700645",
    appId: "1:323514700645:web:02d4e0e237affa7f03c78c",
    measurementId: "G-SLBYMDQ3ZK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
module.export = storage;