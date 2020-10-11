import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
  isAuthed: boolean;
}> = (props) => {
  console.log(`isAuthed ${props.isAuthed}`);
  return props.isAuthed ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/" />
  );
};
