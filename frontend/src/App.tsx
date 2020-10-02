import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LandingPage } from './pages/landing/LandingPage';
import { ProfilePage } from './pages/profile/Profile';

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/profile" component={ProfilePage} />
      </Router>
    </div>
  );
}

export default App;
