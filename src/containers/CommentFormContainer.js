import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import ModalWrapper from "../pages/components/ModalWrapper";

export default function CommentFormContainer({ showForm, closeForm }) {
  const user = useSelector(selectUser);

  if (user.status === "noUser") {
    closeForm();
  }

  return <ModalWrapper clickAway={closeForm}></ModalWrapper>;
}
