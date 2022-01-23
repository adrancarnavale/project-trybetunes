import React, { Component } from 'react';
import Header from '../Components/Header';
import LoadingElement from '../Components/LoadingElement';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumsFound from '../Components/AlbumsFound';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import './Search.css';

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
            <div className="component-container">
              <div className="artist-input-container">
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">Artista</InputGroup.Text>
                  <FormControl
                    placeholder="Nome do Artista"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={ this.handleChanges }
                    value={ artistInput }
                  />
                </InputGroup>
              </div>
              <Button
                className="artist-search-button"
                variant="secondary"
                size="lg"
                data-testid="search-artist-button"
                type="button"
                disabled={ isDisabled }
                onClick={ this.handleClick }
              >
                Pesquisar
              </Button>
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
