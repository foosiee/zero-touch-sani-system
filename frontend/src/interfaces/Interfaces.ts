import { Firebase } from '../utils/FirebaseInit';

export interface FirebaseComponentProps {
  firebase?: Firebase | null;
  [key: string]: any;
}

export interface SignUpFormState {
  username: string;
  email: string;
  passwordOne: string;
  passwordTwo: string;
  error: Error | null;
  [x: string]: string | Error | null;
}

export interface SignInFormState {
  email: string;
  password: string;
  error: Error | null;
  [x: string]: string | Error | null;
}
