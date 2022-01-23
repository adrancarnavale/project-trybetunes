import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button, FloatingLabel } from 'react-bootstrap'
import { createUser } from '../services/userAPI';
import LoadingElement from '../Components/LoadingElement';
import './Login.css';

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
          <div className="header-container">
            <h1>Trybetunes</h1>
          </div>
          <Form className="formgroup-container">
            <Form.Group className="mb-3 form-container">
              <FloatingLabel
                label="Name:"
                controlId="floatingInput"
                className="mb-3"
              >
                <Form.Control
                  data-testid="login-name-input"
                  name="userName"
                  type="text"
                  onChange={ this.handleChanges }
                />
              </FloatingLabel>
              <Button
              variant="outline-secondary"
                data-testid="login-submit-button"
                type="button"
                disabled={ isDisabled }
                onClick={ this.handleSubmit }
              >
                Entrar
              </Button>
            </Form.Group>
          </Form>
          {isLoading ? <LoadingElement /> : null}
        </div>
      )
    );
  }
}

export default Login;
