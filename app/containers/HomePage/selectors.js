/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.get('home', initialState);

const makeSelectUsername = () =>
  createSelector(selectHome, homeState => homeState.get('username'));

const makeSelectCatalog = () =>
  createSelector(selectHome, homeState => homeState.get('catalog').toJS());

const makeSelectFeedbacks = () =>
  createSelector(selectHome, homeState => homeState.get('feedbacks').toJS());

export {
  selectHome,
  makeSelectUsername,
  makeSelectCatalog,
  makeSelectFeedbacks,
};
