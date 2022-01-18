import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingElement from './LoadingElement';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      userName: '',
    };
  }

  componentDidMount = () => {
    this.getLoggedUserName();
  }

  getLoggedUserName = async () => {
    this.setState({ isLoading: true });
    const userName = await getUser();
    this.setState({ userName: userName.name });
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading, userName } = this.state;
    return (
      <header data-testid="header-component">
        {
          isLoading
            ? <LoadingElement /> : <p data-testid="header-user-name">{ userName }</p>
        }
        <nav>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
