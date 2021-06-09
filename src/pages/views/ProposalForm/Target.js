import { useState } from "react";
import ActionButton from "../../components/ActionButton";

export default function Target({ target, setTarget, maxLength, next }) {
  const [error, setError] = useState("");
  const complete = () => {
    if (target.length) {
      next();
    } else {
      setError("Please add a decision maker");
    }
  };
  return (
    <div>
      <h1 className="text-3xl mb-2">
        Great! Who has the power to make this change?
      </h1>
      <p className="mb-4">
        Choose the recipient(s) of your petition. These are people or
        organisations with the power to solve your problem or take the action
        you’re demanding.
      </p>
      <input
        name="target"
        className="long-text-area"
        value={target}
        placeholder="Petition target"
        onChange={(event) => {
          setError("");
          setTarget(event.target.value);
        }}
        maxlength={maxLength}
      />

      <div className="flex flex-row justify-between mt-2">
        <p className="text-s text-red-800">{error}</p>
        <span className="ml-auto mr-0">
          {Number(maxLength) - target.length}
        </span>
      </div>
      <ActionButton text="Continue" styling="w-full mt-4" onClick={complete} />
    </div>
  );
}
