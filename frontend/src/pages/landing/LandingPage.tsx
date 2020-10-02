import React, { useState } from 'react';
import { withFirebase } from '../../components/FirebaseContext';
import { SignUpFormModal } from '../../components/SignUpFormModal';
import { LoginFormModal } from '../../components/LoginFormModal';

const FirebaseSignUpFormModal = withFirebase(SignUpFormModal);
const FirebaseLoginFormModal = withFirebase(LoginFormModal);

export const LandingPage = () => {
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleSignUpOpen = () => {
    setSignUpOpen(true);
  };

  const handleSignUpClose = () => {
    setSignUpOpen(false);
  };

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  return (
    <div>
      Landing Page
      <button onClick={handleSignUpOpen}>Sign Up</button>
      <FirebaseSignUpFormModal
        open={signUpOpen}
        closeCallback={handleSignUpClose}
      />
      <button onClick={handleLoginOpen}>Login</button>
      <FirebaseLoginFormModal
        open={loginOpen}
        closeCallback={handleLoginClose}
      />
    </div>
  );
};
