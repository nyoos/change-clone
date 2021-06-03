import firebase from "firebase/app";
import "firebase/auth";
import Proposal from "../models/Proposal";
import db from "./init";

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
