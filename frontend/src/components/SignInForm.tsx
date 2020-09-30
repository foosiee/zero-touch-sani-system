import React, { Component } from 'react';
import {
  FirebaseComponentProps,
  SignInFormState,
} from '../interfaces/Interfaces';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component<FirebaseComponentProps, SignInFormState> {
  constructor(props: FirebaseComponentProps) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { email, password } = this.state;

    this.props.firebase
      ?.SignInWithEmail(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        console.log(this.props.firebase?.auth.currentUser);
        this.props.history.push('/profile');
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export { SignInForm };
