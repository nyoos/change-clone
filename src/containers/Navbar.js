import React, { useState } from "react";
import { use960Breakpoint } from "../util/mediabreakpoints";
import { Link, useHistory } from "react-router-dom";
import { selectUser, signOutHandler } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { UserIcon } from "../pages/components/UserIcon";

function NavLinks({ userStatus, userId, showLogin, logOut }) {
  return (
    <ul className="space-y-2">
      <li>
        <Link to="/proposals"> Browse </Link>
      </li>
      {userStatus === "hasUser" ? (
        <React.Fragment>
          <li>
            <Link to="/create_proposal"> Create Proposal </Link>
          </li>
          <li>
            <Link to={`/user/${userId}`}> My Page </Link>
          </li>
          <li>
            <button onClick={logOut}> Sign Out </button>
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
  const dispatch = useDispatch();
  const history = useHistory();

  const logOut = (e) => {
    e.preventDefault();
    dispatch(signOutHandler()).then(() => {
      history.push("/");
    });
  };

  function toggleDropdown() {
    setShowDropdown(showDropdown ^ true);
  }

  const Logo = () => {
    return (
      <Link to="/">
        <p className="text-3xl font-bold text-theme-red tracking-tighter">
          change.org
        </p>
      </Link>
    );
  };

  const Dropdown = () => {
    if (showDropdown) {
      return (
        <div
          className="fixed h-full w-full top-0 z-40"
          onClick={toggleDropdown}
        >
          <div className="fixed top-12 right-2 z-40">
            <div className="triangle border-b border-white empty-content-before float-right z-50 -mt-3px  mr-1"></div>
            <div className="mt-2 shadow-lg bg-white p-3 text-lg border border-gray-300 rounded-sm ">
              <NavLinks
                userStatus={user.status}
                userId={user.data.uid}
                showLogin={showLogin}
                logOut={logOut}
              />
            </div>
          </div>
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
      <nav className="fixed top-0 left-0 z-30 h-14 w-full flex flex-row shadow bg-white">
        <div className="w-full px-3 m-auto">
          <div className="flex flex-row items-center justify-between self-start">
            <Logo />
            <div className="flex flex-row space-x-3">
              {user.status === "hasUser" ? (
                <UserIcon
                  userId={user.data.uid}
                  styling="h-10 w-10 rounded-full"
                />
              ) : null}
              <button className={`text-2xl `} onClick={toggleDropdown}>
                &#9776;
              </button>
            </div>
          </div>
        </div>
        <Dropdown />
      </nav>
    );
}
