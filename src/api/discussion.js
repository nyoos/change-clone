import Discussion from "../models/Discussion";
import { db, storage } from "./init";
import firebase from "firebase/app";
import "firebase/auth";

const discussiondb = db.collection("discussions");

var discussionConverter = {
  toFirestore: function (discussion) {
    return {
      comment: discussion.comment,
      likes: discussion.likes,
      author: discussion.author,
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new Discussion(data.author, data.comment, data.likes.length);
  },
};

const uploadDiscussion = async (proposalId, discussion) => {
  const docRef = await discussiondb
    .doc(proposalId)
    .collection("comments")
    .withConverter(discussionConverter)
    .add(discussion);
  return docRef;
};

const readDiscussions = async (proposalId, setDiscussions) => {
  const discussionRef = discussiondb
    .doc(proposalId)
    .collection("comments")
    .limit(25);
  const snapshots = await discussionRef
    .withConverter(discussionConverter)
    .onSnapshot((querySnapshot) => {
      const discussions = [];
      querySnapshot.forEach((disc) => discussions.push(disc.data()));
      setDiscussions(discussions);
    });
};

export { uploadDiscussion, readDiscussions };
