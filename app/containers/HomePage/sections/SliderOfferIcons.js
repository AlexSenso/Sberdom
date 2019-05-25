import React from 'react';
import PropTypes from 'prop-types';

class SliderOfferIcons extends React.PureComponent {
  render() {
    return (
      <div>
        {this.props.el.isNew && (
          <div className="program__slider_offer_icon_wrapper">
            <div className="program__slider_offer_text">Новинка</div>
            <img
              className="program__slide_ic program__slider_offer_icon"
              src={require('images/new_icon.svg') /* eslint-disable-line */}
              alt="img"
            />
          </div>
        )}
        {this.props.el.isHit && (
          <div className="program__slider_offer_icon_wrapper">
            <div className="program__slider_offer_text">Хит продаж</div>
            <img
              className="program__slide_ic program__slider_offer_icon"
              src={require('images/hit_icon.svg') /* eslint-disable-line */}
              alt="img"
            />
          </div>
        )}
        {this.props.el.isSeason && (
          <div className="program__slider_offer_icon_wrapper">
            <div className="program__slider_offer_text">Сезонный продукт</div>
            <img
              className="program__slide_ic program__slider_offer_icon"
              src={require('images/sezon_icon.svg') /* eslint-disable-line */}
              alt="img"
            />
          </div>
        )}
      </div>
    );
  }
}

SliderOfferIcons.propTypes = {
  el: PropTypes.shape({
    isNew: PropTypes.bool,
    isHit: PropTypes.bool,
    isSeason: PropTypes.bool,
  }),
};

export default SliderOfferIcons;
