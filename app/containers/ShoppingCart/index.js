import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import { addToCart, removeFromCart, changeAmount } from './actions';
import {
  makeSelectItems,
  makeSelectCost,
  makeSelectPaymentType,
} from './selectors';
import PopupCartIcon from './img/popup_cart.svg';
import DeleteIcon from './img/delete.svg';

/* eslint-disable react/prefer-stateless-function */
export class ShoppingCart extends React.PureComponent {
  onRemoveFromCart = event => {
    event.preventDefault();
    const { index } = event.currentTarget.dataset;
    this.props.removeFromCart(index);
  };

  onChangeAmount = event => {
    event.preventDefault();
    const { index, value } = event.currentTarget.dataset;
    this.props.changeAmount(index, value);
  };

  onPayClick = event => {
    this.props.handleClose(event);
  };

  render() {
    const { items, cost, hidden, isInitCart } = this.props;

    return (
      <div className="popup-wrapper" hidden={hidden}>
        {items.length > 0 ? (
          <div className="popup__cart">
            {isInitCart && (
              <div className="cart__title">
                <h2 className="cart__title_text">
                  Самое время закончить оформление заказа.
                </h2>
              </div>
            )}
            <div className="cart__title">
              <p className="cart__title_text">Ваша корзина</p>
            </div>
            <div className="cart__table">
              <div className="cart__table_cell">
                <div className="cart__table_subcell small">
                  <img
                    className="cart__table_ic"
                    src={PopupCartIcon}
                    alt="cart"
                  />
                </div>
                <div className="cart__table_subcell big">
                  <p className="cart__table_text">Наименование</p>
                </div>
                <div className="cart__table_subcell middle">
                  <p className="cart__table_text">Цена, руб.</p>
                </div>
                <div className="cart__table_subcell middle">
                  <p className="cart__table_text">Кол-во</p>
                </div>
                <div className="cart__table_subcell middle">
                  <p className="cart__table_text">Сумма</p>
                </div>
                <div className="cart__table_subcell x_small">
                  <p className="cart__table_text" />
                </div>
              </div>
              {items.map(el => (
                <div className="cart__table_cell" key={el.id}>
                  <div className="cart__table_subcell small">
                    <img
                      className="program__slide_img"
                      src={require(`images/products/${el.image}`) /* eslint-disable-line */}
                      alt="img"
                    />
                  </div>
                  <div className="cart__table_subcell big">
                    <p className="cart__table_text">{el.title}</p>
                  </div>
                  <div className="cart__table_subcell middle">
                    <p className="cart__table_inform">
                      {el.currentCost ? el.currentCost : el.cost}
                    </p>
                  </div>
                  <div className="cart__table_subcell middle">
                    <p className="cart__table_inform">
                      <a
                        href="/"
                        onClick={this.onChangeAmount}
                        data-index={el.id}
                        data-value="-1"
                      >
                        -{' '}
                      </a>
                      {el.amount ? el.amount : 1}
                      <a
                        href="/"
                        onClick={this.onChangeAmount}
                        data-index={el.id}
                        data-value="+1"
                      >
                        {' '}
                        +
                      </a>
                    </p>
                  </div>
                  <div className="cart__table_subcell middle">
                    <p className="cart__table_inform">
                      {el.totalCost ? el.totalCost : el.cost}
                    </p>
                  </div>
                  <div className="cart__table_subcell x_small">
                    <a
                      href="/"
                      className="cart__delete"
                      onClick={this.onRemoveFromCart}
                      data-index={el.id}
                    >
                      <img
                        src={DeleteIcon}
                        alt="delete"
                        className="cart__delete_icon"
                      />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart__bottom">
              <div className="cart__bottom_cell" />
              {cost > 499 ? (
                <div className="cart__bottom_cell">
                  <div className="cart__data">
                    <p className="cart__data_name">Сумма заказа</p>
                    <p className="cart__data_value">{cost} руб.</p>
                  </div>
                  <a
                    href="#section_callback"
                    className="btn"
                    onClick={this.onPayClick}
                    data-section="section_callback"
                  >
                    Оформить заказ
                  </a>
                </div>
              ) : (
                <div className="cart__bottom_cell">
                  <div className="cart__data">
                    Онлайн заказ доступен от 500 руб.
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="cart__title">
              <h2 className="cart__title_text">Ваша корзина ещё пуста.</h2>
            </div>
            <div className="cart__title">
              <p className="cart__title_text">
                Начните питаться правильно вместе с Овсянкой.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  hidden: PropTypes.bool,
  items: PropTypes.array.isRequired,
  cost: PropTypes.number.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  changeAmount: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
  isInitCart: PropTypes.bool,
};

ShoppingCart.defaultProps = {
  hidden: false,
};

const mapStateToProps = createStructuredSelector({
  items: makeSelectItems(),
  cost: makeSelectCost(),
  paymentType: makeSelectPaymentType(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onAddToCart: () => dispatch(addToCart()),
    changeAmount: (id, value) => dispatch(changeAmount(+id, +value)),
    removeFromCart: id => dispatch(removeFromCart(+id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'cart', reducer });

export default compose(
  withReducer,
  withConnect,
)(ShoppingCart);
