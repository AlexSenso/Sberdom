import React from 'react';
import Slider from 'react-slick';
import _ from 'lodash';

import ProductAdded from '../../../components/ProductAdded';
import SweetIcon1 from '../img/sweets_ic_1.svg';
import SweetIcon2 from '../img/sweets_ic_2.svg';
import SweetIcon3 from '../img/sweets_ic_3.svg';
import SweetIcon4 from '../img/sweets_ic_4.svg';
import { settings } from './constants';
import { scrollTo } from '../../../utils/ui-methods';
// import { ProductDescription } from '../components/ProductDescription';

import SliderOfferIcons from './SliderOfferIcons';

class SweetsSection extends React.PureComponent {
  state = {
    product: '',
    isProductModalOpen: false,
  };

  onAddToCart = e => {
    e.preventDefault();
    const index = _.find(this.props.items, {
      id: +e.currentTarget.dataset.item,
    });
    this.props.addToCart(index);
    this.setState({ product: e.target.getAttribute('data-title') });
    this.setState({ isProductModalOpen: true });
  };

  handleNavClick = e => scrollTo(e);

  closeProductModal = e => {
    e.preventDefault();
    this.setState({ isProductModalOpen: false });
  };

  render() {
    const { items } = this.props;

    return (
      <section className="section_sweets">
        <div className="sweets">
          <div className="wrapper">
            <div className="title">
              <p className="title_text">Полезные сладости</p>
            </div>
            <div className="sweets__block">
              <div className="sweets__elem">
                <img className="sweets__elem_ic" src={SweetIcon1} alt="icon" />
                <p className="sweets__elem_text">БЕЗ МАРГАРИНА</p>
              </div>
              <div className="sweets__elem">
                <img className="sweets__elem_ic" src={SweetIcon3} alt="icon" />
                <p className="sweets__elem_text">БЕЗ РАФИНИРОВАННОЙ МУКИ</p>
              </div>
              <div className="sweets__elem">
                <img className="sweets__elem_ic" src={SweetIcon2} alt="icon" />
                <p className="sweets__elem_text">БЕЗ САХАРА</p>
              </div>
              <div className="sweets__elem">
                <img className="sweets__elem_ic" src={SweetIcon4} alt="icon" />
                <p className="sweets__elem_text">беЗ ПАЛЬМОВОГО МАСЛА</p>
              </div>
            </div>
          </div>
          <Slider className="program__slider" {...settings}>
            {items.map(el => (
              <div className="program__slide" key={el.id}>
                <div className="program__slide_container">
                  <SliderOfferIcons el={el} />
                  <div className="sweets__slide_img_wrapper">
                    <img
                      className="program__slide_img slide_img"
                      src={require(`images/products/${el.image}`) /* eslint-disable-line */}
                      alt="sweet"
                    />
                  </div>
                  <div className="program__slide_bottom program__slide_bottom_sweets sticky_slide_bottom">
                    <div className="program__slide_bottom_name_container">
                      <p className="program__slide_name">{el.name}</p>
                      <p className="program__slide_text">{el.consist}</p>
                      {el.kbju && (
                        <p className="program__slide_text">
                          КБЖУ {el.kbju} на 100 гр.
                        </p>
                      )}
                    </div>
                    <div className="program__slide_cell">
                      <p className="program__slide_characteristic">
                        {el.kKal} ккал
                      </p>
                      <p className="program__slide_characteristic">
                        {el.isFixPrice === false && <b>от </b>}
                        <b>{el.cost} руб.</b>
                        {el.costSuffix && <b>{el.costSuffix}</b>}
                      </p>
                    </div>
                    <a
                      href="/"
                      onClick={this.onAddToCart}
                      data-item={el.id}
                      data-title={el.title}
                      className="program__slide_add_to_cart"
                    >
                      Добавить в корзину
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          <a
            href="/"
            className="btn"
            data-section="section_callback"
            onClick={this.handleNavClick}
          >
            Заказать сладости
          </a>
        </div>
        <ProductAdded
          isOpen={this.state.isProductModalOpen}
          product={this.state.product}
          closeModal={this.closeProductModal}
          openCart={this.props.openCart}
        />
        {/* <ProductDescription el={{ id: '4' }} /> */}
      </section>
    );
  }
}

export default SweetsSection;
