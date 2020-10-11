import React, { Component } from 'react';
import { withFirebase } from '../../components/FirebaseContext';
import { Header } from '../../components/Header';

const FirebaseHeader = withFirebase(Header);

export class LandingPage extends Component {
  render() {
    return (
      <>
        <FirebaseHeader />
        <div>Landing page</div>
      </>
    );
  }
}
