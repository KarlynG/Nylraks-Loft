import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp( {
    apiKey: "AIzaSyDLpzQEsQuVeMMWXfYIWZXaFEZOCN5k0PE",
    authDomain: "nylrakloft.firebaseapp.com",
    projectId: "nylrakloft",
    storageBucket: "nylrakloft.appspot.com",
    messagingSenderId: "107274209379",
    appId: "1:107274209379:web:dd8fca8fbf0be4764c5056"
}).auth();