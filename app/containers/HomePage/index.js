import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';

import './HomePage.scss';
import Service from '../Service';
import { LeftSidebar } from '../App/components/LeftSidebar';

const mainMenuItems = ['НОВОСТИ', 'СЕРВИС', 'SETTINGS'];
const pages = [() => <div>Димас</div>, Service, () => <div>Лох</div>];

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

  render() {

    const Page = pages[this.state.activeSlide]
    // const { } = this.props;
    // const { } = this.state;

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
            <Page />
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

const mapStateToProps = createStructuredSelector({
  // repos: makeSelectRepos(),
  // username: makeSelectUsername(),
  // loading: makeSelectLoading(),
  // error: makeSelectError(),
  // catalog: makeSelectCatalog(),
  // feedbacks: makeSelectFeedbacks(),
});

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
