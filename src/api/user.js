import firebase from "firebase/app";
import "firebase/auth";
import User from "../models/User";
import { db, storage } from "./init";

const userImages = storage.ref().child("userImages");

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
  const userImageRef = userImages.child(userId);
  userImageRef.put(image).then((snapshot) => {
    snapshot.ref.getDownloadURL().then(function (url) {
      db.collection("users")
        .doc(userId)
        .withConverter(userConverter)
        .set(new User(name, description, url, [], []));
    });
  });
};

const signUp = (email, password, name, description, image) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      initializeUser(user.uid, name, description, image);
      return user;
    })
    .catch((error) => {
      throw error;
    });
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
  console.log(email, password);
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user.uid;
    })
    .catch((error) => {
      throw error;
    });
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

export { signIn, initializeUser, signUp, readUser, getUserImage };
