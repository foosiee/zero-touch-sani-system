import React from 'react';
import { withFirebase } from '../../components/FirebaseContext';
import { SignInForm } from '../../components/SignInForm';

const FirebaseLoginForm = withFirebase(SignInForm);

export const LoginPage = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <FirebaseLoginForm />
    </div>
  );
};
