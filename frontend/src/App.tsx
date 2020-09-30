import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LandingPage } from './pages/landing/LandingPage';
import { LoginPage } from './pages/login/LoginPage';
import { ProfilePage } from './pages/profile/Profile';
import { SignUpPage } from './pages/signup/SignUp';

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/login" component={LoginPage} />
      </Router>
    </div>
  );
}

export default App;
