import StandardButton from "../components/StandardButton";
import { readDiscussions } from "../../api/discussion";
import { useEffect, useState } from "react";
import CommentCard from "../components/CommentCard";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import { UserIcon } from "../components/UserIcon";
import placeholderUserIcon from "../../assets/placeholderUserIcon.png";
import CommentFormContainer from "../../containers/CommentFormContainer";

export default function DiscussionView({ proposalId, showLogin }) {
  const [discussions, setDiscussions] = useState(null);
  const [status, setStatus] = useState("loading");
  const [showCommentForm, setShowCommentForm] = useState(false);
  const user = useSelector(selectUser);
  const updateDiscussions = (discussions) => {
    setDiscussions(discussions);
    setStatus("completed");
  };
  useEffect(() => {
    readDiscussions(proposalId, updateDiscussions);
  }, [proposalId]);

  const showDiscussions = () => {
    if (status === "loading") return null;
    else
      return discussions.map((disc, index) => (
        <CommentCard key={index} discussion={disc} />
      ));
  };

  const displayCommentForm = () => {
    if (user.status === "hasUser") {
      if (!showCommentForm) setShowCommentForm(true);
    } else {
      showLogin();
    }
  };
  const SigningForm = () => {
    return (
      <div
        onClick={displayCommentForm}
        className="transition-all duration-75 bg-white rounded-sm text-gray-400 w-full flex space-x-4 p-2 items-center md:border-b-2 md:pb-4"
      >
        {user.status === "hasUser" ? (
          <UserIcon
            userId={user.data.uid}
            disabled={true}
            styling="w-10 self-start"
          />
        ) : (
          <img
            src={placeholderUserIcon}
            className="w-10 rounded-full  border border-gray-300"
            alt="Current user"
          />
        )}
        {showCommentForm ? (
          <CommentFormContainer
            proposalId={proposalId}
            closeForm={() => setShowCommentForm(false)}
          />
        ) : (
          <p>I'm signing because...</p>
        )}
      </div>
    );
  };

  return (
    <div className="w-full bg-gray-200 px-4 py-6 space-y-4 md:bg-white md:px-0">
      <h2>Discussions</h2>
      {SigningForm()}
      <div className="space-y-4 md:divide-y-2 md:space-y-3">
        {showDiscussions()}
      </div>
    </div>
  );
}
