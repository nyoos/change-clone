import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { readUser } from "../../api/user";
import { UserIcon } from "./UserIcon";

export default function CommentCard({ discussion }) {
  const [authorName, setAuthorName] = useState("");

  useEffect(() => {
    readUser(discussion.author).then((user) => {
      setAuthorName(user.name);
    });
  }, [discussion]);
  return (
    <div className="bg-white p-2 md:pt-4 rounded-sm space-y-2">
      <div className="flex space-x-2 items-center">
        <UserIcon userId={discussion.author} styling="w-10" />
        <Link to={`/user/${discussion.author}`}>
          <b>{authorName}</b>
        </Link>
      </div>
      <p>{discussion.comment}</p>
    </div>
  );
}
