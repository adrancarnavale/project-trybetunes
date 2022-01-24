import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingElement from '../Components/LoadingElement';
import Header from '../Components/Header';
import './Profile.css';

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
      <div className="user-infos-container">
        <p>
          Nome:
          <spam>
            { userInfo.name }
          </spam>          
        </p>
        <p>
          Email:
          <spam>
            { userInfo.email }
          </spam>
        </p>
        <img data-testid="profile-image" src={ userInfo.image } alt={ userInfo.name } />
        <p>
          Descrição:
          <spam>
            { userInfo.description }
          </spam>
        </p>
      </div>
    );

    return (
      <div data-testid="page-profile">
        <Header />
        {
          isLoading ? <LoadingElement /> : userElement
        }
        <nav>
          <Link className="edit-profile-link" to="/profile/edit">Editar perfil</Link>
        </nav>

      </div>
    );
  }
}

export default Profile;
