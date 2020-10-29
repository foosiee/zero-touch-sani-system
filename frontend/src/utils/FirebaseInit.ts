import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { firebaseConfig } from '../config/FirebaseConfig';
import { authState } from 'rxfire/auth';
import { Observable } from 'rxjs';
import { FirebaseRoom, UserDocument } from '../interfaces/Interfaces';

export class Firebase {
  private readonly auth: app.auth.Auth;
  private readonly auth$: Observable<app.User>;
  private readonly db: app.firestore.Firestore;

  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.auth$ = authState(this.auth);
    this.db = app.firestore();
  }

  CreateUserWithEmail = (email: string, password: string) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  };

  SignInWithEmail = async (email: string, password: string) => {
    await this.auth.setPersistence(app.auth.Auth.Persistence.LOCAL);
    return await this.auth.signInWithEmailAndPassword(email, password);
  };

  CreateDevice = async (id: string, roomId: string) => {
    await this.db.collection('/devices').doc(id).set({
      room: roomId,
    });
    return id;
  };

  CreateRoom = async (roomName: string) => {
    const res = await this.db.collection('/rooms').add({
      roomName: roomName,
      numberDevices: 0,
      deviceIds: [],
    });
    return res.id;
  };

  AddRoomIdToUser = async (roomId: string) => {
    return await this.db
      .collection('/users')
      .doc(this.auth.currentUser?.uid)
      .update({
        rooms: app.firestore.FieldValue.arrayUnion(roomId),
      });
  };

  AddDeviceIdToRoom = async (deviceId: string, roomId: string) => {
    return await this.db
      .collection('/rooms')
      .doc(roomId)
      .update({
        deviceIds: app.firestore.FieldValue.arrayUnion(deviceId),
      });
  };

  GetRoom = async (roomId: string) => {
    const roomDoc = await this.db.collection('/rooms').doc(roomId).get();
    const room = roomDoc.data() as FirebaseRoom;
    room.id = roomId;
    return room;
  };

  GetUser$ = () => {
    return this.auth$;
  };

  GetCurrentUser = () => {
    return this.auth.currentUser;
  };

  GetUserFirestoreDocument = async () => {
    const user = await this.db
      .collection('/users')
      .doc(this.auth.currentUser?.uid)
      .get();
    return user.data() as UserDocument;
  };

  SignOut = () => this.auth.signOut();
}

export type FirebaseUser = app.User;
