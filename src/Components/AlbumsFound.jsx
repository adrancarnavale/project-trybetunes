import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumsFound extends Component {
  render() {
    const { albumsFound, artist } = this.props;
    return (
      albumsFound.length > 0 ? (
        <div>
          <p>{ `Resultado de álbuns de: ${artist}` }</p>
          <ul>
            {
              albumsFound.map((album) => (
                <li key={ album.collectionId }>
                  <h4>{ album.collectionName }</h4>
                  <img src={ album.artworkUrl100 } alt="" />
                  <Link
                    data-testid={ `link-to-album-${album.collectionId}` }
                    to={ `/album/${album.collectionId}` }
                  >
                    Album Page
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      ) : (<p>Nenhum álbum foi encontrado</p>)
    );
  }
}

AlbumsFound.propTypes = {
  albumsFound: PropTypes.arrayOf(PropTypes.object).isRequired,
  artist: PropTypes.string.isRequired,
};

export default AlbumsFound;
