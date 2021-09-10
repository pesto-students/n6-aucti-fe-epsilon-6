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

				const uid = user.uid;
				const userCollection = firestore.collection("users");
				var docRef = userCollection.doc(uid);
				docRef
					.get()
					.then((doc) => {
						console.log(doc.data().role);
						if (doc.exists) {
							localStorage.setItem(
								"user",
								JSON.stringify({ user, token, role: doc.data().role })
							);

							resolve({ ...user, role: doc.data().role });
						} else {
							docRef
								.set({
									name: user.displayName,
									email: user.email,
									role: role,
								})
								.then(() => {
									localStorage.setItem(
										"user",
										JSON.stringify({ user, token, role })
									);

									resolve({ ...user, role });
								})
								.catch((err) => reject(err));
						}
					})
					.catch((error) => {
						console.log("Error getting document:", error);
						reject(error);
					});
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
	if (UserData) {
		return { ...UserData?.user, role: UserData?.role };
	}
	return null;
};
