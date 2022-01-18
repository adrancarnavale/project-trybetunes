import React, { Component } from 'react';
import Header from '../Components/Header';
import LoadingElement from '../Components/LoadingElement';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumsFound from '../Components/AlbumsFound';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      artistInput: '',
      artist: '',
      isLoading: false,
      isLoaded: false,
      albunsFound: [],
    };
  }

  handleChanges = ({ target }) => {
    const { value } = target;
    if (value.length >= 2) {
      this.setState({
        isDisabled: false,
        artistInput: value,
      });
    } else {
      this.setState({
        isDisabled: true,
        artistInput: value,
      });
    }
  };

  handleClick = async () => {
    const { artistInput } = this.state;
    this.setState({ isLoading: true });
    this.setState({ artist: artistInput });
    const albums = await searchAlbumsAPI(artistInput);
    this.setState({ albunsFound: [...albums] });
    this.setState({ isLoading: false });
    this.setState({ isLoaded: true });
    this.setState({ artistInput: '' });
  };

  render() {
    const {
      isDisabled,
      artistInput,
      isLoading, isLoaded, albunsFound, artist } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {
          isLoading ? <LoadingElement /> : (
            <div>
              <label htmlFor="artistInput">
                <input
                  data-testid="search-artist-input"
                  name="artistInput"
                  type="text"
                  placeholder="Nome do Artista"
                  onChange={ this.handleChanges }
                  value={ artistInput }
                />
              </label>
              <button
                data-testid="search-artist-button"
                type="button"
                disabled={ isDisabled }
                onClick={ this.handleClick }
              >
                Pesquisar
              </button>
            </div>
          )
        }
        {
          (isLoaded && <AlbumsFound
            artist={ artist }
            albumsFound={ albunsFound }
          />)
        }
      </div>
    );
  }
}

export default Search;
