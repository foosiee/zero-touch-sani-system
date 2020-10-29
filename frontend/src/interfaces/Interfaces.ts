import { Firebase } from '../utils/FirebaseInit';

export interface FirebaseComponentProps {
  firebase?: Firebase | undefined;
  [key: string]: any;
}

export interface FirebaseModalChild extends FirebaseComponentProps {
  open: boolean;
  closeCallback: () => void;
}

export interface SignUpFormModalProps extends FirebaseModalChild {}
export interface LoginFormModalProps extends FirebaseModalChild {}
export interface AddRoomModalProps extends FirebaseModalChild {
  addRoomIdCallback: (id: string) => void;
}

export interface AddDeviceModalProps extends FirebaseModalChild {
  addDeviceIdCallback: (id: string) => void;
  roomId: string;
}

export interface HeaderProps extends FirebaseComponentProps {}
export interface AppProps extends FirebaseComponentProps {}

export interface UserDocument {
  email: string;
  rooms?: string[];
}

export interface SignInFormState {
  email: string;
  password: string;
  error: Error | null;
  [x: string]: string | Error | null;
}

export interface FirebaseRoom {
  roomName: string;
  numberDevices: number;
  deviceIds: string[];
  id: string;
}
