import React from 'react';
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
} from '@material-ui/core';
import { SiteTheme } from '../utils/Theme';

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
  return (
    <Modal
      open={props.open}
      onClose={props.closeCallback}
      className={classes.modal}
    >
      <MuiThemeProvider theme={SiteTheme}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6">Add Room</Typography>
          </CardContent>
        </Card>
      </MuiThemeProvider>
    </Modal>
  );
}
