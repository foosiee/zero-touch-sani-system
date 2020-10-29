import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import { AppProps } from './interfaces/Interfaces';
import { RoomsPage } from './pages/rooms/RoomsPage';
import { RoomPage } from './pages/room/RoomPage';
import { RouteComponentProps } from 'react-router-dom';

import { LandingPage } from './pages/landing/LandingPage';
import { FirebaseUser } from './utils/FirebaseInit';
import { Subject } from 'rxjs';
import { withFirebase } from './components/FirebaseContext';

interface AppState {
  user: FirebaseUser | null;
}

const FirebaseRoomsPage = withFirebase(RoomsPage);
const FirebaseRoomPage = withFirebase(RoomPage);

class App extends Component<AppProps, AppState> {
  private unmount$: Subject<boolean>;
  constructor(props: AppProps) {
    super(props);
    this.state = {
      user: null,
    };
    this.unmount$ = new Subject<boolean>();
  }

  componentDidMount() {
    this.subscribeToFirebaseUser();
  }

  componentWillUnmount() {
    this.unmount$.next();
    this.unmount$.unsubscribe();
  }

  private subscribeToFirebaseUser() {
    this.props.firebase?.GetUser$().subscribe((user) => {
      console.log(user);
      this.setState({ user: user });
    });
  }

  render() {
    return (
      <div>
        <Router>
          <Route exact path="/" component={LandingPage} />
          <PrivateRoute
            isAuthed={!!this.state.user}
            path="/rooms"
            component={FirebaseRoomsPage}
            exact
          />
          <PrivateRoute
            isAuthed={!!this.state.user}
            path="/rooms/:id"
            component={FirebaseRoomPage}
            exact
          />
        </Router>
      </div>
    );
  }
}

export default App;
