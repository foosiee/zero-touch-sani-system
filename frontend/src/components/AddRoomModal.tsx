import React, { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { AddRoomModalProps } from '../interfaces/Interfaces';
import {
  Card,
  MuiThemeProvider,
  makeStyles,
  Theme,
  createStyles,
  CardContent,
  Typography,
  Button,
  TextField,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { SiteTheme } from '../utils/Theme';

interface FormState {
  roomName: string;
}

const INITIAL_STATE: FormState = {
  roomName: '',
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

export function AddRoomModal(props: AddRoomModalProps) {
  const classes = useStyles();
  const [formState, setFormState] = useState(INITIAL_STATE);
  const [isInvalid, setIsInvalid] = useState(true);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    props.firebase
      ? props.firebase
          .CreateRoom(formState.roomName)
          .then((roomId) => {
            props.firebase?.AddRoomIdToUser(roomId);
            props.addRoomIdCallback(roomId);
          })
          .then(() => {
            setFormState({ ...INITIAL_STATE });
          })
          .catch((error: Error) => {
            console.log(error);
          })
      : console.log('Invalid firebase');
    event.preventDefault();
  };

  useEffect(() => {
    setIsInvalid(!!!formState.roomName);
  }, [formState.roomName]);

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
                <Typography variant="h6">Add Room</Typography>
              </Grid>
              <form className={classes.root} onSubmit={onSubmit}>
                <Grid container xs={12}>
                  <TextField
                    name="roomName"
                    value={formState.roomName}
                    onChange={onChange}
                    type="text"
                    label="Room Name"
                    id="roomName"
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
                    Create Room
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
