import React from 'react';

import ReviewsImage from './img/IMG_9482.jpg';

class ReviewsSection extends React.Component {
  state = {
    screenWidth:
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth,
    isExtended:
      (window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth) > 768,
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({
      screenWidth:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth,
      isExtended:
        (window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth) > 768,
    });
  };

  onExtendClick = e => {
    e.preventDefault();
    const { isExtended } = this.state;
    this.setState({ isExtended: !isExtended });
  };

  render() {
    const { screenWidth, isExtended } = this.state;
    const isReadMore = screenWidth < 769 && !isExtended;
    const isHideMore = screenWidth < 769 && isExtended;

    return (
      <div className="section_reviews">
        <div className="reviews">
          <div className="wrapper">
            <div className="reviews__title">
              <p className="reviews__title_text">
                23 пищевых компонента, которые жизненно необходимы для женщины
              </p>
            </div>
            <div className="reviews__block">
              <img className="reviews_photo" src={ReviewsImage} alt="img" />
              <div className="reviews__inform">
                <div className="read-more">
                  <p className="reviews__inform_text">
                    Наша миссия - вырастить правильное поколение здоровых
                    женщин, поэтому в своём исследовании мы пошли дальше и
                    выявили 23 компонента, которые жизненно необходимы женщине
                    для здоровья, красоты и хорошего настроения.{' '}
                    {isReadMore && (
                      <a href="/" id="read-more" onClick={this.onExtendClick}>
                        Подробнее
                      </a>
                    )}
                  </p>
                  {isExtended && (
                    <div>
                      <p className="reviews__inform_text">
                        Мы готовим для вас блюда из сезонных и локальных
                        продуктов, качество которых мы обязательно проверяем на
                        разных этапах нитрат тестером и счетчиком Гейгера.
                      </p>
                      <p className="reviews__inform_text">
                        В процессе исследования мы поняли, что женский и мужской
                        организм - это несравнимые вещи, поэтому мы разработали
                        систему питания, которая подходит именно женщинам.{' '}
                        {isHideMore && (
                          <a
                            href="/"
                            id="hide-more"
                            onClick={this.onExtendClick}
                          >
                            Скрыть
                          </a>
                        )}
                      </p>
                    </div>
                  )}
                </div>
                <p className="reviews__inform_name">
                  Кристина Мейнертс, Основатель доставки правильного питания для
                  женщин
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewsSection;
