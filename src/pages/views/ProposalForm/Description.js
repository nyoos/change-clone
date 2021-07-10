import { useState } from "react";
import ActionButton from "../../components/ActionButton";

export default function Description({
  description,
  setDescription,
  recommendedLength,
  next,
}) {
  const [error, setError] = useState("");
  const complete = () => {
    if (description.length) {
      next();
    } else {
      setError("Please tell your story.");
    }
  };

  const subtext = (descriptionLength, recommendedLength) => {
    if (descriptionLength > 0 && descriptionLength < recommendedLength) {
      return (
        <p className="text-s">
          Great — you've started writing your petition. We recommend adding
          another
          <span className="text-theme-red font-bold">
            {` ${recommendedLength - description.length} `}
          </span>
          more characters before you finish — keep going!
        </p>
      );
    } else if (descriptionLength > recommendedLength) {
      return (
        <p className="text-s">
          Great — your petition is currently
          <span className="text-green-400 font-bold">
            {` ${description.length} `}
          </span>
          characters long — that’s within the description length of some of the
          most successful petitions!
        </p>
      );
    } else {
      return (
        <p className="text-s">
          The most successful petitions tend to be at least 3 paragraphs long
          (about 1,000 characters in length)
        </p>
      );
    }
  };
  return (
    <div>
      <h1 className="text-3xl mb-2">Explain the problem you want to solve</h1>
      <p className="mb-4">
        People are more likely to support your petition if it’s clear why you
        care. Explain how this change will impact you, your family, or your
        community.
      </p>
      <textarea
        name="description"
        className="long-text-area"
        rows="10"
        value={description}
        placeholder="Petition description"
        onChange={(event) => {
          setError("");
          setDescription(event.target.value);
        }}
      />

      <div className="mt-2">
        <p className="text-s text-red-800">{error}</p>
        {subtext(description.length, recommendedLength)}
      </div>
      <div className="md:flex md:justify-end md:mb-3">
        <ActionButton
          text="Continue"
          styling="w-full mt-4 md:w-min md:float-right"
          onClick={complete}
        />
      </div>
    </div>
  );
}
