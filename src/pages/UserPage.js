import { useEffect, useState } from "react";
import { readUser } from "../api/user";
import { UserIcon } from "./components/UserIcon";

function infoBox(status, userInfo, userId) {
  if (status === "loading") {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div>
        <div className="flex flex-col pb-3 px-3 mx-8 justify-between items-center">
          <UserIcon
            userId={userId}
            styling="w-36 rounded-full border-2 border-gray-400"
          />
          <div className="flex flex-col justify-start mt-6">
            <h1 className="text-3xl">{userInfo.name}</h1>
          </div>
        </div>
        <span className="block w-9 m-auto border-b-2 border-gray-300"></span>
        <div className="mt-6 flex flex-col text-center pb-10 mx-5 md:mx-10">
          <p>{userInfo.description}</p>
        </div>
      </div>
    );
  }
}
export default function UserPage({ match }) {
  const userId = match.params.userId;
  const [userInfo, setUserInfo] = useState();
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    readUser(userId).then((user) => {
      setUserInfo(user);
      setStatus("completed");
    });
  }, [userId]);

  return (
    <div>
      <div className="pt-8 px-4 mx-2 border-b-2 border-gray-300 md:mx-auto md:w-768px">
        {infoBox(status, userInfo, userId)}
      </div>
    </div>
  );
}
