import React, { Component } from 'react';
import { withFirebase } from '../../components/FirebaseContext';
import { Header } from '../../components/Header';
import { useHistory } from 'react-router-dom';

const FirebaseHeader = withFirebase(Header);

export function LandingPage() {
  const history = useHistory();
  return (
    <>
      <FirebaseHeader />
      <button onClick={() => history.push('/rooms/SaLra23v2goFHRVsZ3be')}>
        To rooms 1
      </button>
      <div>Landing page</div>
    </>
  );
}
