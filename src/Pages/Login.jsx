import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { createUser } from '../services/userAPI';
import LoadingElement from '../Components/LoadingElement';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      isLogged: false,
      userName: '',
      isDisabled: true,
    };
  }

  handleChanges = ({ target }) => {
    const { value } = target;
    const MINIMUN_NAME_LENGTH_REQUIRED = 3;

    if (value.length >= MINIMUN_NAME_LENGTH_REQUIRED) {
      this.setState({
        isDisabled: false,
        userName: value,
      });
    } else {
      this.setState({
        isDisabled: true,
        userName: value,
      });
    }
  }

  handleSubmit = async () => {
    const { userName } = this.state;

    this.setState({ isLoading: true });
    await createUser({ name: userName });
    this.setState({ isLoading: false });
    this.setState({ isLogged: true });
  };

  render() {
    const { isDisabled, isLoading, isLogged } = this.state;

    return (
      isLogged ? <Redirect to="/search" /> : (
        <div data-testid="page-login">
          <form>
            <label htmlFor="userName">
              Name:
              <input
                data-testid="login-name-input"
                name="userName"
                type="text"
                onChange={ this.handleChanges }
              />
            </label>
            <button
              data-testid="login-submit-button"
              type="button"
              disabled={ isDisabled }
              onClick={ this.handleSubmit }
            >
              Entrar
            </button>
          </form>
          {isLoading ? <LoadingElement /> : null}
        </div>
      )
    );
  }
}

export default Login;
