import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

import './LeftSidebar.scss';

export class LeftSidebar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fixed: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    const topPosition = document.getElementById("menu").getBoundingClientRect('top').y
    if (topPosition >= 0) {
      this.setState({ fixed: false });
    } else {
      this.setState({ fixed: true });
    }
  }

  render() {
    const { onClick, items, activeSlide } = this.props;

    return (
      <div className="left-sidebar-wrapper box-item">
        <div className="left-sidebar">
          <div className="main-logo" />
          <div id="menu" />
          <ul
            className={classNames([
              'left-sidebar-menu',
              { 'left-sidebar-menu-fixed': this.state.fixed },
            ])}
          >
            {_.map(items, (item, key) => (
              <li
                key={key}
                className={classNames([
                  'left-sidebar-menu-item',
                  { active: activeSlide === key },
                ])}
                onClick={onClick}
                data-key={key}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
