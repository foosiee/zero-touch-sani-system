import React, { Component } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { withFirebase } from '../../components/FirebaseContext';
import { Header } from '../../components/Header';
import {
  FirebaseComponentProps,
  FirebaseRoom,
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

const FirebaseHeader = withFirebase(Header);
const FirebaseAddDeviceModal = withFirebase(AddDeviceModal);

interface UrlParam {
  id: string;
}

type RoomPageProps = RouteComponentProps<UrlParam> & FirebaseComponentProps;

interface RoomPageState {
  room?: FirebaseRoom;
  modalOpen: boolean;
  verified: boolean;
}

export class RoomPage extends Component<RoomPageProps, RoomPageState> {
  constructor(props: RoomPageProps) {
    super(props);
    this.state = { modalOpen: false, verified: true };

    this.openAddDeviceModal = this.openAddDeviceModal.bind(this);
    this.closeAddDeviceModal = this.closeAddDeviceModal.bind(this);
    this.addDeviceId = this.addDeviceId.bind(this);
  }

  async componentDidMount() {
    const userDocument = await this.props.firebase?.GetUserFirestoreDocument();
    const roomId = this.props.match.params.id;
    console.log(roomId, userDocument?.rooms);
    if (userDocument?.rooms?.includes(roomId)) {
      const room = await this.props.firebase?.GetRoom(roomId);
      this.setState({ room });
    } else {
      this.setState({ verified: false });
    }
  }

  private openAddDeviceModal() {
    this.setState({ modalOpen: true });
  }

  private closeAddDeviceModal() {
    this.setState({ modalOpen: false });
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
                <div>has devices</div>
              )}
            </Box>
          </Container>
          <FirebaseAddDeviceModal
            open={this.state.modalOpen}
            closeCallback={this.closeAddDeviceModal}
            addDeviceIdCallback={this.addDeviceId}
            roomId={this.props.match.params.id}
          />
        </MuiThemeProvider>
      </>
    );
  }
}
