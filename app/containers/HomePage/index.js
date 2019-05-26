import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import _ from 'lodash';

import reducer from './reducer';
import saga from './saga';

import './HomePage.scss';
import Service from '../Service';
import Profile from '../Profile';
import Camera from '../Camera';
import News from '../News';
import Chats from '../Chats';

import { LeftSidebar } from '../App/components/LeftSidebar';

const mainMenuItems = ['НОВОСТИ', 'ОБЩЕНИЕ', 'СЕРВИС', 'ИВАН', 'ВОКРУГ'];
const pages = [News, Chats, Service, Profile, Camera];

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
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

  getMenuItem = itemName => {
    this.setState({ activeSlide: itemName });
  };

  render() {
    const Page = pages[this.state.activeSlide]

    return (
      <article>
        <Helmet titleTemplate="%s - Живой дом" defaultTitle="Живой дом" />
        <div className="layout-wrapper">
          <LeftSidebar
            items={mainMenuItems}
            onClick={this.onMenuClick}
            activeSlide={this.state.activeSlide}
            className="left-sidebar"
          />
          <div className="region-content">
            <Page getMenuItem={this.getMenuItem} />
          </div>
        </div>
      </article>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    // onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    // onSubmitForm: evt => {
    //   if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    //   dispatch(loadRepos());
    // },
    // onAddToCart: item => {
    //   dispatch(startAnimation());
    //   dispatch(addToCart(item));
    //   setTimeout(() => dispatch(stopAnimation()), 200);
    // },
  };
}

const mapStateToProps = state => {
  const temperature = _.get(state.toJS(), ['home', 'sensor_data', 'temperature'], {})
  const humidity = _.get(state.toJS(), ['home', 'sensor_data', 'humidity'], {})
  const motion = _.get(state.toJS(), ['home', 'motion'], {})

  return {
    temperature: temperature.value,
    humidity: humidity.value,
    motion: motion.motionDetected,
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });

const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
