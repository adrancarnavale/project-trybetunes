import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingElement from './LoadingElement';
import './Header.css'

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
            ? <LoadingElement /> : (
              <div className="user-name-container">
                <p className="user-name">{ userName }</p>
              </div>
            )
        }
        <nav>
          <div className="links-container">
            <div>
              <Link className="link" data-testid="link-to-search" to="/search">Search</Link>
            </div>
            <div>
              <Link className="link" data-testid="link-to-favorites" to="/favorites">Favorites</Link>
            </div>
            <div>
              <Link className="link" data-testid="link-to-profile" to="/profile">Profile</Link>
            </div>           
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
