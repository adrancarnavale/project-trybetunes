import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingElement from '../Components/LoadingElement';
import Header from '../Components/Header';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      userInfo: {},
    };
  }

  componentDidMount = () => {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    this.setState({ isLoading: true });
    const result = await getUser();
    this.setState(({ userInfo: result }), () => {
      this.setState({ isLoading: false });
    });
  };

  render() {
    const { isLoading, userInfo } = this.state;

    const userElement = (
      <>
        <p>
          { userInfo.name }
        </p>
        <p>
          { userInfo.email }
        </p>
        <img data-testid="profile-image" src={ userInfo.image } alt={ userInfo.name } />
        <p>
          { userInfo.description }
        </p>
      </>
    );

    return (
      <div data-testid="page-profile">
        <Header />
        {
          isLoading ? <LoadingElement /> : userElement
        }
        <nav>
          <Link to="/profile/edit">Editar perfil</Link>
        </nav>

      </div>
    );
  }
}

export default Profile;
