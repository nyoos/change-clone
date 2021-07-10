import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { uploadDiscussion } from "../api/discussion";
import { selectUser } from "../features/user/userSlice";
import Discussion from "../models/Discussion";
import ModalWrapper from "../pages/components/ModalWrapper";
import CommentForm from "../pages/views/CommentForm";

export default function CommentFormContainer({ proposalId, closeForm }) {
  const user = useSelector(selectUser);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const changeComment = (event) => {
    setComment(event.target.value);
  };

  const submitComment = (e) => {
    e.preventDefault();
    if (!comment) {
      setError("Please enter a comment.");
    }
    if (user.status === "hasUser" && comment) {
      uploadDiscussion(proposalId, new Discussion(user.data.uid, comment)).then(
        closeForm
      );
    }
  };

  if (user.status !== "hasUser") {
    return null;
  }

  return (
    <CommentForm
      comment={comment}
      changeComment={changeComment}
      submitComment={submitComment}
      closeForm={closeForm}
      error={error}
    />
  );
}
