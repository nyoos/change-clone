import StandardButton from "../components/StandardButton";
import { readDiscussions } from "../../api/discussion";
import { useEffect, useState } from "react";
import CommentCard from "../components/CommentCard";
export default function DiscussionView({ showCommentForm, proposalId }) {
  const [discussions, setDiscussions] = useState(null);
  const [status, setStatus] = useState("loading");
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
  return (
    <div className="w-full bg-gray-200 px-4 py-6 space-y-4">
      <h2>Discussions</h2>
      {showDiscussions()}
      <StandardButton
        text="Leave a comment"
        styling="w-full"
        onClick={showCommentForm}
      />
    </div>
  );
}
