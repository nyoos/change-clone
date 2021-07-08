import firebase from "firebase/app";
import "firebase/auth";
import Proposal from "../models/Proposal";
import { db, storage } from "./init";
import { uploadDiscussion } from "./discussion";

const proposaldb = db.collection("proposals");
const proposalImages = storage.ref().child("proposalImages");

var proposalConverter = {
  toFirestore: function (proposal) {
    return {
      title: proposal.title,
      description: proposal.description,
      image: proposal.image,
      target: proposal.target,
      author: proposal.author,
      supporters: proposal.supporters,
      amendments: proposal.amendments,
      discussions: proposal.discussions,
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new Proposal(
      data.title,
      data.description,
      data.image,
      data.target,
      data.author,
      data.supporters,
      data.amendments,
      data.discussions
    );
  },
};

const uploadProposal = async (proposal, image) => {
  const docRef = await proposaldb
    .withConverter(proposalConverter)
    .add(proposal);
  const proposalImageRef = proposalImages.child(docRef.id);
  const snapshot = await proposalImageRef.put(image);
  const url = await snapshot.ref.getDownloadURL();
  await docRef.update({ image: url });
  return docRef.id;
};

const readProposal = async (proposalId) => {
  const proposal = await proposaldb
    .doc(proposalId)
    .withConverter(proposalConverter)
    .get();
  if (proposal.exists) {
    return proposal.data();
  } else {
    throw Error("Proposal does not exist");
  }
};

const readProposalUpdates = async (proposalId, setProposalInfo) => {
  const proposalRef = proposaldb.doc(proposalId);
  const snapshots = proposalRef
    .withConverter(proposalConverter)
    .onSnapshot((doc) => {
      if (doc.exists) {
        setProposalInfo(doc.data());
      } else {
        throw Error("Proposal does not exist");
      }
    });
};

const getProposalImage = async (proposalId) => {
  const doc = await proposaldb
    .doc(proposalId)
    .withConverter(proposalConverter)
    .get();
  if (doc.exists) {
    const imageRef = storage.refFromURL(doc.data().image);
    return imageRef.getDownloadURL();
  }
};

const upvoteProposal = async (proposalId) => {
  const user = firebase.auth().currentUser;
  if (user != null) {
    const proposalRef = proposaldb.doc(proposalId);
    await proposalRef.update({
      supporters: firebase.firestore.FieldValue.arrayUnion(user.uid),
    });
    return;
  } else {
    throw new Error("User not signed in");
  }
};

const getProposals = async (lastProposal) => {
  if (lastProposal) {
  } else {
    const proposalSnapshot = await proposaldb
      .limit(5)
      .withConverter(proposalConverter)
      .get();
    const proposals = [];
    const ids = [];
    proposalSnapshot.forEach((proposal) => {
      proposals.push(proposal.data());
      ids.push(proposal.id);
    });
    return { proposals, ids, lastProposal: proposalSnapshot.docs[-1] };
  }
};
export {
  uploadProposal,
  readProposal,
  getProposalImage,
  upvoteProposal,
  getProposals,
  readProposalUpdates,
};
