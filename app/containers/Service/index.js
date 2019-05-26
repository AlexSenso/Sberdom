import React from 'react';
import { Helmet } from 'react-helmet';

import './Service.scss';
import classNames from 'classnames';
import _ from 'lodash';
import image1 from './images/1.png';
import image2 from './images/copy-2.png';
import image3 from './images/copy-4.png';
import image4 from './images/2.png';
import image5 from './images/copy.png';
import image6 from './images/copy-3.png';

const menuItems = [
  'НОВЫЙ ВЫЗОВ',
  'АРХИВ ЗАЯВОК',
]

export default class Service extends React.Component {

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
      <div className="service-page">
        <Helmet>
          <title>Service</title>
          <meta
            name="description"
            content="Service"
          />
        </Helmet>
        <ul className="service-menu">
          {_.map(menuItems, (item, key) => (
            <li
              key={key}
              className={classNames([
                'service-menu-item',
                { active: this.state.activeSlide === key },
              ])}
              onClick={this.onMenuClick}
              data-key={key}
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="service-lists">
          <ul className="service-list">
            <li className="box-item service-item-wrapper">
              <div className="service-item">
                <div className="service-item-title-wrapper">
                  <img className="service-item-image" src={image1} alt="icon" />
                  <div className="service-item-title">Сантехник</div>
                </div>
                <div className="service-item-description">
                  Водоснабжение, отопление, канализация, смеситель
                </div>
                <div className="service-item-link" />
              </div>
            </li>
            <li className="box-item service-item-wrapper">
              <div className="service-item">
                <div className="service-item-title-wrapper">
                  <img className="service-item-image" src={image2} alt="icon" />
                  <div className="service-item-title">Электрик</div>
                </div>
                <div className="service-item-description">
                  Осветительные приборы, электропроводка, розетки и выключатели
                </div>
                <div className="service-item-link" />
              </div>
            </li>
            <li className="box-item service-item-wrapper">
              <div className="service-item">
                <div className="service-item-title-wrapper">
                  <img className="service-item-image" src={image3} alt="icon" />
                  <div className="service-item-title">Мастер по технике</div>
                </div>
                <div className="service-item-description">
                  Теливизор, стиральная машина, микроволновка, посудомойка
                </div>
                <div className="service-item-link" />
              </div>
            </li>
          </ul>
          <ul className="service-list">
            <li className="box-item service-item-wrapper">
              <div className="service-item">
                <div className="service-item-title-wrapper">
                  <img className="service-item-image" src={image4} alt="icon" />
                  <div className="service-item-title">Скорая помощь</div>
                </div>
                <div className="service-item-description">
                  Несчастный случай, травма или обострение хронического заболевания
                </div>
                <div className="service-item-link" />
              </div>
            </li>
            <li className="box-item service-item-wrapper">
              <div className="service-item">
                <div className="service-item-title-wrapper">
                  <img className="service-item-image" src={image5} alt="icon" />
                  <div className="service-item-title">Полиция</div>
                </div>
                <div className="service-item-description">
                  Поддержание порядка, предотвращение преступлений и других правонарушений
                </div>
                <div className="service-item-link" />
              </div>
            </li>
            <li className="box-item service-item-wrapper">
              <div className="service-item">
                <div className="service-item-title-wrapper">
                  <img className="service-item-image" src={image6} alt="icon" />
                  <div className="service-item-title">Пожарные</div>
                </div>
                <div className="service-item-description">
                  Задымление, пожар
                </div>
                <div className="service-item-link" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
