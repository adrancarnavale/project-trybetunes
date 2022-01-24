import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import LoadingElement from '../Components/LoadingElement';
import Header from '../Components/Header';
import './ProfileEdit.css';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      isLoading: false,
      userName: '',
      userEmail: '',
      userImage: '',
      userDescription: '',
    };
  }

  componentDidMount = () => {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    this.setState({ isLoading: true });
    const result = await getUser();
    this.setState(({
      userName: result.name,
      userEmail: result.email,
      userImage: result.image,
      userDescription: result.description,
    }), () => {
      this.setState({ isLoading: false });
    });
  };

  handleChanges = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  checkButton = () => {
    const MIN_LENGTH_REQUIRED = 1;
    // Research: https://regexr.com/3e48o
    const EMAIL_VALIDATION = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const { userName, userEmail, userImage, userDescription } = this.state;

    if (userName.length < MIN_LENGTH_REQUIRED) return true;
    if (userEmail.length < MIN_LENGTH_REQUIRED) return true;
    if (userImage.length < MIN_LENGTH_REQUIRED) return true;
    if (userDescription.length < MIN_LENGTH_REQUIRED) return true;
    if (!userEmail.match(EMAIL_VALIDATION)) return true;
    return false;
  };

  handleClick = async () => {
    const { userName, userEmail, userImage, userDescription } = this.state;
    this.setState({ isLoading: true });
    await updateUser({
      name: userName,
      email: userEmail,
      image: userImage,
      description: userDescription,
    });
    this.setState({
      isLoading: false,
      redirect: true,
    });
  };

  render() {
    const {
      isLoading, userName, userEmail, userImage, userDescription, redirect } = this.state;

    const profileEditComponent = (
      <form className="profile-edit-form">
        <label htmlFor="username">
          Nome:
          <input
            data-testid="edit-input-name"
            name="userName"
            value={ userName }
            type="text"
            onChange={ this.handleChanges }
          />
        </label>
        <label htmlFor="userEmail">
          Email:
          <input
            data-testid="edit-input-email"
            name="userEmail"
            value={ userEmail }
            type="email"
            onChange={ this.handleChanges }
          />
        </label>
        <label htmlFor="userEmail">
          Descrição:
          <textarea
            data-testid="edit-input-description"
            name="userDescription"
            value={ userDescription }
            onChange={ this.handleChanges }
            cols="30"
            rows="10"
          />
        </label>
        <label htmlFor="userImage">
          Foto:
          <input
            data-testid="edit-input-image"
            type="text"
            name="userImage"
            value={ userImage }
            onChange={ this.handleChanges }
          />
        </label>
        <button
          variant="sucess"
          className="form-button"
          data-testid="edit-button-save"
          type="submit"
          disabled={ this.checkButton() }
          onClick={ this.handleClick }
        >
          Salvar
        </button>
      </form>
    );

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          isLoading ? <LoadingElement /> : profileEditComponent
        }
        {
          redirect ? <Redirect to="/profile" /> : null
        }
      </div>
    );
  }
}

export default ProfileEdit;
