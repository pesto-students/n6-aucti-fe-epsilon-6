import { firebase, auth } from "../../config/firebase";

export const login = () => {
	return new Promise((resolve, reject) => {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase
			.auth()
			.signInWithPopup(provider)
			.then((result) => {
				/** @type {firebase.auth.OAuthCredential} */
				var credential = result.credential;
				// This gives you a Google Access Token. You can use it to access the Google API.
				var token = credential.accessToken;
				// The signed-in user info.
				var user = result.user;
				const userData = {
					user,
					token,
				};
				localStorage.setItem("user", JSON.stringify(userData));

				resolve(result);
			})
			.catch((error) => {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
				// ...
				console.log(errorMessage);

				reject(errorMessage);
			});
	});
};

export const logout = () => {
	localStorage.removeItem("user");
	auth.signOut();
};

export const checkUser = () => {
	return JSON.parse(localStorage.getItem("user"));
};
