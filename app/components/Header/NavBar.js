import React from 'react';
import classNames from 'classnames';

import { scrollTo } from '../../utils/ui-methods';
import './NavBar.scss';

/* eslint-disable react/prefer-stateless-function */
class NavBar extends React.Component {
  state = {
    isMobileMenuOpen: false,
  };

  handleNavClick = e => scrollTo(e);

  handleMenuClick = e => {
    e.preventDefault();
    const { isMobileMenuOpen } = this.state;

    this.setState({
      isMobileMenuOpen: !isMobileMenuOpen,
    });
  };

  render() {
    const { isMobileMenuOpen } = this.state;

    return (
      <div className="navbar">
        <div className="wrapper">
          <a href="/" className="mob__menu" onClick={this.handleMenuClick}>
            <span className="mob__menu_line" />
            <span className="mob__menu_line" />
            <span className="mob__menu_line" />
          </a>
          <nav
            className={classNames(
              'nav',
              !isMobileMenuOpen && 'mobile_menu_closed',
            )}
          >
            <a
              href="/"
              className={classNames('mob__menu', 'active')}
              onClick={this.handleMenuClick}
            >
              <span className="mob__menu_line" />
              <span className="mob__menu_line" />
              <span className="mob__menu_line" />
            </a>
            <ul className="nav__list">
              <li className="nav__list_item">
                <a
                  href="/"
                  className="nav__list_link"
                  data-section="section_program"
                  onClick={this.handleNavClick}
                >
                  ПРОГРАММЫ ПИТАНИЯ
                </a>
              </li>
              <li className="nav__list_item">
                <a
                  href="/"
                  className="nav__list_link"
                  data-section="section_product"
                  onClick={this.handleNavClick}
                >
                  ДЕТОКС
                </a>
              </li>
              <li className="nav__list_item">
                <a
                  href="/"
                  className="nav__list_link"
                  data-section="section_sweets"
                  onClick={this.handleNavClick}
                >
                  СЛАДОСТИ
                </a>
              </li>
              <li className="nav__list_item">
                <a
                  href="/"
                  className="nav__list_link"
                  data-section="section_reviews"
                  onClick={this.handleNavClick}
                >
                  О НАС
                </a>
              </li>
              <li className="nav__list_item">
                <a
                  href="/"
                  className="nav__list_link"
                  data-section="section_reviews_slider"
                  onClick={this.handleNavClick}
                >
                  ОТЗЫВЫ
                </a>
              </li>
              <li className="nav__list_item">
                <a
                  href="/"
                  className="nav__list_link"
                  data-section="section_callback"
                  onClick={this.handleNavClick}
                >
                  КОНТАКТЫ
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default NavBar;
