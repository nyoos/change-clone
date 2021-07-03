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
  const changeComment = (event) => {
    setComment(event.target.value);
  };

  const submitComment = (e) => {
    e.preventDefault();
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
    <ModalWrapper clickAway={closeForm}>
      <div className="relative bg-white rounded m-auto w-600px max-w-full-sm z-50">
        <button className="absolute top-2 right-3 text-xl" onClick={closeForm}>
          &#x2715;
        </button>
        <div className="p-6">
          <CommentForm
            comment={comment}
            changeComment={changeComment}
            submitComment={submitComment}
          />
        </div>
      </div>
    </ModalWrapper>
  );
}
