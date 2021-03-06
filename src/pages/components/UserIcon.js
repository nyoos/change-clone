import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getUserImage } from "../../api/user";
import PlaceholderImage from "../../assets/user-icon.svg";

export function UserIcon({ userId, styling, alt, disabled }) {
  const [image, setImage] = useState(PlaceholderImage);
  const history = useHistory();

  const handleOnClick = useCallback(
    () => history.push(`/user/${userId}`),
    [history, userId]
  );
  useEffect(() => {
    getUserImage(userId)
      .then((res) => {
        setImage(res);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  const onClick = () => {
    if (disabled) {
      return () => {};
    } else return handleOnClick;
  };
  return (
    <img
      src={image}
      className={`rounded-full  border border-gray-300 ${styling}`}
      alt={`${alt}`}
      onClick={onClick()}
    />
  );
}
