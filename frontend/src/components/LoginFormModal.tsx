import React, { useEffect, useState } from 'react';
import { LoginFormModalProps } from '../interfaces/Interfaces';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import {
  makeStyles,
  createStyles,
  Theme,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SiteTheme } from '../utils/Theme';

interface FormState {
  email: string;
  password: string;
}

const INITIAL_STATE: FormState = {
  email: '',
  password: '',
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    card: {
      display: 'inline-block',
      minWidth: '30%',
    },
    input: {
      height: '5vh',
      width: '40vh',
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);

export function LoginFormModal(props: LoginFormModalProps) {
  const [formState, setFormState] = useState(INITIAL_STATE);
  const [isInvalid, setIsInvalid] = useState(true);
  const [loading, setLoading] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { email, password } = formState;
    setLoading(true);
    props.firebase
      ? props.firebase
          .SignInWithEmail(email, password)
          .then(() => {
            setLoading(false);
            props.closeCallback();
          })
          .catch((error: Error) => {
            console.log(error);
          })
      : console.log('Invalid firebase');

    event.preventDefault();
  };

  const classes = useStyles();
  useEffect(() => {
    setIsInvalid(formState.email === '' || formState.password === '');
  }, [formState.email, formState.password]);

  return (
    <Modal
      open={props.open}
      onClose={props.closeCallback}
      className={classes.modal}
    >
      <MuiThemeProvider theme={SiteTheme}>
        <Card className={classes.card}>
          <CardContent>
            <Grid container justify="center" alignItems="center">
              <Grid container xs={12} justify="center" alignItems="center">
                <h1>Login</h1>
              </Grid>
              <form className={classes.root} onSubmit={onSubmit}>
                <Grid container xs={12}>
                  <TextField
                    name="email"
                    value={formState.email}
                    onChange={onChange}
                    type="text"
                    label="Email"
                    id="email"
                    className={classes.input}
                  />
                </Grid>
                <Grid container xs={12}>
                  <TextField
                    name="password"
                    value={formState.password}
                    onChange={onChange}
                    type="password"
                    label="Password"
                    id="password"
                    className={classes.input}
                  />
                </Grid>
                <Grid container xs={12} justify="center" alignItems="center">
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isInvalid}
                    type="submit"
                    style={{ color: 'white' }}
                  >
                    {loading ? <CircularProgress color="secondary" /> : 'Login'}
                  </Button>
                </Grid>
              </form>
            </Grid>
          </CardContent>
        </Card>
      </MuiThemeProvider>
    </Modal>
  );
}
