import { useState } from "react";
import Proposal from "../models/Proposal";
import { uploadProposal } from "../api/proposal";
import Description from "../pages/views/ProposalForm/Description";
import Photo from "../pages/views/ProposalForm/Photo";
import Target from "../pages/views/ProposalForm/Target";
import Title from "../pages/views/ProposalForm/Title";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import { useHistory } from "react-router";

const tabButtons = (tabs, tab, setTab, completed) => {
  const buttonType = (index, completed) => {
    if (completed[index]) {
      return (
        <button
          className={`rounded-full w-10 h-10 border-2 border-theme-red text-md ${
            tab === index
              ? "bg-theme-red text-white"
              : "bg-theme-white text-theme-red"
          }`}
          onClick={() => setTab(index)}
        >
          {tab === index ? index + 1 : "✓"}
        </button>
      );
    } else {
      return (
        <button
          className={`rounded-full w-10 h-10 border-2 text-md ${
            tab === index
              ? "border-theme-red bg-theme-red text-white"
              : "bg-theme-white border-gray-500 text-gray-500"
          }`}
          onClick={
            completed[index - 1]
              ? () => {
                  setTab(index);
                }
              : () => {}
          }
        >
          {index + 1}
        </button>
      );
    }
  };

  return tabs.map((item, index) => {
    return buttonType(index, completed);
  });
};

export default function ProposalCreationContainer() {
  const user = useSelector(selectUser);
  const tabIndexes = [1, 2, 3, 4];
  const [completed, setCompleted] = useState([0, 0, 0, 0]);
  const [tab, setTab] = useState(0);
  const [proposal, setProposal] = useState(new Proposal());
  const [image, setImage] = useState(null);
  const history = useHistory();
  const setFieldInProposal = (field) => {
    return (input) => {
      setProposal({
        ...proposal,
        [field]: input,
      });
    };
  };

  const next = (index) => {
    const newCompleted = [...completed];
    newCompleted[index] = 1;
    setCompleted(newCompleted);
    setTab(index + 1);
  };

  const complete = () => {
    if (
      proposal.title &&
      proposal.target &&
      proposal.description &&
      image &&
      user.status === "hasUser"
    ) {
      // const supporters = [];
      // const num_supporters = Math.floor(Math.random() * 10000) + 1000;
      // for (let i = 0; i < num_supporters; i++) {
      //   supporters.push(i);
      // }
      // const toSubmit = { ...proposal, author: user.data.uid, supporters };
      const toSubmit = { ...proposal, author: user.data.uid };
      uploadProposal(toSubmit, image).then((proposalId) => {
        history.push(`/proposal/${proposalId}`);
      });
    } else {
      console.log([
        proposal.title,
        proposal.target,
        proposal.description,
        image,
        user.status === "hasUser",
      ]);
      throw new Error("Please fill in all the fields.");
    }
  };
  const tabs = [
    <Title
      title={proposal.title}
      setTitle={setFieldInProposal("title")}
      maxLength="90"
      next={() => next(0)}
    />,
    <Target
      target={proposal.target}
      setTarget={setFieldInProposal("target")}
      maxLength="100"
      next={() => next(1)}
    />,
    <Description
      description={proposal.description}
      setDescription={setFieldInProposal("description")}
      recommendedLength="1000"
      next={() => next(2)}
    />,
    <Photo photo={image} setPhoto={setImage} next={complete} />,
  ];

  return (
    <div>
      <div className="flex flex-row justify-evenly py-12 px-10 w-96 mx-auto">
        {tabButtons(tabIndexes, tab, setTab, completed)}
      </div>
      <div className="px-2 md:w-768px mx-auto">{tabs[tab]}</div>
    </div>
  );
}
