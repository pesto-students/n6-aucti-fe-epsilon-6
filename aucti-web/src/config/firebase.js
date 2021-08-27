import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp({
	apiKey: "AIzaSyCznJ0uo3gJBZmHZSzUYeSqrWuZDh_VDU8",
	authDomain: "aucti-web.firebaseapp.com",
	projectId: "aucti-web",
	storageBucket: "aucti-web.appspot.com",
	messagingSenderId: "1022704681512",
	appId: "1:1022704681512:web:76f47e165f7490d58cab1d",
	measurementId: "G-XMV74E570W",
});

const auth = firebase.auth();

const firestore = firebase.firestore();

export { firebase, auth, firestore };
