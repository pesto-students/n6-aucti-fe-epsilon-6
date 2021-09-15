import { firebase, auth, firestore } from "../../config/firebase";
import { initializeInterceptor } from "../api";

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
				// var credential = result.credential;
				// This gives you a Google Access Token. You can use it to access the Google API.
				// var token = credential.idToken;
				// The signed-in user info.
				var user = result.user;

				const uid = user.uid;
				const userCollection = firestore.collection("users");
				var docRef = userCollection.doc(uid);
				docRef
					.get()
					.then((doc) => {
						firebase
							.auth()
							.currentUser.getIdToken(/* forceRefresh */ true)
							.then(function (idToken) {
								if (doc.exists) {
									localStorage.setItem(
										"user",
										JSON.stringify({
											user,
											token: idToken,
											role: doc.data().role,
										})
									);
									initializeInterceptor(idToken);
									resolve({ ...user, role: doc.data().role });
								} else {
									docRef
										.set({
											name: user.displayName,
											email: user.email,
											role: role,
										})
										.then(() => {
											initializeInterceptor(idToken);
											localStorage.setItem(
												"user",
												JSON.stringify({ user, token: idToken, role })
											);

											resolve({ ...user, role });
										})
										.catch((err) => {
											console.log("Error getting document:", err);
											reject(err);
										});
								}
							})
							.catch(function (error) {
								console.log("Error getting document:", error);
								reject(error);
							});
					})
					.catch((error) => {
						console.log("Error getting document:", error);
						reject(error);
					});
			})
			.catch((error) => {
				// Handle Errors here.

				var errorMessage = error.message;
				// The email of the user's account used.

				// The firebase.auth.AuthCredential type that was used.

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
		// firebase.auth().onAuthStateChanged((user) => {
		// 	if (user !== null && user.emailVerified === true) {
		// 		user.getIdToken(true).then((idToken) => {
		// 			initializeInterceptor(idToken);
		// 		});
		// 	}
		// });

		initializeInterceptor(UserData?.token);
		return { ...UserData?.user, role: UserData?.role };
	}
	return null;
};
