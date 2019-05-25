import React from 'react';

const menuItems = [
  'СЕЙЧАС',
  'АРХИВ ЗА 7 ДНЕЙ',
]

import './Camera.scss';
import _ from 'lodash';
import classNames from 'classnames';

export default class Camera extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSlide: 0,
    };
  }

  onMenuClick = event => {
    event.preventDefault();
    this.setState({ activeSlide: parseInt(event.target.dataset.key) });
  };

  render() {
    return (
      <div className="camera-page">
        <ul className="camera-menu">
          {_.map(menuItems, (item, key) => (
            <li
              key={key}
              className={classNames([
                'camera-menu-item',
                { active: this.state.activeSlide === key },
              ])}
              onClick={this.onMenuClick}
              data-key={key}
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="video-list">
          <div className="video-wrapper">
            <div className="img-wrapper">
              <img
                alt=""
                height="262"
                width="350"
                src="http://18.188.91.108/cam1"
              />
              <div className="video-icon">• LIVE</div>
            </div>
            <div>
              <div className="video-title">Двор</div>
              <div className="video-description">Ленинградский проспект 32</div>
            </div>
          </div>
          <div className="video-wrapper">
            <div className="img-wrapper">
              <img
                alt=""
                height="262"
                width="350"
                src="http://18.188.91.108/cam2"
              />
              <div className="video-icon">• LIVE</div>
            </div>
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
