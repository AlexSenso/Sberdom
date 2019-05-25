import * as types from './constants';

export function addToCart(item) {
  return {
    type: types.ADD_TO_CART,
    item,
  };
}

export function startAnimation() {
  return {
    type: types.START_ANIMATION,
  };
}

export function stopAnimation() {
  return {
    type: types.STOP_CART_ANIMATION,
  };
}

export function removeFromCart(id) {
  return {
    type: types.REMOVE_FROM_CART,
    id,
  };
}

export function changeAmount(id, value) {
  return {
    type: types.CHANGE_AMOUNT,
    id,
    value,
  };
}

export function setPayment(method) {
  return {
    type: types.SET_PAYMENT,
    method,
  };
}
