import { firebase, auth, firestore } from '../../config/firebase';
import { initializeInterceptor } from '../api';

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    if (!email) {
      reject('Email cannot be blank');
    } else if (!password) {
      reject('Password cannot be blank');
    }
    // const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      // .signInWithPopup(provider)
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        /** @type {firebase.auth.OAuthCredential} */
        // var credential = result.credential;
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = credential.idToken;
        // The signed-in user info.
        var user = result.user;

        const uid = user.uid;
        const userCollection = firestore.collection('users');
        var docRef = userCollection.doc(uid);
        docRef
          .get()
          .then(doc => {
            firebase
              .auth()
              .currentUser.getIdToken(/* forceRefresh */ true)
              .then(function (idToken) {
                if (doc.exists) {
                  localStorage.setItem(
                    'user',
                    JSON.stringify({
                      user,
                      token: idToken,
                      role: doc.data().role,
                      displayName: doc.data().name,
                    }),
                  );
                  initializeInterceptor(idToken);
                  resolve({
                    ...user,
                    displayName: doc.data().name,
                    role: doc.data().role,
                  });
                } else {
                  docRef
                    .set({
                      name: user.displayName,
                      email: user.email,
                      role: 'seller',
                    })
                    .then(() => {
                      initializeInterceptor(idToken);
                      localStorage.setItem(
                        'user',
                        JSON.stringify({
                          user,
                          token: idToken,
                          role: 'seller',
                        }),
                      );

                      resolve({ ...user, role: 'seller' });
                    })
                    .catch(err => {
                      console.log('Error getting document:', err);
                      reject(err);
                    });
                }
              })
              .catch(function (error) {
                console.log('Error getting document:', error);
                reject(error);
              });
          })
          .catch(error => {
            console.log('Error getting document:', error);
            reject(error);
          });
      })
      .catch(error => {
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
  localStorage.removeItem('user');
  auth.signOut();
};

export const checkUser = () => {
  const UserData = JSON.parse(localStorage.getItem('user'));

  if (UserData) {
    // let token;
    // firebase.auth().onAuthStateChanged(authUser => {
    //   if (authUser) {
    //     console.log(authUser.getIdToken());
    //     authUser.getIdToken(true).then(idToken => {
    //       console.log(idToken);
    //       //   initializeInterceptor(idToken);
    //       token = idToken;
    //     });
    //   }
    // });
    // initializeInterceptor(token);
    initializeInterceptor(UserData?.token);
    return {
      ...UserData?.user,
      role: UserData?.role,
      displayName: UserData?.displayName,
    };
  }
  return null;
};
