import app from 'firebase/app';
import 'firebase/auth';

import { firebaseConfig } from '../config/FirebaseConfig';
import { authState } from 'rxfire/auth';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class Firebase {
  private auth: app.auth.Auth;
  private auth$: Observable<app.User>;

  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.auth$ = authState(this.auth);
  }

  CreateUserWithEmail = (email: string, password: string) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  };

  SignInWithEmail = (email: string, password: string) => {
    return this.auth
      .setPersistence(app.auth.Auth.Persistence.LOCAL)
      .then(() => this.auth.signInWithEmailAndPassword(email, password));
  };

  GetUser$ = () => {
    return this.auth$.pipe(filter((user) => user !== null));
  };

  GetCurrentUser = () => {
    return this.auth.currentUser;
  };

  SignOut = () => this.auth.signOut();
}

export type FirebaseUser = app.User;
