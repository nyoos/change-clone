import { useHistory } from "react-router";
import ActionButton from "./components/ActionButton";
import BrowseProposalsView from "./views/BrowseProposalsView";
import Login from "./views/SignUpBox";

export default function LandingPage() {
  const history = useHistory();
  const redirectToProposal = () => {
    history.push("/create_proposal");
  };
  return (
    <div>
      <div className="py-28 flex-col items-center leading-snug text-center">
        <h1 className="text-5xl mx-5 md:w-768px md:mx-auto">
          The world's platform for change.
        </h1>
        <p className="text-theme-red mt-5">Victories every day.</p>
        <ActionButton
          onClick={redirectToProposal}
          text="Start a petition"
          styling="py-3 mt-5"
        />
      </div>
      <div className="bg-gray-100 py-4 md:pt-10 md:mx-auto md:bg-white md:w-768px ">
        <h2 className="mx-2 mb-4 md:mb-4 md:mx-5">
          What's happening on change.org
        </h2>
        <BrowseProposalsView />
      </div>
    </div>
  );
}
