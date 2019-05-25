import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

import './LeftSidebar.scss';

export class LeftSidebar extends React.PureComponent {

  render() {
    const { onClick, items, activeSlide } = this.props;

    return (
      <div className="left-sidebar-wrapper box-item">
        <div className="left-sidebar">
          <div className="main-logo" />
          <ul className="left-sidebar-menu">
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
