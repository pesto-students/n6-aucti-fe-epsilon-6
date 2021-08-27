import { firebase, auth, firestore } from "../../config/firebase";

export const login = (role) => {
	return new Promise((resolve, reject) => {
		if (!role) {
			reject("No role selected");
		}
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
				const uid = user.uid;
				const userCollection = firestore.collection("users");
				userCollection
					.doc(uid)
					.set({
						name: user.displayName,
						email: user.email,
						role: role,
					})
					.then(() => {
						localStorage.setItem("user", JSON.stringify({ user, token, role }));
						console.log({ user, token, role });
						resolve(result);
					})
					.catch((err) => reject(err));
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
	const UserData = JSON.parse(localStorage.getItem("user"));
	return { ...UserData?.user, role: UserData.role };
};
