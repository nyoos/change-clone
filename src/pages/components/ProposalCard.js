import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { readUser } from "../../api/user";
import { use768Breakpoint } from "../../util/mediabreakpoints";
import { ProposalIcon } from "./ProposalIcon";
import { UserIcon } from "./UserIcon";
import SupporterIcon from "../../assets/people.svg";
export default function ProposalCard({ proposal, proposalId }) {
  const [authorName, setAuthorName] = useState("...");
  const history = useHistory();
  const biggerThan768 = use768Breakpoint();
  useEffect(() => {
    readUser(proposal.author).then((user) => setAuthorName(user.name));
  }, [proposal.author]);

  const handleOnClick = () => {
    history.push(`/proposal/${proposalId}`);
  };

  if (biggerThan768) {
    return (
      <div
        className="bg-white border-gray-300 border-t border-b px-4 py-4 text-xs md:border md:rounded-md "
        onClick={handleOnClick}
      >
        <div className="grid grid-cols-cardLeftPhoto space-x-3">
          <div className="space-y-1">
            <p className="text-gray-500 truncate">
              Petition to {proposal.target}
            </p>
            <h2>{proposal.title}</h2>

            <div className="relative">
              <p className="line-clamp-3">{proposal.description}</p>
              <p className="underline absolute bottom-0 right-0 z-10 text-theme-red pl-20 bg-gradient-to-l from-white via-white to-transparent">
                Read more
              </p>
            </div>
          </div>
          <div className="px-2 flex items-center justify-center">
            <ProposalIcon
              proposalId={proposalId}
              styling="object-cover w-142px h-142px"
            />
          </div>
        </div>

        <div className="mt-3 flex items-center">
          <UserIcon userId={proposal.author} styling="w-8" />
          <b className="ml-2">{authorName}</b>
          <p className="mr-0 ml-auto">
            <img
              src={SupporterIcon}
              className="h-4 inline mr-2 self-center"
              alt="Supporters icon"
            />
            {proposal.supporters.length} supporters
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="bg-white border-gray-300 border-t border-b px-4 py-4 text-xs md:border md:rounded-md"
        onClick={handleOnClick}
      >
        <p className="text-gray-500 truncate">Petition to {proposal.target}</p>
        <h2 className="mb-4">{proposal.title}</h2>
        <div className="px-2 mb-6">
          <ProposalIcon proposalId={proposalId} />
        </div>

        <p className="mb-2 line-clamp-3">{proposal.description}</p>
        <div className="flex items-center">
          <UserIcon userId={proposal.author} styling="w-8" />
          <b className="ml-2">{authorName}</b>
          <p className="mr-0 ml-auto">
            <img
              src={SupporterIcon}
              className="h-4 inline mr-2 self-center"
              alt="Supporters icon"
            />
            {proposal.supporters.length} supporters
          </p>
        </div>
      </div>
    );
  }
}
