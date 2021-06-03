import firebase from "firebase/app";
import "firebase/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import User from "../models/User";
import db from "./init";

const provider = new GoogleAuthProvider();

const signIn = () => {
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

var userConverter = {
  toFirestore: function (user) {
    return {
      name: user.name,
      description: user.description,
      proposals: user.proposals,
      comments: user.comments,
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new User(data.name, data.description, data.proposals, data.comments);
  },
};

const initializeUser = (userId, name, description) => {
  db.collection("users")
    .doc(userId)
    .withConverter(userConverter)
    .set(new User(name, description, [], []));
};

const signUp = (email, password, name, description) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      initializeUser(user.uid, name, description);
      return user;
    })
    .catch((error) => {
      throw error;
    });
};

const signIn = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      throw error;
    });
};

export { signIn, initializeUser };
