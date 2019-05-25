import React from 'react';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import Dialog from '@material-ui/core/Dialog/Dialog';
import CartIcon from '../Header/img/cart.svg';
import { declOfNum } from '../../containers/App/utils';
import ShoppingCart from '../../containers/ShoppingCart';
import {
  makeIsOrdered,
  makeIsPaid,
  makeLocalstorage,
  makeSelectAddedToCart,
  makeSelectCost,
  makeSelectGoodsNumber,
} from '../../containers/ShoppingCart/selectors';

import CloseIcon from '../Header/img/close.svg';

class Cart extends React.PureComponent {
  render() {
    const {
      cost,
      goodsNumber,
      isAddedToCart,
      isLocalstorage,
      isPaid,
      isOrdered,
      isCartOpen,
      isInit,
      handleClickOpen,
      handleCartClose,
      handlePaidClose,
      handleShoppingCartClick,
      handlePlaceClick,
    } = this.props;
    // const { isCartOpen, isInit } = this.state;

    const isValidOrder = cost > 499;
    const isInitCart = isLocalstorage && isInit && cost > 0;

    return (
      <div>
        <div className={classNames('cart__block', 'popup_link')}>
          <div className="cart__wrapper">
            <div className="cart__wrapper_handle">
              <div className="cart__img_container">
                <img
                  className={classNames(
                    'cart_img',
                    isAddedToCart && 'added_to_cart_img',
                  )}
                  src={CartIcon}
                  alt="cart"
                />
              </div>
              <div className="cart__img_container">
                <div className="cart__battery">
                  <span className="cart__battery_cell" />
                  <span
                    className={classNames(
                      'cart__battery_cell',
                      cost > 999 && 'active',
                    )}
                  />
                  <span
                    className={classNames(
                      'cart__battery_cell',
                      isValidOrder && 'active',
                    )}
                  />
                  <span className="cart__battery_cell active" />
                </div>
              </div>
            </div>
            <div>
              <div className="cart__text_container">
                {isValidOrder ? (
                  <div>
                    {cost < 1000 ? (
                      <p>
                        Доставка бесплатная при заказе
                        <br /> от 1000р.
                      </p>
                    ) : (
                      <p>Достаточно для заказа онлайн</p>
                    )}
                    <p className="cart__text_container_more">
                      Может быть, посмотрите еще?
                    </p>
                    <a
                      className="cart__text_container_link"
                      href="/"
                      onClick={handlePlaceClick}
                      data-section="section_callback"
                    >
                      Оформить заказ
                    </a>
                  </div>
                ) : (
                  <div>Недостаточно для заказа онлайн</div>
                )}
              </div>
              <a
                className="cart__text_container"
                href="/"
                onClick={handleClickOpen}
              >
                {cost !== 0 ? (
                  <div>{`${goodsNumber} ${declOfNum(goodsNumber, [
                    'товар',
                    'товара',
                    'товаров',
                  ])} на сумму ${cost} руб.`}</div>
                ) : (
                  <div>Ваша корзина пуста</div>
                )}
              </a>
            </div>
          </div>
        </div>
        <Dialog
          onClose={handleCartClose}
          open={isCartOpen || isInitCart}
          PaperProps={{
            className: 'popup',
            style: {
              maxWidth: '100%',
              marginLeft: '0',
              marginRight: '0',
            },
          }}
        >
          <DialogTitle>
            <a href="/" className="close" onClick={handleCartClose}>
              <img src={CloseIcon} alt="close" className="close_img" />
            </a>
          </DialogTitle>
          <DialogContent>
            <ShoppingCart
              handleClose={handleShoppingCartClick}
              isInitCart={isInitCart}
            />
          </DialogContent>
        </Dialog>

        <Dialog
          onClose={handlePaidClose}
          open={isPaid || isOrdered}
          PaperProps={{
            className: 'popup',
            style: {
              maxWidth: '100%',
              marginLeft: '0',
              marginRight: '0',
            },
          }}
        >
          <DialogTitle>
            <a href="/" className="close" onClick={handlePaidClose}>
              <img src={CloseIcon} alt="close" className="close_img" />
            </a>
          </DialogTitle>
          <DialogContent>
            <div className="cart__title">
              <h2 className="cart__title_text">
                Спасибо за заказ. В ближайшее время менеджер свяжется с Вами.
              </h2>
            </div>
            <br />
            <div className="cart__title">
              <p>
                Напоминаем, что заказ осуществляется в будни 10:00 до 16:00 и в
                выходные 10:00 до 14:00.
              </p>
            </div>
            <br />
            <div className="cart__title">
              <p>
                Доставка: на следующее утро — будни с 07:00 до 11:00, выходные с
                08:00 до 11:00
              </p>
            </div>
          </DialogContent>
        </Dialog>
        <ShoppingCart hidden />
      </div>
    );
  }
}

Cart.propTypes = {
  cost: PropTypes.number,
  goodsNumber: PropTypes.number,
  isAddedToCart: PropTypes.bool,
  isLocalstorage: PropTypes.bool,
  isPaid: PropTypes.bool,
  isOrdered: PropTypes.bool,
  isCartOpen: PropTypes.bool,
  isInit: PropTypes.bool,
  handleClickOpen: PropTypes.func,
  handleCartClose: PropTypes.func,
  handlePaidClose: PropTypes.func,
  handleShoppingCartClick: PropTypes.func,
  handlePlaceClick: PropTypes.func,
};

Cart.defaultProps = {
  isLocalstorage: false,
  isPaid: false,
  isOrdered: false,
};

const mapStateToProps = createStructuredSelector({
  cost: makeSelectCost(),
  goodsNumber: makeSelectGoodsNumber(),
  isAddedToCart: makeSelectAddedToCart(),
  makeLocalstorage: makeLocalstorage(),
  isLocalstorage: makeLocalstorage(),
  isPaid: makeIsPaid(),
  isOrdered: makeIsOrdered(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Cart);
