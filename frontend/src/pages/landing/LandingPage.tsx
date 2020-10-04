import React from 'react';
import { withFirebase } from '../../components/FirebaseContext';
import { Header } from '../../components/Header';

const FirebaseHeader = withFirebase(Header);

export const LandingPage = () => {
  return <FirebaseHeader />;
};
