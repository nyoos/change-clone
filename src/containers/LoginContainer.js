import ModalWrapper from "../pages/components/ModalWrapper";
import SignUpBox from "../pages/views/SignUpBox";
import { useState } from "react";
import { useSelector } from "react-redux";
import LogInBox from "../pages/views/LogInBox";
import { selectUser } from "../features/user/userSlice";
export default function LoginContainer({ showLogin, closeLogin }) {
  const [showSignUp, setShowSignUp] = useState(false);

  const ToggleButton = ({ text }) => {
    return (
      <button
        className="text-theme-red underline"
        onClick={() => {
          setShowSignUp(showSignUp ^ true);
        }}
      >
        {text}
      </button>
    );
  };
  const loginSignup = () => {
    if (showSignUp) {
      return (
        <div>
          <h1 className="text-center mt-3">Sign Up</h1>
          <p className="text-center mt-2 mb-6 pb-3 border-b border-gray-400">
            Already have an account? <ToggleButton text="Log in" />
          </p>
          <SignUpBox />
        </div>
      );
    } else {
      return (
        <div>
          <h1 className="text-center mt-3">Log In</h1>
          <p className="text-center mt-2 mb-6 pb-3 border-b border-gray-400">
            Don't have an account? <ToggleButton text="Sign up" />
          </p>
          <LogInBox />
        </div>
      );
    }
  };
  if (showLogin) {
    return (
      <ModalWrapper clickAway={closeLogin}>
        <div className="relative bg-white rounded m-auto w-full h-full max-w-full-sm z-50 animate-expand-fast md:w-96 md:h-auto">
          <button
            className="absolute top-2 right-3 text-3xl md:text-xl"
            onClick={closeLogin}
          >
            &#x2715;
          </button>
          <div className="p-6">{loginSignup()}</div>
        </div>
      </ModalWrapper>
    );
  } else {
    return null;
  }
}
