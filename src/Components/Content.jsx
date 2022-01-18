import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../Pages/Login';
import Search from '../Pages/Search';
import Album from '../Pages/Album';
import Favorites from '../Pages/Favorites';
import Profile from '../Pages/Profile';
import ProfileEdit from '../Pages/ProfileEdit';
import NotFound from '../Pages/NotFound';

class Content extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={ () => <Login /> } />
        <Route exact path="/search" render={ () => <Search /> } />
        <Route exact path="/album/:id" render={ (props) => <Album { ...props } /> } />
        <Route exact path="/favorites" render={ () => <Favorites /> } />
        <Route exact path="/profile" render={ () => <Profile /> } />
        <Route exact path="/profile/edit" render={ () => <ProfileEdit /> } />

        <Route exact path="*" render={ () => <NotFound /> } />
      </Switch>
    );
  }
}

export default Content;
