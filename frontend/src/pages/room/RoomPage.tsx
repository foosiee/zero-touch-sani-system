import React, { Component } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { withFirebase } from '../../components/FirebaseContext';
import { Header } from '../../components/Header';
import {
  FirebaseComponentProps,
  FirebaseRoom,
  FirebaseDevice,
} from '../../interfaces/Interfaces';
import Box from '@material-ui/core/Box';
import {
  Container,
  MuiThemeProvider,
  Toolbar,
  Typography,
  Fab,
  Tooltip,
  Button,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { SiteTheme } from '../../utils/Theme';
import { AddDeviceModal } from '../../components/AddDeviceModal';
import { EditDeviceModal } from '../../components/EditDeviceModal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const FirebaseHeader = withFirebase(Header);
const FirebaseAddDeviceModal = withFirebase(AddDeviceModal);
const FirebaseEditDeviceModal = withFirebase(EditDeviceModal);

interface UrlParam {
  id: string;
}

type RoomPageProps = RouteComponentProps<UrlParam> & FirebaseComponentProps;

interface RoomPageState {
  room?: FirebaseRoom;
  devices: (FirebaseDevice | undefined)[];
  addModalOpen: boolean;
  editModalOpen: boolean;
  verified: boolean;
  selectedDevice?: FirebaseDevice;
}

export class RoomPage extends Component<RoomPageProps, RoomPageState> {
  constructor(props: RoomPageProps) {
    super(props);
    this.state = {
      addModalOpen: false,
      verified: true,
      devices: [],
      editModalOpen: false,
    };

    this.openAddDeviceModal = this.openAddDeviceModal.bind(this);
    this.closeAddDeviceModal = this.closeAddDeviceModal.bind(this);
    this.openEditDeviceModal = this.openEditDeviceModal.bind(this);
    this.closeEditDeviceModal = this.closeEditDeviceModal.bind(this);
    this.updateDevice = this.updateDevice.bind(this);
    this.addDeviceId = this.addDeviceId.bind(this);
  }

  async componentDidMount() {
    const userDocument = await this.props.firebase?.GetUserFirestoreDocument();
    const roomId = this.props.match.params.id;
    console.log(roomId, userDocument?.rooms);
    if (userDocument?.rooms?.includes(roomId)) {
      const room = await this.props.firebase?.GetRoom(roomId);
      if (room?.deviceIds.length) {
        const devices = (
          await Promise.all(
            room.deviceIds.map((id) => this.props.firebase?.GetDevice(id))
          )
        ).filter((device) => device);
        this.setState({ devices });
        console.log(devices);
      }
      this.setState({ room });
    } else {
      this.setState({ verified: false });
    }
  }

  private openEditDeviceModal(device: FirebaseDevice | undefined) {
    if (device) {
      console.log('Selected device' + JSON.stringify(device));
      this.setState({ selectedDevice: device });
      this.setState({ editModalOpen: true });
    }
  }

  private closeEditDeviceModal() {
    this.setState({ selectedDevice: undefined, editModalOpen: false });
  }

  private openAddDeviceModal() {
    this.setState({ addModalOpen: true });
  }

  private closeAddDeviceModal() {
    this.setState({ addModalOpen: false });
  }

  private updateDevice(device: FirebaseDevice) {
    const devices = this.state.devices;
    const idx = devices.findIndex((d) => d?.id === device.id);
    if (idx >= 0) {
      devices[idx] = device;
      this.setState({ devices });
    }
  }

  private addDeviceId() {}

  render() {
    return (
      <>
        {this.state.verified ? undefined : <Redirect to={{ pathname: '/' }} />}
        <FirebaseHeader />
        <MuiThemeProvider theme={SiteTheme}>
          <Container maxWidth="lg" fixed>
            <Box m={2} boxShadow={3} height={500}>
              <Box boxShadow={1}>
                <Toolbar>
                  <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Devices
                  </Typography>
                  <Tooltip title="Add Device">
                    <Fab
                      color="primary"
                      size="small"
                      onClick={this.openAddDeviceModal}
                    >
                      <AddIcon color="secondary" />
                    </Fab>
                  </Tooltip>
                </Toolbar>
              </Box>
              {!!!this.state.room?.deviceIds.length ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="85%"
                  flexDirection="column"
                >
                  <Typography variant="h6">
                    You have not created any devices.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.openAddDeviceModal}
                  >
                    Add Device
                  </Button>
                </Box>
              ) : (
                <>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Device Id</TableCell>
                          <TableCell align="right">State</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.devices.map((device) => (
                          <TableRow
                            onClick={() => this.openEditDeviceModal(device)}
                            key={device?.id}
                          >
                            <TableCell component="th" scope="row">
                              {device?.id}
                            </TableCell>
                            <TableCell align="right">{device?.state}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
            </Box>
          </Container>
          <FirebaseAddDeviceModal
            open={this.state.addModalOpen}
            closeCallback={this.closeAddDeviceModal}
            addDeviceIdCallback={this.addDeviceId}
            roomId={this.props.match.params.id}
          />
          <FirebaseEditDeviceModal
            open={this.state.editModalOpen}
            closeCallback={this.closeEditDeviceModal}
            editCallback={this.updateDevice}
            device={this.state.selectedDevice}
          />
        </MuiThemeProvider>
      </>
    );
  }
}
