import firebase from "firebase/app";
import "firebase/auth";
import User from "../models/User";
import { db, storage } from "./init";

const userImages = storage.ref().child("userImages");
const PLACEHOLDER_USER_ICON_URL =
  "https://firebasestorage.googleapis.com/v0/b/change-clone.appspot.com/o/userImages%2Fj5w9zTnBhHWRviOMTrUPBNlytBh2";
const userConverter = {
  toFirestore: function (user) {
    return {
      name: user.name,
      description: user.description,
      image: user.image,
      proposals: user.proposals,
      comments: user.comments,
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new User(
      data.name,
      data.description,
      data.image,
      data.proposals,
      data.comments
    );
  },
};

const initializeUser = (userId, name, description, image) => {
  if (image) {
    const userImageRef = userImages.child(userId);
    return userImageRef.put(image).then((snapshot) => {
      snapshot.ref.getDownloadURL().then(function (url) {
        db.collection("users")
          .doc(userId)
          .withConverter(userConverter)
          .set(new User(name, description, url, [], []));
      });
    });
  } else {
    return db
      .collection("users")
      .doc(userId)
      .withConverter(userConverter)
      .set(new User(name, description, PLACEHOLDER_USER_ICON_URL, [], []));
  }
};

const signUp = async (email, password, name, description, image) => {
  if (email && password && name && description) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        // Signed in
        let user = userCredential.user;
        await initializeUser(user.uid, name, description, image);
        return user.uid;
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case "auth/email-already-in-use":
            error.message = "Email is already in use.";
            break;
          case "auth/invalid-email":
            error.message = "Invalid email address.";
            break;
          case "weak-password":
            error.message = "Please use a stronger password.";
            break;
          default:
        }
        throw error;
      });
  } else {
    throw new Error("Please check if all fields are filled in.");
  }
};

const readUser = (userId) => {
  return db
    .collection("users")
    .doc(userId)
    .withConverter(userConverter)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const user = doc.data();
        return user;
      } else {
        throw Error("User does not exist");
      }
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
      const user = userCredential.user;
      return user.uid;
    })
    .catch((error) => {
      const errorCode = error.code;
      switch (errorCode) {
        case "auth/wrong-password":
          error.message = "That password does not match the email provided.";
          break;
        case "auth/user-disabled":
          error.message = "Please contact support regarding your account.";
          break;
        case "auth/user-not-found":
          error.message = "That email does not exist.";
          break;
        case "auth/invalid-email":
          error.message = "Invalid email address.";
          break;
        default:
      }
      throw error;
    });
};

const signOut = () => {
  return firebase.auth().signOut();
};

const getUserImage = (userId) => {
  return db
    .collection("users")
    .doc(userId)
    .withConverter(userConverter)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const imageURL = doc.data().image;
        return storage.refFromURL(imageURL);
      } else {
        throw Error("User does not exist");
      }
    })
    .then((imageRef) => {
      return imageRef.getDownloadURL();
    });
};

const checkSignedInUser = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(user.uid);
      } else {
        resolve(false);
      }
    });
  });
};
export {
  signIn,
  initializeUser,
  signUp,
  readUser,
  getUserImage,
  signOut,
  checkSignedInUser,
};
