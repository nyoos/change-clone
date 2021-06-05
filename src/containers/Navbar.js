import React, { useState } from "react";
import { use960Breakpoint } from "../util/mediabreakpoints";
import { Link } from "react-router-dom";
import { selectUser } from "../features/user/userSlice";
import { useSelector } from "react-redux";
import { UserIcon } from "../pages/components/UserIcon";

function NavLinks({ userStatus, userId, showLogin }) {
  return (
    <ul>
      <li>
        <Link to="/proposals"> Browse </Link>
      </li>
      {userStatus === "hasUser" ? (
        <React.Fragment>
          <li>
            <Link to="/createProposal"> Create Proposal </Link>
          </li>
          <li>
            <Link to={`/userPage/${userId}`}> My Page </Link>
          </li>
        </React.Fragment>
      ) : (
        <li>
          <button onClick={showLogin}> Log in or sign up</button>
        </li>
      )}
    </ul>
  );
}
export default function Navbar({ showLogin }) {
  const biggerThan960 = use960Breakpoint();
  const [showDropdown, setShowDropdown] = useState(false);
  const user = useSelector(selectUser);

  function toggleDropdown() {
    setShowDropdown(showDropdown ^ true);
  }

  const Logo = () => {
    return (
      <p className="text-3xl font-bold text-theme-red tracking-tight">
        change.sg
      </p>
    );
  };

  const Dropdown = () => {
    if (showDropdown) {
      return (
        <div className="fixed top-14 right-5 z-40 shadow-lg">
          <NavLinks
            userStatus={user.status}
            userId={user.data.uid}
            showLogin={showLogin}
          />
        </div>
      );
    } else return null;
  };

  if (biggerThan960) {
    return (
      <nav className="fixed top-0 left-0 z-30 h-14 w-full flex flex-row shadow">
        <div className="w-full px-3 m-auto">
          <div className="flex flex-row items-center justify-between self-start">
            <Logo />
            <button
              className={`text-2xl ${showDropdown ? "text-theme-red" : ""}`}
              onClick={toggleDropdown}
            >
              aye
            </button>
          </div>
        </div>
        <Dropdown />
      </nav>
    );
  } else
    return (
      <nav className="fixed top-0 left-0 z-30 h-14 w-full flex flex-row shadow">
        <div className="w-full px-3 m-auto">
          <div className="flex flex-row items-center justify-between self-start">
            <Logo />
            <div className="flex flex-row space-x-3">
              {user.status === "hasUser" ? (
                <UserIcon
                  userId={user.data.uid}
                  styling="h-10 w-10 rounded-full border-2 border-gray-400"
                />
              ) : null}
              <button
                className={`text-2xl ${showDropdown ? "text-theme-red" : ""}`}
                onClick={toggleDropdown}
              >
                &#9776;
              </button>
            </div>
          </div>
        </div>
        <Dropdown />
      </nav>
    );
}
