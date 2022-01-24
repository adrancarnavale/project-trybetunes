import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import LoadingElement from '../Components/LoadingElement';
import './Album.css';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      listOfMusics: [],
      favoriteSongs: [],
      artistName: '',
      albunName: '',
      albunImg: '',
      isLoading: false,
    };
  }

  componentDidMount = () => {
    this.searchForFavorites();
    this.searchForMusicList();
  };

  handleChanges = async ({ target }) => {
    const { listOfMusics } = this.state;
    const { checked, id } = target;
    const music = listOfMusics.find(
      (element, index) => element.trackId === Number(id) && index >= 1,
    );
    if (checked) {
      this.setState({ isLoading: true });
      await addSong(music);
      this.setState(this.searchForFavorites(), () => ({ isLoading: false }));
    } else {
      this.setState({ isLoading: true });
      await removeSong(music);
      this.setState(this.searchForFavorites(), () => ({ isLoading: false }));
    }
  };

  handleCheck = (id) => {
    const { favoriteSongs } = this.state;
    const result = favoriteSongs.some((song) => song === id);
    return result;
  };

  searchForFavorites = async () => {
    const { match: { params } } = this.props;
    this.setState({ isLoading: true });
    const result = await getFavoriteSongs(params.id);
    // Research: https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays
    const answer = [].concat(...result).map((music) => music.trackId);
    this.setState({
      favoriteSongs: [...answer],
      isLoading: false,
    });
  };

  searchForMusicList = async () => {
    const { match: { params } } = this.props;
    const response = await getMusics(params.id);
    this.setState({
      listOfMusics: [...response],
      artistName: response[0].artistName,
      albunName: response[0].collectionName,
      albunImg: response[0].artworkUrl100,
    });
  };

  render() {
    const {
      artistName,
      albunName, albunImg, listOfMusics, isLoading } = this.state;
    const pageElement = (
      <div className="album-container">
        <h1 data-testid="artist-name">{ artistName }</h1>
        <h2 data-testid="album-name">{ albunName }</h2>
        <img src={ albunImg } alt={ albunName } />
        {
          listOfMusics.filter((music) => music.trackId).map((music) => (
            <MusicCard
              key={ music.trackId }
              trackId={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              isChecked={ this.handleCheck(music.trackId) }
              handleChanges={ this.handleChanges }
            />
          ))
        }
      </div>
    );

    return (
      <div className="album-component-container">
        <Header />
        {
          isLoading ? <LoadingElement /> : pageElement
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Album;
