import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { trackId, trackName, previewUrl, isChecked, handleChanges } = this.props;

    const content = (
      <div>
        <h4>{ trackName }</h4>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label
          htmlFor={ trackId }
        >
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id={ trackId }
            checked={ isChecked }
            onChange={ handleChanges }
          />
        </label>
      </div>
    );

    return (
      <div>
        { content }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  handleChanges: PropTypes.func.isRequired,
};

export default MusicCard;
