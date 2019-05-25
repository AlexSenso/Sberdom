import React from 'react';
import { Helmet } from 'react-helmet';

import './Service.scss';

export default class Service extends React.Component {
  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Service</title>
          <meta
            name="description"
            content="Service"
          />
        </Helmet>
        <ul>
          <li className="box-item service-item-wrapper">
            <div className="service-item">
              <div className="service-item-title">Сантехника</div>
              <div className="service-item-description">
                Раковины, трубы, унитазы
              </div>
            </div>
          </li>
          <li className="box-item service-item-wrapper">
            <div className="service-item">
              <div className="service-item-title">Электрика</div>
              <div className="service-item-description">
                Лампочки, розетки, провода
              </div>
            </div>
          </li>
          <li className="box-item service-item-wrapper">
            <div className="service-item">
              <div className="service-item-title">Мастера по технике</div>
              <div className="service-item-description">
                Теливизор, стиральная машина, посудомойка
              </div>
            </div>
          </li>
        </ul>
        <ul>
          <li className="box-item service-item-wrapper">
            <div className="service-item">
              <div className="service-item-title">Скорую помощь</div>
              <div className="service-item-description">
                Инфаркты, передозы, простуда
              </div>
            </div>
          </li>
          <li className="box-item service-item-wrapper">
            <div className="service-item">
              <div className="service-item-title">Полицию</div>
              <div className="service-item-description">
                Шумные соседи, кражи и убийства, запрещенные мемасы
              </div>
            </div>
          </li>
          <li className="box-item service-item-wrapper">
            <div className="service-item">
              <div className="service-item-title">Пожарных</div>
              <div className="service-item-description">
                Пожар
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
