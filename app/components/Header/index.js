import React from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';

import WeekMenu from '../WeekMenu';

import Action from './Action';
import NavBar from './NavBar';
import { scrollTo } from '../../utils/ui-methods';

import './Header.scss';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  state = {
    isModalOpen: false,
  };

  handleProgramClick = e => scrollTo(e);

  openModal = e => {
    e.preventDefault();
    this.setState({ isModalOpen: true });
  };

  closeModal = e => {
    e.preventDefault();
    this.setState({ isModalOpen: false });
  };

  render() {
    const settings = {
      dots: true,
      arrows: false,
      infinite: true,
      speed: 600,
      cssEase: 'linear',
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2800,
    };

    return (
      <div>
        <Action />
        <NavBar />

        <header className="header">
          <Slider className="header__slider" {...settings}>
            <div className={classNames(['header__slide', 'slider-image-1'])}>
              <div className="header__slider_info">
                <div className="wrapper">
                  <div className="header__block">
                    <div className="header__title">
                      <p className="header__title_text">
                        Доставляем женщинам удовольствие от правильного питания
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="wrapper">
                <a
                  href="/"
                  className="btn"
                  data-section="section_program"
                  onClick={this.handleProgramClick}
                >
                  Выбрать программу питания
                </a>
              </div>
            </div>
            <div className={classNames(['header__slide', 'slider-image-2'])}>
              <div className="header__slider_info">
                <div className="wrapper">
                  <div className="header__block">
                    <div className="header__title">
                      <p className="header__title_text">
                        Наша миссия
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="wrapper">
                <a
                  href="/"
                  className="btn"
                  data-section="section_program"
                  onClick={this.openModal}
                >
                  Посмотреть меню недели
                </a>
              </div>
            </div>
          </Slider>
          <WeekMenu
            isOpen={this.state.isModalOpen}
            closeModal={this.closeModal}
          />
        </header>
      </div>
    );
  }
}

export default Header;
