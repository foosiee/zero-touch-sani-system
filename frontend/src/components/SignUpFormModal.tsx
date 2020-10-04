import React, { useEffect, useState } from 'react';
import { SignUpFormModalProps } from '../interfaces/Interfaces';
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
import { SiteTheme } from '../utils/Theme';

interface FormState {
  username: string;
  email: string;
  passwordOne: string;
  passwordTwo: string;
  error: Error | null;
}

const INITIAL_STATE: FormState = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
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

export function SignUpFormModal(props: SignUpFormModalProps) {
  const [formState, setFormState] = useState(INITIAL_STATE);
  const [isInvalid, setIsInvalid] = useState(true);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { email, passwordOne } = formState;

    props.firebase
      ? props.firebase
          .CreateUserWithEmail(email, passwordOne)
          .then(() => {
            setFormState({ ...INITIAL_STATE });
          })
          .catch((error: Error) => {
            console.log(error);
          })
      : console.log('Invalid Firebase');

    event.preventDefault();
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const classes = useStyles();
  useEffect(() => {
    setIsInvalid(
      formState.passwordOne !== formState.passwordTwo ||
        formState.passwordOne === '' ||
        formState.email === '' ||
        formState.username === ''
    );
  }, [
    formState.passwordOne,
    formState.passwordTwo,
    formState.email,
    formState.username,
  ]);

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
                <h1>Sign Up</h1>
              </Grid>
              <form className={classes.root} onSubmit={onSubmit}>
                <Grid container xs={12}>
                  <TextField
                    name="username"
                    value={formState.username}
                    onChange={onChange}
                    type="text"
                    label="Full Name"
                    id="username"
                    className={classes.input}
                  />
                </Grid>
                <Grid container xs={12}>
                  <TextField
                    name="email"
                    value={formState.email}
                    onChange={onChange}
                    type="text"
                    label="Email Address"
                    id="email"
                    className={classes.input}
                  />
                </Grid>
                <Grid container xs={12}>
                  <TextField
                    name="passwordOne"
                    value={formState.passwordOne}
                    onChange={onChange}
                    type="password"
                    label="Password"
                    id="passwordOne"
                    className={classes.input}
                  />
                </Grid>
                <Grid container xs={12}>
                  <TextField
                    name="passwordTwo"
                    value={formState.passwordTwo}
                    onChange={onChange}
                    type="password"
                    label="Confirm Password"
                    id="passwordTwo"
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
                    Sign Up
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
