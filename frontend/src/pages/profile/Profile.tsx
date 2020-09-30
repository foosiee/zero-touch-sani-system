import React from 'react';
import { withFirebase } from '../../components/FirebaseContext';
import { FirebaseComponentProps } from '../../interfaces/Interfaces';

const User = (props: FirebaseComponentProps) => {
  console.log(props.firebase?.auth.currentUser);
  return <div>{props.firebase?.auth.currentUser}</div>;
};

const FirebaseUser = withFirebase(User);

export const ProfilePage = () => (
  <div>
    <h1>Profile</h1>
    <FirebaseUser />
  </div>
);
