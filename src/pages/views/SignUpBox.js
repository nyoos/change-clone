import { signUp } from "../../api";
import { useState } from "react";
import ActionButton from "../components/ActionButton";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, signUpHandler } from "../../features/user/userSlice";

export default function SignUpBox() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const changeUsername = (event) => {
    setUsername(event.target.value);
  };
  const changePassword = (event) => {
    setPassword(event.target.value);
  };
  const changeEmail = (event) => {
    setEmail(event.target.value);
  };
  const changeDescription = (event) => {
    setDescription(event.target.value);
  };
  const changeProfileImage = (event) => {
    setProfileImage(event.target.files[0]);
  };
  const submitform = (e) => {
    e.preventDefault();
    dispatch(
      signUpHandler({ email, password, username, description, profileImage })
    );
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
          type: "text",
          name: "Name",
          value: username,
          onChange: changeUsername,
          placeholder: "Name",
        })}
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
        <div className="py-1 px-2 w-full active:border-gray-400 flex flex-col">
          <label className="mb-1" htmlFor="profileImage">
            Upload a picture:
          </label>
          <input
            className="text-sm"
            name="profileImage"
            type="file"
            onChange={changeProfileImage}
            accept="image/*"
            required
          />
        </div>
      </div>
      <div className="mt-3">
        <textarea
          className="long-text-area"
          name="description"
          rows="5"
          placeholder="Description"
          onChange={changeDescription}
          value={description}
          required
        ></textarea>
      </div>
      <div className="h-3">
        <p className="text-xs text-red-800">{user.error.signup}</p>
      </div>
      <div className="mt-4 flex justify-center">
        <ActionButton type="submit" onClick={submitform} text="Submit" />
      </div>
    </form>
  );
}
