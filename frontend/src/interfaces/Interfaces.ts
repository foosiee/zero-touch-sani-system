import { Firebase } from '../utils/FirebaseInit';

export interface FirebaseComponentProps {
  firebase?: Firebase | null;
  [key: string]: any;
}

export interface FirebaseModalChild extends FirebaseComponentProps {
  open: boolean;
  closeCallback: () => void;
}

export interface SignUpFormModalProps extends FirebaseModalChild {}
export interface LoginFormModalProps extends FirebaseModalChild {}
export interface AddRoomModalProps extends FirebaseModalChild {}
export interface HeaderProps extends FirebaseComponentProps {}
export interface AppProps extends FirebaseComponentProps {}

export interface UserDocument {
  email: string;
  roomIds?: string[];
}

export interface SignInFormState {
  email: string;
  password: string;
  error: Error | null;
  [x: string]: string | Error | null;
}
