import React from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';
import _ from 'lodash';

import ProductAdded from '../../../components/ProductAdded';
import { scrollTo } from '../../../utils/ui-methods';
import { settings } from './constants';
import SliderOfferIcons from './SliderOfferIcons';

class ProductSection extends React.PureComponent {
  state = {
    tab: 'smoothies',
    isProductModalOpen: false,
    product: '',
  };

  onAddToCart = e => {
    e.preventDefault();
    const section = this.props.items[this.state.tab];
    const index = _.find(section, {
      id: +e.currentTarget.dataset.item,
    });
    this.props.addToCart(index);
    this.setState({ product: e.target.getAttribute('data-title') });
    this.setState({ isProductModalOpen: true });
  };

  onTabClick = e => {
    e.preventDefault();
    const { tab } = e.currentTarget.dataset;
    this.setState({
      tab,
    });
  };

  handleNavClick = e => scrollTo(e);

  closeProductModal = e => {
    e.preventDefault();
    this.setState({ isProductModalOpen: false });
  };

  render() {
    const { items, openCart } = this.props;
    const { tab } = this.state;
    const slidesSize = _.size(items[tab]);
    const slidesToShow =
      slidesSize < settings.slidesToShow ? slidesSize : settings.slidesToShow;

    return (
      <section className="section_product">
        <div className="product">
          <div className="product__block">
            <div className="wrapper">
              <div className="title">
                <p className="title_text">Детокс</p>
              </div>
              <div className="product__inform">
                <p className="product_text">
                  Детокс – это не просто разгрузочный день. Это уникальное
                  сочетание сложных ингредиентов и витаминов, которые необходимы
                  нашему организму. Мы используем только свежие продукты,
                  которые не просто найти самому, например: кокосовое и
                  миндальное молоко, семена Чиа, чай Матча, шпинат, сельдерей,
                  тархун, ягоды и фрукты.
                </p>
              </div>
              <div className="product__nav">
                <a
                  href="/"
                  className={classNames([
                    'product__nav_link',
                    { active: tab === 'smoothies' },
                  ])}
                  onClick={this.onTabClick}
                  data-tab="smoothies"
                >
                  СМУЗИ
                </a>
                <a
                  href="/"
                  className={classNames([
                    'product__nav_link',
                    { active: tab === 'programs' },
                  ])}
                  onClick={this.onTabClick}
                  data-tab="programs"
                >
                  ПРОГРАММЫ
                </a>
              </div>
            </div>
          </div>
          {tab === 'smoothies' && (
            <Slider
              className="program__slider"
              {...settings}
              slidesToShow={slidesToShow}
            >
              {items[tab].map(el => (
                <div className="program__slide" key={el.id}>
                  <div className="program__slide_container">
                    <SliderOfferIcons el={el} />
                    <div className={`product__slide_${tab}_img_wrapper`}>
                      <img
                        className="program__slide_img slide_img"
                        src={require(`images/products/${el.image}`) /* eslint-disable-line */}
                        alt="img"
                      />
                    </div>
                    <div
                      className={classNames([
                        'program__slide_bottom',
                        `program__slide_bottom_product_${this.state.tab}`,
                        'sticky_slide_bottom',
                      ])}
                    >
                      <div className="program__slide_bottom_name_container">
                        <p className="program__slide_name">{el.title}</p>
                        {el.consist && (
                          <p className="program__slide_text">{el.consist}</p>
                        )}
                      </div>
                      <div className="program__slide_cell">
                        <p className="program__slide_characteristic">
                          {el.kKal} ккал
                        </p>
                        <p className="program__slide_characteristic">
                          <b>{el.cost} руб.</b>
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
          )}
          {tab === 'programs' && (
            <Slider
              className="program__slider"
              {...settings}
              slidesToShow={slidesToShow}
            >
              {items[tab].map(el => (
                <div className="program__slide" key={el.id}>
                  <div className="program__slide_container">
                    <SliderOfferIcons el={el} />
                    <div className={`product__slide_${tab}_img_wrapper`}>
                      <img
                        className="program__slide_img"
                        src={require(`images/products/${el.image}`) /* eslint-disable-line */}
                        alt="img"
                      />
                    </div>
                    <div
                      className={classNames([
                        'program__slide_bottom',
                        `program__slide_bottom_product_${this.state.tab}`,
                        'sticky_slide_bottom',
                      ])}
                    >
                      <div className="program__slide_bottom_name_container">
                        <p className="program__slide_name">{el.title}</p>
                        {el.consist && (
                          <p className="program__slide_text">{el.consist}</p>
                        )}
                      </div>
                      <div className="program__slide_cell">
                        <p className="program__slide_characteristic">
                          {el.kKal} ккал
                        </p>
                        <p className="program__slide_characteristic">
                          <b>{el.cost} руб.</b>
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
          )}
          <a
            href="/"
            className="btn"
            data-section="section_callback"
            onClick={this.handleNavClick}
          >
            Заказать детокс
          </a>
        </div>
        <ProductAdded
          isOpen={this.state.isProductModalOpen}
          product={this.state.product}
          closeModal={this.closeProductModal}
          openCart={openCart}
        />
      </section>
    );
  }
}

export default ProductSection;
