import { fromJS, List } from 'immutable';
import * as types from './constants';

const STORAGE_NAME = 'ovsyankaOrders';

export const initialState = fromJS({
  items: [],
  cost: 0,
  paymentType: 'cash',
  isInit: true,
});

const getItem = (state, id) => {
  const items = state.get('items');
  return items.find(el => el.get('id') === id);
};

const setTotalCost = state => {
  const commonCost = state
    .get('items')
    .reduce((t, i) => t + i.get('totalCost'), 0);

  return state.update('cost', 1, () => commonCost);
};

const setLocalStorage = state => {
  localStorage.setItem(STORAGE_NAME, JSON.stringify(state.get('items').toJS()));
};

function cartReducer(inState = initialState, action) {
  let state = inState;

  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const isPaid = url.searchParams.get('paid');
  const isOrdered = url.searchParams.get('ordered');
  if (isPaid === 'true' || isOrdered === 'true') {
    state = state.set('items', List([]));
    state = state.set('cost', 0);
    state = state.set('isPaid', true);
    setLocalStorage(state);
  } else if (state.get('isInit')) {
    const items = localStorage.getItem(STORAGE_NAME)
      ? JSON.parse(localStorage.getItem(STORAGE_NAME))
      : [];

    state = state.set('items', fromJS(items));
    state = setTotalCost(state);

    if (items.length > 0) {
      state = state.set('isLocalstorage', true);
    }
    state = state.set('isInit', false);
    state = state.set('isPaid', false);
  }

  switch (action.type) {
    case types.ADD_TO_CART: {
      const serialNumber = state
        .get('items')
        .findIndex(item => item.get('id') === action.item.id);
      let newState = state;
      if (serialNumber >= 0) {
        /* Обновил кол-во продукта */
        newState = newState.updateIn(
          ['items', serialNumber, 'amount'],
          1,
          amount => amount + 1,
        );

        /* Обновил общую стоимость продукта */
        const item = getItem(newState, action.item.id);
        const amount = item.get('amount');

        const discountAmount = item.get('discountAmount');
        const discountAmount2 = item.get('discountAmount2');

        /* Проверяем скидки */
        let currentCost;
        if (discountAmount2 && amount >= discountAmount2) {
          currentCost = item.get('discountCost2');
        } else if (discountAmount && amount >= discountAmount) {
          currentCost = item.get('discountCost');
        } else {
          currentCost = item.get('cost');
        }
        newState = newState.updateIn(
          ['items', serialNumber, 'currentCost'],
          1,
          () => currentCost,
        );

        newState = newState.updateIn(
          ['items', serialNumber, 'totalCost'],
          1,
          () => amount * currentCost,
        );
      } else {
        newState = newState.update('items', items =>
          items.push(fromJS(action.item)),
        );
      }

      /* Обновил стоимость заказа */
      newState = setTotalCost(newState);

      setLocalStorage(newState);

      return newState;
    }

    case types.CHANGE_AMOUNT: {
      const id = state
        .get('items')
        .findIndex(item => item.get('id') === action.id);
      if (id >= 0) {
        let newState = state.updateIn(['items', id, 'amount'], 1, amount => {
          const shouldUpdate = !(action.value === -1 && amount === 1);
          return shouldUpdate ? amount + action.value : amount;
        });

        const discountAmount = newState.getIn(['items', id, 'discountAmount']);
        const discountAmount2 = newState.getIn([
          'items',
          id,
          'discountAmount2',
        ]);
        const amount = newState.getIn(['items', id, 'amount']);
        let currentCost;
        if (discountAmount2 && amount >= discountAmount2) {
          currentCost = newState.getIn(['items', id, 'discountCost2']);
        } else if (discountAmount && amount >= discountAmount) {
          currentCost = newState.getIn(['items', id, 'discountCost']);
        } else {
          currentCost = newState.getIn(['items', id, 'cost']);
        }
        newState = newState.updateIn(
          ['items', id, 'currentCost'],
          1,
          () => currentCost,
        );
        newState = newState.updateIn(
          ['items', id, 'totalCost'],
          1,
          () => amount * currentCost,
        );

        newState = setTotalCost(newState);

        setLocalStorage(newState);

        return newState;
      }
      return state;
    }

    case types.REMOVE_FROM_CART: {
      const id = state
        .get('items')
        .findIndex(item => item.get('id') === action.id);
      if (id >= 0) {
        let newState = state.update('items', items => items.delete(id));
        newState = setTotalCost(newState);

        setLocalStorage(newState);

        return newState;
      }
      return state;
    }

    case types.START_ANIMATION: {
      return state.update('isAddedToCart', 1, () => true);
    }

    case types.STOP_CART_ANIMATION: {
      return state.update('isAddedToCart', 1, () => false);
    }

    case types.SET_PAYMENT:
      return state.set('paymentType', action.method);
    default:
      return state;
  }
}

export default cartReducer;
