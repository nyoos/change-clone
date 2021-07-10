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
import { PageNotFound } from "./pages/PageNotFound";
import { Footer } from "./pages/views/Footer";

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
    <Router basename={process.env.PUBLIC_URL}>
      <div className="text-theme-black font-medium h-full">
        <Navbar showLogin={() => setShowLogin(true)} />
        <LoginContainer
          showLogin={showLogin}
          closeLogin={() => setShowLogin(false)}
        />
        <div className="min-h-screen -mb-48">
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
              <Route exact path="/404" component={PageNotFound} />
              <Redirect to="/404" />
            </Switch>
          </div>
          <div className="h-48 block"></div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
