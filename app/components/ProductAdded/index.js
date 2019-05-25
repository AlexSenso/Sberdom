import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import CloseIcon from '../Header/img/close.svg';
import TitleImg from '../../images/product_added.svg';

function ProductAdded(props) {
  const goToCart = e => {
    e.preventDefault();
    props.closeModal(e);
    props.openCart(e);
  };

  return (
    <Dialog
      open={props.isOpen}
      // open={true}
      PaperProps={{
        className: 'popup',
        style: {
          maxWidth: '546px',
          marginLeft: '0',
          marginRight: '0',
          width: '100%',
        },
      }}
    >
      <DialogTitle>
        <div className="product__added_header">
          <div className="product__added_header_img_wrapper">
            <img className="product__added_header_img" src={TitleImg} alt="" />
            <h3 className="product__added_title">
              <div>{props.product}</div>
              <div>добавлен в корзину</div>
            </h3>
          </div>
          <a
            href="/"
            className="product__added_header_close close"
            onClick={props.closeModal}
          >
            <img src={CloseIcon} alt="close" className="close_img" />
          </a>
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="product__added_actions">
          <a
            href="/"
            onClick={props.closeModal}
            className="product__added_continue_button"
          >
            Продолжить
          </a>
          <a href="/" onClick={goToCart} className="product__added_cart_button">
            В корзину
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}

ProductAdded.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  openCart: PropTypes.func,
  product: PropTypes.string,
};

export default ProductAdded;
