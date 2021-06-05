import React, { useState } from "react";
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

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const toggleLogin = () => setShowLogin(showLogin ^ true);

  return (
    <Router>
      <div className="text-theme-black">
        <Navbar showLogin={() => setShowLogin(true)} />
        <LoginContainer
          showLogin={showLogin}
          closeLogin={() => setShowLogin(false)}
        />
        <div className="App mt-14">
          <Switch>
            <Route exact path="/" render={() => <LandingPage />} />
            <Route exact path="/proposals/:postId" component={ProposalPage} />
            <Route exact path="/userPage/:userId" component={UserPage} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
