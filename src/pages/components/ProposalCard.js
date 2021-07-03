import { useEffect, useState } from "react";
import { readUser } from "../../api/user";
import { ProposalIcon } from "./ProposalIcon";
import { UserIcon } from "./UserIcon";

export default function ProposalCard({ proposal, proposalId }) {
  const [authorName, setAuthorName] = useState("...");

  useEffect(() => {
    readUser(proposal.author).then((user) => setAuthorName(user.name));
  }, [proposal.author]);
  return (
    <div className="bg-white border-gray-300 border-t border-b px-4 py-4 text-xs">
      <p className="text-gray-500">
        Petition to{" "}
        {proposal.target.length > 40
          ? proposal.target.slice(0, 40) + "..."
          : proposal.target}
      </p>
      <h2 className="mb-4">{proposal.title}</h2>
      <div className="px-2 mb-6">
        <ProposalIcon proposalId={proposalId} />
      </div>

      <p className="mb-2">
        {proposal.description.length > 200
          ? proposal.description.slice(0, 200) + "..."
          : proposal.description}
      </p>
      <div className="flex items-center">
        <UserIcon userId={proposal.author} styling="w-8" />
        <b className="ml-2">{authorName}</b>
        <p className="mr-0 ml-auto">{proposal.supporters.length} supporters</p>
      </div>
    </div>
  );
}
