import React from 'react';
import _ from 'lodash';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import CloseIcon from '../../../components/Header/img/close.svg';
// import WeekMenu from '../../../components/WeekMenu';

export class ProductDescription extends React.PureComponent {
  propTypes = {
    changeAmount: PropTypes.number,
    items: PropTypes.array,
    addToCart: PropTypes.func,
    el: PropTypes.object,
  };

  handleClose = e => {
    e.preventDefault();
    // this.setState({ open: false });
  };

  onChangeAmount = event => {
    event.preventDefault();
    const { index, value } = event.currentTarget.dataset;
    this.props.changeAmount(index, value);
  };

  onAddToCart = e => {
    e.preventDefault();
    const index = _.find(this.props.items, {
      id: +e.currentTarget.dataset.item,
    });
    this.props.addToCart(index);
  };

  render() {
    const { el } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        open={false}
        PaperProps={{
          className: 'popup',
          style: {
            maxWidth: '763px',
            marginLeft: '0',
            marginRight: '0',
          },
        }}
      >
        <DialogTitle>
          <div className="product__description_header">
            <h3>Рациональное снижение веса</h3>
            <a
              href="/"
              className="product__description_header_close close"
              onClick={this.handleClose}
            >
              <img src={CloseIcon} alt="close" className="close_img" />
            </a>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="product__description_content">
            <div className="product__description_img_wrapper">
              <img
                className="product__description_img"
                src={require(`images/products/program_1.jpg`) /* eslint-disable-line */}
                alt="sweet"
              />
            </div>
            <div className="product__description_description">
              <h4 className="product__description_product_name">
                Для тех, кто хочет похудеть
              </h4>
              <div>
                Комплекс питания рассчитан на 3 недели. В его состав входят
                рационы различной калорийности, ингредиенты которых вкупе дают
                23 важных элемента, необходимых женщине, однако Вы можете
                сделать заказ на любое количество дней.
              </div>
              <h4 className="product__description_product_kkal">Ккал 1400</h4>
              <div className="product__description_cost">
                <div className="product__description_cost_title">Цена</div>
                <div className="product__description_cost_price">
                  <div>за 1 день 1300 руб/день</div>
                  <div className="product__description_cost_price_item">
                    от 7 дней 1280 руб/день
                  </div>
                  <div className="product__description_cost_price_item">
                    от 30 дней 1145 руб/день
                  </div>
                </div>
              </div>
              <div className="product__description_actions">
                <div className="product__description_counter">
                  <a
                    href="/"
                    onClick={this.onChangeAmount}
                    data-value="-1"
                    data-index={el.id}
                  >
                    -{' '}
                  </a>
                  <span className="product__description_counter_number">1</span>
                  <a
                    href="/"
                    onClick={this.onChangeAmount}
                    data-value="+1"
                    data-index={el.id}
                  >
                    {' '}
                    +
                  </a>
                </div>
                <a
                  href="/"
                  onClick={this.onAddToCart}
                  data-item={el.id}
                  className="product__description_action"
                >
                  Добавить в корзину
                </a>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}
