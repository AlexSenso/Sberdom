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

    this.state = {
      isCartOpen: false,
      isInit: true,
    };
  }

  handleClickOpen = e => {
    e.preventDefault();
    this.setState({ isCartOpen: true });
  };

  handleCartClose = e => {
    e.preventDefault();
    this.setState({ isCartOpen: false, isInit: false });
  };

  handlePaidClose = e => {
    e.preventDefault();
    window.location.href = window.location.origin;
  };

  handleShoppingCartClick = () => {
    this.setState({ isCartOpen: false, isInit: false });
  };

  handlePlaceClick = e => {
    e.preventDefault();
    scrollTo(e);
  };

  render() {
    const { catalog, onAddToCart, feedbacks } = this.props;
    const { isCartOpen, isInit } = this.state;

    return (
      <article>
        <Helmet>
          <title>
            Доставка правильной еды в Омске, диетическое питание с доставкой на
            дом и офис
          </title>
          <meta
            name="description"
            content="Полезная и вкусная еда без сахара, без ГМО с доставкой в Омске. Правильный рацион питания на каждый день, заказ 8 (913)-6-288-557"
          />
          <meta
            name="keywords"
            content="овсянка питание правильно еда без сахар гмо доставка омск"
          />
        </Helmet>

        <WhySection />
        <ReviewsSection />
        <ProgramSection
          items={catalog.programs}
          addToCart={onAddToCart}
          openCart={this.handleClickOpen}
        />
        <ProductSection
          items={catalog.detox}
          addToCart={onAddToCart}
          openCart={this.handleClickOpen}
        />
        <SweetsSection
          items={catalog.sweets}
          addToCart={onAddToCart}
          openCart={this.handleClickOpen}
        />
        <FeedbacksSection items={feedbacks} />
        <CallBackSection />
        <Cart
          isCartOpen={isCartOpen}
          isInit={isInit}
          handleClickOpen={this.handleClickOpen}
          handleCartClose={this.handleCartClose}
          handlePaidClose={this.handlePaidClose}
          handleShoppingCartClick={this.handleShoppingCartClick}
          handlePlaceClick={this.handlePlaceClick}
        />
      </article>
    );
  }
}

HomePage.propTypes = {
  catalog: PropTypes.object.isRequired,
  feedbacks: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
    onAddToCart: item => {
      dispatch(startAnimation());
      dispatch(addToCart(item));
      setTimeout(() => dispatch(stopAnimation()), 200);
    },
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  catalog: makeSelectCatalog(),
  feedbacks: makeSelectFeedbacks(),
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
