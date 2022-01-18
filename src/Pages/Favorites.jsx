import React, { Component } from 'react';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Header from '../Components/Header';
import LoadingElement from '../Components/LoadingElement';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      favorites: [],
    };
  }

  componentDidMount = () => {
    this.mountFavoriteSongsStates();
  }

  favoriteSongs = async () => {
    const result = await getFavoriteSongs();
    // Research: https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays
    const answer = [].concat(...result);
    return answer;
  };

  mountFavoriteSongsStates = async () => {
    this.setState({ isLoading: true });
    const foundSongs = await this.favoriteSongs();
    this.setState({ favorites: [...foundSongs] });
    this.setState({ isLoading: false });
  };

  handleChanges = async ({ target }) => {
    const { favorites } = this.state;
    const music = favorites.find(
      (element) => element.trackId === Number(target.id),
    );
    this.setState({ isLoading: true });
    await removeSong(music);
    this.setState(this.mountFavoriteSongsStates(), () => ({ isLoading: false }));
  };

  render() {
    const { isLoading, favorites } = this.state;

    const favoriteSongsElement = (
      favorites.map((music) => (
        <MusicCard
          key={ Number(music.trackId) }
          trackId={ Number(music.trackId) }
          trackName={ music.trackName }
          previewUrl={ music.previewUrl }
          isChecked
          handleChanges={ this.handleChanges }
        />
      ))
    );
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          isLoading ? <LoadingElement /> : favoriteSongsElement
        }
      </div>
    );
  }
}

export default Favorites;
