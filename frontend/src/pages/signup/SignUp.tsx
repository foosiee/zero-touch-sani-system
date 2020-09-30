import React from 'react';
import { withFirebase } from '../../components/FirebaseContext';
import { SignUpForm } from '../../components/SignUpForm';

const FirebaseSignUpForm = withFirebase(SignUpForm);

export const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <FirebaseSignUpForm />
  </div>
);
