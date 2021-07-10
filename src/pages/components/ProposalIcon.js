import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getProposalImage } from "../../api/proposal";
import ContentLoader from "react-content-loader";

export function ProposalIcon({ proposalId, styling, alt, height, width }) {
  const [image, setImage] = useState();
  const history = useHistory();
  const handleOnClick = useCallback(
    () => history.push(`/proposal/${proposalId}`),
    [history, proposalId]
  );
  useEffect(() => {
    getProposalImage(proposalId)
      .then((res) => {
        setImage(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [proposalId]);

  if (image)
    return (
      <img
        src={image}
        className={`${styling}`}
        alt={`${alt}`}
        onClick={handleOnClick}
      />
    );
  else
    return (
      <ContentLoader viewBox="0 0 16 9">
        {" "}
        <rect x="0" y="0" height="9" width="16" />
      </ContentLoader>
    );
}
