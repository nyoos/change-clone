import { useState } from "react";
import ActionButton from "../../components/ActionButton";

export default function Title({ title, setTitle, maxLength, next }) {
  const [error, setError] = useState("");

  const complete = () => {
    if (title.length) {
      next();
    } else {
      setError("Please write a headline.");
    }
  };
  return (
    <div>
      <h1 className="text-3xl mb-2">Write your petition title</h1>
      <p className="mb-4">
        This is the first thing that people will see about your petition. Get
        their attention with a short title that focusses on the change you'd
        like them to support.
      </p>
      <textarea
        name="title"
        className="long-text-area"
        rows="2"
        value={title}
        placeholder="What do you want to achieve?"
        onChange={(event) => {
          setError("");
          setTitle(event.target.value);
        }}
        maxLength={maxLength}
      />
      <div className="flex flex-row justify-between">
        <p className="text-s text-red-800">{error}</p>
        <span className="mr-0 ml-auto">{Number(maxLength) - title.length}</span>
      </div>
      <div className="md:flex md:justify-end md:mb-3">
        <ActionButton
          text="Continue"
          styling="w-full mt-4 md:w-min"
          onClick={complete}
        />
      </div>
    </div>
  );
}
