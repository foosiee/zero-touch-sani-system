import React, { useState, useEffect } from 'react';
import { EditDeviceModalProps, FirebaseDevice } from '../interfaces/Interfaces';
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
  Modal,
  Grid,
  Switch,
  FormControlLabel,
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

export function EditDeviceModal(props: EditDeviceModalProps) {
  const classes = useStyles();
  const [state, setState] = useState(false);

  useEffect(() => {
    setState(props.device?.state === 'ON');
  }, [props.device?.state]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(`updating state: ${state}`);
    if (props.device) {
      const updatedDevice: FirebaseDevice = {
        id: props.device.id,
        state: state ? 'ON' : 'OFF',
      };
      props.firebase
        ? props.firebase.UpdateDevice(updatedDevice).then(() => {
            props.editCallback(updatedDevice);
            props.closeCallback();
          })
        : console.log('bad firebase');
    }

    event.preventDefault();
  };

  const onStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked && props.device) {
      setState(true);
    } else if (props.device) {
      setState(false);
    }
    console.log(state);
  };

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
                    name="deviceId"
                    value={props.device?.id}
                    disabled={true}
                    type="text"
                    label="Device Id"
                    id="deviceId"
                    className={classes.input}
                  />
                </Grid>
                <Grid container xs={12} justify="center" alignItems="center">
                  <FormControlLabel
                    control={
                      <Switch
                        color="primary"
                        checked={state}
                        onChange={onStateChange}
                      />
                    }
                    label="State"
                  />
                </Grid>
                <Grid container xs={12} justify="center" alignItems="center">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ color: 'white' }}
                  >
                    Update Device
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
