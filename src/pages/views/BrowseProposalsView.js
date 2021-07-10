import { useEffect, useState } from "react";
import { countProposals, getProposals } from "../../api/proposal";
import ProposalCard from "../components/ProposalCard";
import { BulletList } from "react-content-loader";
import StandardButton from "../components/StandardButton";

export default function BrowseProposalsView() {
  const [proposals, setProposals] = useState();
  const [lastProposal, setLastProposal] = useState();
  const [proposalIds, setProposalIds] = useState();
  const [status, setStatus] = useState("loading");
  const [numberOfDocuments, setNumberOfDocuments] = useState(0);

  useEffect(() => {
    const getproposals = async () => {
      const TotalProposalsNumber = await countProposals();
      setNumberOfDocuments(TotalProposalsNumber);
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

  const next = async () => {
    const {
      proposals: proposalsList,
      lastProposal: lastVisible,
      ids,
    } = await getProposals(lastProposal);
    setProposals([...proposals, ...proposalsList]);
    setProposalIds([...proposalIds, ...ids]);
    setLastProposal(lastVisible);
  };
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
        {proposals.length >= numberOfDocuments ? null : (
          <StandardButton onClick={next} styling="w-full" text={"Load more"} />
        )}
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
