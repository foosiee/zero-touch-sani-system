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

export interface SignInFormState {
  email: string;
  password: string;
  error: Error | null;
  [x: string]: string | Error | null;
}
