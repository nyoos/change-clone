import { useEffect, useState } from "react";
import { getProposals } from "../../api/proposal";
import ProposalCard from "../components/ProposalCard";
import { BulletList } from "react-content-loader";

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
      <div className="space-y-6 md:space-y-10 md:mx-5">
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
  } else if (status === "loading") {
    return (
      <div className="h-48">
        <BulletList />
      </div>
    );
  } else return null;
}
