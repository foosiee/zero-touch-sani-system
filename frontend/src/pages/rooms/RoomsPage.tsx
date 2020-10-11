import React, { Component } from 'react';
import { withFirebase } from '../../components/FirebaseContext';
import { Header } from '../../components/Header';
import { AddRoomModal } from '../../components/AddRoomModal';
import {
  FirebaseComponentProps,
  UserDocument,
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

const FirebaseHeader = withFirebase(Header);
const FirebaseAddRoomModal = withFirebase(AddRoomModal);

interface RoomState {
  userDocument?: UserDocument;
  addRoomOpen: boolean;
}

export class RoomsPage extends Component<FirebaseComponentProps, RoomState> {
  constructor(props: FirebaseComponentProps) {
    super(props);
    this.state = {
      addRoomOpen: false,
    };

    this.openAddRoomModal = this.openAddRoomModal.bind(this);
    this.closeAddRoomModal = this.closeAddRoomModal.bind(this);
  }

  async componentDidMount() {
    const userDocument = await this.props.firebase?.GetUserFirestoreDocument();
    console.log(userDocument);
    this.setState({ userDocument: userDocument });
  }

  private openAddRoomModal() {
    console.log(this.state);
    this.setState({ addRoomOpen: true });
  }

  private closeAddRoomModal() {
    console.log(this.state);
    this.setState({ addRoomOpen: false });
  }

  render() {
    return (
      <>
        <FirebaseHeader />
        <MuiThemeProvider theme={SiteTheme}>
          <Container maxWidth="lg" fixed>
            <Box boxShadow={3} height={500}>
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
              {!!!this.state.userDocument?.roomIds?.length ? (
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
              ) : (
                <div>has rooms</div>
              )}
            </Box>
          </Container>
          <FirebaseAddRoomModal
            open={this.state.addRoomOpen}
            closeCallback={this.closeAddRoomModal}
          />
        </MuiThemeProvider>
      </>
    );
  }
}
