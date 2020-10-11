import React, { useEffect, useState } from 'react';

import { withFirebase } from './FirebaseContext';
import { SignUpFormModal } from './SignUpFormModal';
import { LoginFormModal } from './LoginFormModal';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {
  makeStyles,
  createStyles,
  Theme,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { SiteTheme } from '../utils/Theme';
import { HeaderProps } from '../interfaces/Interfaces';
import { FirebaseUser } from '../utils/FirebaseInit';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { useHistory } from 'react-router-dom';

const FirebaseSignUpFormModal = withFirebase(SignUpFormModal);
const FirebaseLoginFormModal = withFirebase(LoginFormModal);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    loginButton: {
      color: 'white',
    },
  })
);

export function Header(props: HeaderProps) {
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const unmount = new Subject<boolean>();
  const history = useHistory();

  useEffect(() => {
    props.firebase
      ?.GetUser$()
      .pipe(takeUntil(unmount))
      .subscribe((user) => {
        setUser(user);
      });
    return () => {
      unmount.next();
      unmount.unsubscribe();
    };
  }, []);

  const handleSignUpOpen = () => {
    setSignUpOpen(true);
  };

  const handleSignUpClose = () => {
    setSignUpOpen(false);
  };

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleLogoutClick = () => {
    props.firebase?.SignOut().then(() => setUser(null));
  };

  const roomsClicked = () => {
    history.push('/rooms');
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={SiteTheme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              No Touch Sanation
            </Typography>
            {user ? (
              <>
                <Button color="secondary" onClick={roomsClicked}>
                  Rooms
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleLogoutClick}
                  color="secondary"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Box m={2}>
                  <Button
                    onClick={handleLoginOpen}
                    className={classes.loginButton}
                  >
                    Login
                  </Button>
                </Box>
                <Button
                  variant="outlined"
                  onClick={handleSignUpOpen}
                  color="secondary"
                >
                  Sign Up
                </Button>
                <FirebaseSignUpFormModal
                  open={signUpOpen}
                  closeCallback={handleSignUpClose}
                />
                <FirebaseLoginFormModal
                  open={loginOpen}
                  closeCallback={handleLoginClose}
                />
              </>
            )}
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    </div>
  );
}
