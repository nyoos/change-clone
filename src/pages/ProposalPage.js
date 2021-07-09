import { useEffect, useState } from "react";
import {
  readProposal,
  readProposalUpdates,
  upvoteProposal,
} from "../api/proposal";
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
import { use768Breakpoint } from "../util/mediabreakpoints";
export default function ProposalPage({ showLogin }) {
  const user = useSelector(selectUser);
  const { proposalId } = useParams();
  const [proposalInfo, setProposalInfo] = useState();
  const [author, setAuthorInfo] = useState();
  const [status, setStatus] = useState("loading");
  const [showCommentForm, setShowCommentForm] = useState(false);

  const biggerThan768 = use768Breakpoint();

  useEffect(() => {
    readProposalUpdates(proposalId, (proposal) => {
      setProposalInfo(proposal);
      readUser(proposal.author).then((user) => {
        setAuthorInfo(user);
        setStatus("completed");
      });
    });
  }, [proposalId]);

  const ProposalSubText = () => {
    return (
      <div className="flex justify-start items-center space-x-3 py-2">
        <UserIcon userId={proposalInfo.author} styling="w-10" />
        <p className="font-bold text-sm text-gray-600 md:text-xs">
          <Link to={`/user/${proposalInfo.author}`}>
            <u>{author.name}</u> started this petition to{" "}
            <u>{proposalInfo.target}</u>
          </Link>
        </p>
      </div>
    );
  };
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

          {ProposalSubText()}
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

  const SignButton = () => {
    if (user.status === "hasUser" && status === "completed") {
      if (proposalInfo.supporters.includes(user.data.uid)) {
        return (
          <ActionButton
            text="✔ Thank you for signing!"
            onClick={() => {}}
            styling="w-full m-auto h-12 md:h-10 md:text-sm md:px-2"
          />
        );
      }
    }
    return (
      <ActionButton
        text="Sign this petition"
        onClick={addSign}
        styling="w-full m-auto h-12 md:h-10"
      />
    );
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

  const content768 = () => {
    if (status === "loading")
      return (
        <div className="w-full m-auto">
          <List />
        </div>
      );
    else
      return (
        <div className="w-768px px-10 mt-24 mx-auto">
          <h1 className="text-center">{proposalInfo.title}</h1>
          <div className="w-full mt-10 grid grid-cols-cardLeftPhoto">
            <div className="pr-10">
              <ProposalIcon
                proposalId={proposalId}
                styling="w-full"
                height="9"
                width="16"
              />
              {ProposalSubText()}
              <div className="text-lg py-5 whitespace-pre-wrap pb-5">
                {proposalInfo.description}
              </div>
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
            <div>
              <p className="mb-2">
                <b>
                  <span>{proposalInfo.supporters.length}</span> have signed.{" "}
                </b>
              </p>
              <SignButton />
            </div>
          </div>
        </div>
      );
  };

  if (biggerThan768) {
    return <div>{content768()}</div>;
  } else
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
          {SignButton()}
        </div>
      </div>
    );
}
