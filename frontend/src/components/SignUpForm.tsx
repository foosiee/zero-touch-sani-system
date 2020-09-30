import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  FirebaseComponentProps,
  SignUpFormState,
} from '../interfaces/Interfaces';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpForm extends Component<FirebaseComponentProps, SignUpFormState> {
  constructor(props: FirebaseComponentProps) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { email, passwordOne } = this.state;

    this.props.firebase
      ? this.props.firebase
          .CreateUserWithEmail(email, passwordOne)
          .then(() => {
            this.setState({ ...INITIAL_STATE });
          })
          .catch((error: Error) => {
            this.setState({ error });
          })
      : console.log('Invalid Firebase');

    event.preventDefault();
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ [event.target.name]: event.target.value });

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to="/">Sign Up</Link>
  </p>
);

export { SignUpForm, SignUpLink };
