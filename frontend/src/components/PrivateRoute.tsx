import React, { ReactNode } from 'react';
import { Route, Redirect } from 'react-router-dom';

interface PrivateRouteParams {
  component: any;
  isAuthed: boolean;
  children?: ReactNode;
  [x: string]: any;
}

export const PrivateRoute = ({
  component,
  isAuthed,
  ...rest
}: PrivateRouteParams) => {
  const routeComponent = (props: any) =>
    isAuthed ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: '/' }} />
    );
  return <Route {...rest} render={routeComponent} />;
};
