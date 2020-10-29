import React, { Component } from 'react';
import { withFirebase } from '../../components/FirebaseContext';
import { Header } from '../../components/Header';
import { AddRoomModal } from '../../components/AddRoomModal';
import {
  FirebaseComponentProps,
  UserDocument,
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
  Grid,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { SiteTheme } from '../../utils/Theme';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const FirebaseHeader = withFirebase(Header);
const FirebaseAddRoomModal = withFirebase(AddRoomModal);

interface RoomState {
  userDocument?: UserDocument;
  addRoomOpen: boolean;
  rooms: (FirebaseRoom | undefined)[];
  gettingRooms: boolean;
}

type RoomPageProps = FirebaseComponentProps & RouteComponentProps;

class RoomsPageBase extends Component<RoomPageProps, RoomState> {
  constructor(props: RoomPageProps) {
    super(props);
    this.state = {
      addRoomOpen: false,
      rooms: [],
      gettingRooms: false,
    };

    this.openAddRoomModal = this.openAddRoomModal.bind(this);
    this.closeAddRoomModal = this.closeAddRoomModal.bind(this);
    this.addRoomId = this.addRoomId.bind(this);
  }

  async componentDidMount() {
    const userDocument = await this.props.firebase?.GetUserFirestoreDocument();
    console.log(userDocument);
    this.setState({ userDocument: userDocument });
    if (userDocument?.rooms) {
      this.setState({ gettingRooms: true });
      const rooms = (
        await Promise.all(
          userDocument?.rooms?.map((id) => this.props.firebase?.GetRoom(id))
        )
      ).filter((room) => room);

      this.setState({ rooms, gettingRooms: false });
    }
  }

  private openAddRoomModal() {
    console.log(this.state);
    this.setState({ addRoomOpen: true });
  }

  private closeAddRoomModal() {
    console.log(this.state);
    this.setState({ addRoomOpen: false });
  }

  private addRoomId(id: string) {
    const user = this.state.userDocument;
    user?.rooms?.push(id);
    this.setState({ userDocument: user });

    this.props.firebase?.GetRoom(id).then((room) => {
      const rooms = this.state.rooms;
      rooms.push(room);
      this.setState({ rooms });
    });
  }

  private handleRoomClick(id: string | undefined) {
    console.log(id);
    this.props.history.push(`/rooms/${id}`);
  }

  render() {
    return (
      <>
        <FirebaseHeader />
        <MuiThemeProvider theme={SiteTheme}>
          <Container maxWidth="lg" fixed>
            <Box m={2} boxShadow={3} height={500}>
              <Box boxShadow={1}>
                <Toolbar>
                  <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Rooms
                  </Typography>
                  <Tooltip title="Add Room">
                    <Fab
                      color="primary"
                      size="small"
                      onClick={this.openAddRoomModal}
                    >
                      <AddIcon color="secondary" />
                    </Fab>
                  </Tooltip>
                </Toolbar>
              </Box>
              {!!!this.state.userDocument?.rooms?.length ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="85%"
                  flexDirection="column"
                >
                  <Typography variant="h6">
                    You have not created any rooms.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.openAddRoomModal}
                  >
                    Add Room
                  </Button>
                </Box>
              ) : !this.state.gettingRooms ? (
                <>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Room Name</TableCell>
                          <TableCell align="right">Total Devices</TableCell>
                          <TableCell align="right">Devices Reporting</TableCell>
                          <TableCell align="right">Last Time</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.rooms.map((room) => (
                          <TableRow
                            onClick={() => this.handleRoomClick(room?.id)}
                            key={room?.id}
                          >
                            <TableCell component="th" scope="row">
                              {room?.roomName}
                            </TableCell>
                            <TableCell align="right">
                              {room?.deviceIds.length}
                            </TableCell>
                            <TableCell align="right">0</TableCell>
                            <TableCell align="right">0</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              ) : (
                <CircularProgress />
              )}
            </Box>
          </Container>
          <FirebaseAddRoomModal
            open={this.state.addRoomOpen}
            closeCallback={this.closeAddRoomModal}
            addRoomIdCallback={this.addRoomId}
          />
        </MuiThemeProvider>
      </>
    );
  }
}

export const RoomsPage = withRouter(RoomsPageBase);
