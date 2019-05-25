import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCart = state => state.get('cart', initialState);

const makeSelectItems = () =>
  createSelector(selectCart, cartState => cartState.get('items').toJS());

const makeSelectCost = () =>
  createSelector(selectCart, cartState => cartState.get('cost'));

const makeLocalstorage = () =>
  createSelector(selectCart, cartState => cartState.get('isLocalstorage'));

const makeSelectAddedToCart = () =>
  createSelector(selectCart, cartState => cartState.get('isAddedToCart'));

const makeSelectGoodsNumber = () =>
  createSelector(selectCart, cartState =>
    cartState.get('items').reduce((t, i) => t + i.get('amount'), 0),
  );

const makeSelectPaymentType = () =>
  createSelector(selectCart, cartState => cartState.get('paymentType'));

const makeIsPaid = () =>
  createSelector(selectCart, cartState => cartState.get('isPaid'));

const makeIsOrdered = () =>
  createSelector(selectCart, cartState => cartState.get('isOrdered'));

export {
  selectCart,
  makeSelectItems,
  makeSelectCost,
  makeSelectAddedToCart,
  makeSelectGoodsNumber,
  makeSelectPaymentType,
  makeLocalstorage,
  makeIsPaid,
  makeIsOrdered,
};
