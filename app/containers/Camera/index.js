import React from 'react';

import './Camera.scss';

export default class Camera extends React.Component {

  render() {
    return (
      <div className="camera-page">
        <div className="video-list">
          <div className="video-wrapper">
            <img
              alt=""
              height="262"
              width="350"
              src="http://proxy70.remot3.it:34582"
            />
            <div>
              <div className="video-title">Двор</div>
              <div className="video-description">Ленинградский проспект 32</div>
            </div>
          </div>
          <div className="video-wrapper">
            <img
              alt=""
              height="262"
              width="350"
              src="http://proxy70.remot3.it:34587"
            />
            <div>
              <div className="video-title">Детская площадка</div>
              <div className="video-description">Ленинградский проспект 32</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
