/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import {
  addToCart,
  stopAnimation,
  startAnimation,
} from '../ShoppingCart/actions';
import Cart from '../../components/Cart';
import {
  makeSelectCatalog,
  makeSelectUsername,
  makeSelectFeedbacks,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import WhySection from './sections/WhySection';
import ReviewsSection from './sections/ReviewsSection';
import ProgramSection from './sections/ProgramSection';
import ProductSection from './sections/ProductSection';
import SweetsSection from './sections/SweetsSection';
import FeedbacksSection from './sections/FeedbacksSection';
import CallBackSection from './sections/CallBackSection';

import './HomePage.scss';
import { scrollTo } from '../../utils/ui-methods';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    // const { } = this.props;
    // const { } = this.state;

    return (
      <article>
        <Helmet>
          <title>Живой дом</title>
          <meta name="description" content="Живой дом" />
          <meta name="keywords" content="Живой дом" />
        </Helmet>
        <div>HomePage</div>
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
