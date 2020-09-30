import app from 'firebase/app';
import 'firebase/auth';

import { firebaseConfig } from '../config/FirebaseConfig';

export class Firebase {
  auth: app.auth.Auth;
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
  }

  CreateUserWithEmail = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  SignInWithEmail = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);

  SignOut = () => this.auth.signOut();
}
