import React from 'react';
import Slider from 'react-slick';
import _ from 'lodash';

import ProductAdded from '../../../components/ProductAdded';
import WeekMenu from '../../../components/WeekMenu';

import { settings } from './constants';
import SliderOfferIcons from './SliderOfferIcons';

class ProgramSection extends React.PureComponent {
  state = {
    isMenuModalOpen: false,
    isProductModalOpen: false,
    product: '',
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

  openMenuModal = e => {
    e.preventDefault();
    this.setState({ isMenuModalOpen: true });
  };

  closeMenuModal = e => {
    e.preventDefault();
    this.setState({ isMenuModalOpen: false });
  };

  closeProductModal = e => {
    e.preventDefault();
    this.setState({ isProductModalOpen: false });
  };

  render() {
    const { items } = this.props;

    return (
      <section className="section_program" id="section_program">
        <div className="program">
          <div className="wrapper">
            <div className="title">
              <p className="title_text">Программы питания</p>
            </div>
            <p className="program_text">
              Комплекс питания рассчитан на 3 недели. В его состав входят
              рационы различной калорийности, ингредиенты которых вкупе дают 23
              важных элемента, необходимых женщине, однако Вы можете сделать
              заказ на любое количество дней.
            </p>
          </div>
          <Slider className="program__slider" {...settings}>
            {items.map(el => (
              <div className="program__slide" key={el.id}>
                <div className="program__slide_container">
                  <SliderOfferIcons el={el} />
                  <div className="program__slide_img_wrapper">
                    <img
                      className="program__slide_img slide_img"
                      src={require(`images/products/${el.image}`) /* eslint-disable-line */}
                      alt="img"
                    />
                  </div>
                  <div className="program__slide_bottom program__slide_bottom_program sticky_slide_bottom">
                    <div className="program__slide_bottom_name_container">
                      <p className="program__slide_name">{el.name}</p>
                    </div>
                    <div className="program__slide_cell">
                      <p className="program__slide_characteristic">
                        {el.kKal} ккал
                      </p>
                      <p className="program__slide_characteristic">
                        <b>
                          от {el.discountCost2 ? el.discountCost2 : el.cost}{' '}
                          руб.
                        </b>
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
            href="./"
            onClick={this.openMenuModal}
            target="_blank"
            className="btn"
          >
            Посмотреть меню
          </a>
        </div>
        <WeekMenu
          isOpen={this.state.isMenuModalOpen}
          closeModal={this.closeMenuModal}
        />
        <ProductAdded
          isOpen={this.state.isProductModalOpen}
          closeModal={this.closeProductModal}
          product={this.state.product}
          openCart={this.props.openCart}
        />
      </section>
    );
  }
}

export default ProgramSection;
