import { useState } from "react";
import { selectUser, signInHandler } from "../../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import ActionButton from "../components/ActionButton";

export default function LogInBox() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const changePassword = (event) => {
    setPassword(event.target.value);
  };
  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const submitform = (e) => {
    e.preventDefault();
    dispatch(signInHandler({ email, password }));
  };

  const TextInput = ({ type, name, value, onChange, placeholder }) => {
    return (
      <input
        className="py-1 px-2 w-full active:border-gray-400"
        required
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    );
  };
  return (
    <form className="flex flex-col mt-3">
      <div className="border rounded-sm border-gray-300 divide-y divide-y-gray-300">
        {TextInput({
          type: "email",
          name: "Email",
          value: email,
          onChange: changeEmail,
          placeholder: "Email",
        })}
        {TextInput({
          type: "password",
          name: "password",
          value: password,
          onChange: changePassword,
          placeholder: "Password",
        })}
      </div>
      <div className="h-3">
        <p className="text-xs text-red-800">{user.error.login}</p>
      </div>

      <div className="mt-4 flex justify-center">
        <ActionButton
          type="submit"
          onClick={submitform}
          text="Log In"
          className="w-full md:w-auto"
        />
      </div>
    </form>
  );
}
