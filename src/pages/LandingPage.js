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
      <div className="py-16 flex-col items-center leading-snug text-center">
        <h1>The world's platform for change.</h1>
        <p className="text-theme-red mt-2">Victories every day.</p>
        <ActionButton
          onClick={redirectToProposal}
          text="Start a petition"
          styling="py-3 mt-5"
        />
      </div>
      <div className="bg-gray-100 py-4">
        <h2 className="mx-2 mb-4">What's happening on change.org</h2>
        <BrowseProposalsView />
      </div>
    </div>
  );
}
