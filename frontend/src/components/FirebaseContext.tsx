import React from 'react';
import { Firebase } from '../utils/FirebaseInit';

export const FirebaseContext = React.createContext<Firebase | null>(null);

export function withFirebase<T>(Component: React.ComponentType<T>) {
  return (props: T) => (
    <FirebaseContext.Consumer>
      {(firebase) => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
  );
}
