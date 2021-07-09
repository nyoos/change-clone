import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginContainer from "./containers/LoginContainer";

import Navbar from "./containers/Navbar";
import LandingPage from "./pages/LandingPage";
import ProposalPage from "./pages/ProposalPage";
import UserPage from "./pages/UserPage";
import ProposalCreationPage from "./pages/ProposalCreationPage";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeSignedInHandler,
  selectUser,
} from "./features/user/userSlice";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeSignedInHandler());
  }, [dispatch]);

  useEffect(() => {
    if (user.status === "hasUser") {
      setShowLogin(false);
    }
  }, [user]);

  return (
    <Router>
      <div className="text-theme-black font-medium">
        <Navbar showLogin={() => setShowLogin(true)} />
        <LoginContainer
          showLogin={showLogin}
          closeLogin={() => setShowLogin(false)}
        />
        <div className="App mt-14 mb-2">
          <Switch>
            <Route exact path="/" render={() => <LandingPage />} />
            <Route exact path="/proposal/:proposalId">
              <ProposalPage showLogin={() => setShowLogin(true)} />
            </Route>

            <Route
              exact
              path="/create_proposal"
              component={ProposalCreationPage}
            />
            <Route exact path="/user/:userId" component={UserPage} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
