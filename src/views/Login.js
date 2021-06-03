import { signIn, signUp } from "../api";
import { initializeUser } from "../api/user";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const changeUsername = (event) => {
    setUsername(event.target.value);
  };
  const changePassword = (event) => {
    setPassword(event.target.value);
  };
  const submitform = (e) => {
    e.preventDefault();
    initializeUser(
      "FMGTBr3QHsZPJ66pH0AsNh1Xi3v2",
      "Jackson",
      "Lorem ipsum sep dolor wtv"
    );
  };
  return (
    <form>
      <input
        type="text"
        name="username"
        value={username}
        onChange={changeUsername}
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={changePassword}
      />
      <button type="submit" onClick={submitform}>
        Submit
      </button>
    </form>
  );
}
