import React, { Component } from 'react';
import './LoadingElement.css';

class LoadingElement extends Component {
  render() {
    return (
      <div className="loading-container">
        <p className="loading-element">Carregando...</p>
      </div>
    );
  }
}

export default LoadingElement;
