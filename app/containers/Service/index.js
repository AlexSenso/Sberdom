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
import slicesImg from './images/slices2.png';
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "../../components/Header/img/close.svg";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";

const menuItems = [
  'НОВЫЙ ВЫЗОВ',
  'АРХИВ ЗАЯВОК',
]

export default class Service extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeSlide: 0,
      isServiceForm: false,
      plumberValue: 'Из раковины вода не уходит',
      showNotification: false,
    };
  }

  onMenuClick = event => {
    event.preventDefault();
    this.setState({ activeSlide: parseInt(event.target.dataset.key) });
  };

  handleClose = e => {
    e.preventDefault();
    this.setState({ isServiceForm: false });
  };

  handleClick = e => {
    e.preventDefault();
    this.setState({isServiceForm: true});
  }

  handleClickCloseButton = e => {
    e.preventDefault();
    this.setState({ isServiceForm: false });
    this.setState({ showNotification: true });
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
        <div className={classNames("service-notification", this.state.showNotification && "active")}>
          <div>Заявка на вызов сантехника успешно отправлена 👍🏻</div>
        </div>
        <div className="service-lists">
          <ul className="service-list">
            <li onClick={this.handleClick} className="box-item service-item-wrapper">
              <div className="service-item">
                <div className="service-item-title-wrapper">
                  <img className="service-item-image" src={image1} alt="icon" />
                  <div className="service-item-title-1">Сантехник</div>
                </div>
                <div className="service-item-description">
                  Водоснабжение, отопление, канализация, смеситель
                </div>
                <div className="service-item-link" />
              </div>
            </li>
            <Dialog
              onClose={this.handleClose}
              open={this.state.isServiceForm}
              PaperProps={{
                className: 'popup',
                style: {
                  maxWidth: '100%',
                  marginLeft: '0',
                  marginRight: '0',
                },
              }}
            >
              <DialogTitle>
                <a href="/" className="close" onClick={this.handleClose}>
                  <img src={CloseIcon} alt="close" className="close_img" />
                </a>
              </DialogTitle>
              <DialogContent>
                <div>
                  <form className="request-form">
                    <div>
                      <div><label className="service-field-label">Опишите проблему</label></div>
                      <textarea defaultValue={this.state.plumberValue} style={{width: 603, height: 120}} />
                    </div>
                    <div className="add-photo-field service-field-wrapper">
                      <div><label className="service-field-label">Приложите фотографии</label></div>
                      <img className="service-field-image" src={slicesImg} alt="icon" />
                      {/*<input type="file" name="photo" multiple />*/}
                    </div>
                    <div className="service-field-wrapper">
                      <div><label className="service-field-label">Когда удобно?</label></div>
                      <div className="service-checkbox-wrappers">
                        <div className="service-checkbox-wrapper">
                          <input id="1" type="checkbox" />
                          <label className="service-checkbox-label" htmlFor="1">Утром</label>
                        </div>
                        <div className="service-checkbox-wrapper">
                          <input id="2" type="checkbox" />
                          <label className="service-checkbox-label" htmlFor="2">Днём</label>
                        </div>
                        <div className="service-checkbox-wrapper">
                          <input id="3" type="checkbox" />
                          <label className="service-checkbox-label" htmlFor="3">Вечером</label>
                        </div>
                      </div>
                    </div>
                    <button onClick={this.handleClickCloseButton} className="service-form-button">ОТПРАВИТЬ ЗАЯВКУ</button>
                  </form>
                </div>
              </DialogContent>
            </Dialog>
            <li className="box-item service-item-wrapper">
              <div className="service-item">
                <div className="service-item-title-wrapper">
                  <img className="service-item-image" src={image2} alt="icon" />
                  <div className="service-item-title-1">Электрик</div>
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
                  <div className="service-item-title-1">Мастер по технике</div>
                </div>
                <div className="service-item-description">
                  Телевизор, стиральная машина, микроволновка, посудомойка
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
                  <div className="service-item-title-1">Скорая помощь</div>
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
                  <div className="service-item-title-1">Полиция</div>
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
                  <div className="service-item-title-1">Пожарные</div>
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
