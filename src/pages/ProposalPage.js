import { useEffect, useState } from "react";
import { readProposal, upvoteProposal } from "../api/proposal";
import { ProposalIcon } from "./components/ProposalIcon";
import { List } from "react-content-loader";
import React from "react";
import { UserIcon } from "./components/UserIcon";
import { Link, useParams } from "react-router-dom";
import { readUser } from "../api/user";
import { selectUser } from "../features/user/userSlice";
import { useSelector } from "react-redux";
import ActionButton from "./components/ActionButton";
import CommentFormContainer from "../containers/CommentFormContainer";
import Discussions from "./views/DiscussionView";
export default function ProposalPage({ showLogin }) {
  const user = useSelector(selectUser);
  const { proposalId } = useParams();
  const [proposalInfo, setProposalInfo] = useState();
  const [author, setAuthorInfo] = useState();
  const [status, setStatus] = useState("loading");
  const [showCommentForm, setShowCommentForm] = useState(false);

  useEffect(() => {
    readProposal(proposalId)
      .then((proposal) => {
        setProposalInfo(proposal);
        return proposal.author;
      })
      .then(readUser)
      .then((user) => {
        setAuthorInfo(user);
        setStatus("completed");
      });
  }, [proposalId]);

  const ProposalDisplay = () => {
    return (
      <div>
        <div className="border-b border-gray-300 space-y-2 w-full px-4 pb-2">
          <h1> {proposalInfo.title} </h1>
          <p>
            {" "}
            <b>
              <span>{proposalInfo.supporters.length}</span> have signed.{" "}
            </b>
          </p>

          <div className="flex justify-start items-center space-x-3 py-2">
            <UserIcon userId={proposalInfo.author} styling="w-10" />
            <p className="font-bold text-sm text-gray-600">
              <Link to={`/user/${proposalInfo.author}`}>
                <u>{author.name}</u> started this petition to{" "}
                <u>{proposalInfo.target}</u>
              </Link>
            </p>
          </div>
        </div>
        <div className="border-b border-gray-300 px-4 text-lg py-5 whitespace-pre-wrap pb-5">
          {proposalInfo.description}
        </div>
      </div>
    );
  };

  const addSign = () => {
    if (user.status === "hasUser") {
      upvoteProposal(proposalId);
    } else {
      showLogin();
    }
  };

  const displayCommentForm = () => {
    if (user.status === "hasUser") {
      setShowCommentForm(true);
    } else {
      showLogin();
    }
  };

  const content = () => {
    if (status === "loading")
      return (
        <div className="w-full m-auto">
          <List />
        </div>
      );
    else
      return (
        <div>
          <ProposalDisplay />
          <Discussions
            showCommentForm={displayCommentForm}
            proposalId={proposalId}
          />
          {showCommentForm ? (
            <CommentFormContainer
              proposalId={proposalId}
              closeForm={() => setShowCommentForm(false)}
              showLogin={showLogin}
            />
          ) : null}
        </div>
      );
  };
  return (
    <div>
      <ProposalIcon
        proposalId={proposalId}
        styling="w-full"
        height="9"
        width="16"
      />
      <div className="mt-4 mb-20">{content()}</div>
      <div className="fixed bottom-0 h-16 py-2 px-3 bg-gray-100 border-t border-gray-300 w-full">
        <ActionButton
          text="Sign Petition"
          onClick={addSign}
          styling="w-full m-auto h-12"
        />
      </div>
    </div>
  );
}
