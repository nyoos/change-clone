import { useEffect, useState } from "react";
import { getUserImage } from "../../api/user";
import PlaceholderImage from "../../assets/user-icon.svg";

export function UserIcon({ userId, styling, alt }) {
  const [image, setImage] = useState(PlaceholderImage);

  useEffect(() => {
    getUserImage(userId).then((res) => {
      setImage(res);
    });
  }, [userId]);

  return <img src={image} className={`${styling}`} alt={`${alt}`} />;
}
