import { useEffect, useState } from "react";
import { getProposals } from "../../api/proposal";
import ProposalCard from "../components/ProposalCard";
export default function BrowseProposalsView() {
  const [proposals, setProposals] = useState();
  const [lastProposal, setLastProposal] = useState();
  const [proposalIds, setProposalIds] = useState();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const getproposals = async () => {
      const {
        proposals: proposalList,
        lastProposal: lastVisible,
        ids,
      } = await getProposals();
      setProposals(proposalList);
      setLastProposal(lastVisible);
      setProposalIds(ids);
      setStatus("completed");
    };
    getproposals();
  }, []);

  if (status === "completed") {
    return (
      <div className="space-y-6">
        {proposals.map((proposal, index) => {
          return (
            <ProposalCard
              proposal={proposal}
              key={index}
              proposalId={proposalIds[index]}
            />
          );
        })}
      </div>
    );
  } else return null;
}
