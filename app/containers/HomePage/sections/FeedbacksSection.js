import React from 'react';
import Slider from 'react-slick';
import _ from 'lodash';

import { feedBacksSettings } from './constants';

class FeedbacksSection extends React.Component {
  state = {
    expanded: [],
  };

  onExpandClick = e => {
    e.preventDefault();
    const id = +e.currentTarget.dataset.index;
    const { expanded } = this.state;

    if (_.includes(expanded, id)) {
      _.remove(expanded, val => val === id);
    } else {
      expanded.push(id);
    }
    this.setState({
      expanded,
    });
  };

  render() {
    const { items } = this.props;
    const { expanded } = this.state;

    return (
      <section className="section_reviews_slider">
        <div className="reviews">
          <div className="wrapper">
            <div className="title">
              <p className="title_text">Наши довольные клиенты</p>
            </div>
          </div>
          <Slider className="reviews__slider" {...feedBacksSettings}>
            {items.map(el => (
              <div className="reviews__slide" key={el.id}>
                <div className="reviews__slide_container">
                  <div className="reviews__slide_img_wrapper">
                    <img
                      className="reviews_img slide_img"
                      src={require(`images/clients/${el.image}`) /* eslint-disable-line */}
                      alt="client"
                    />
                  </div>
                  <div
                    className="expandable"
                    style={{
                      height: _.includes(expanded, el.id) ? 'auto' : 200,
                      overflow: 'hidden',
                    }}
                  >
                    <div className="reviews__slide_title">
                      <p className="reviews_name">{el.name}</p>
                      <p className="reviews_position">{el.description}</p>
                    </div>
                    <div className="reviews_inform">
                      <p className="reviews_text">{el.message}</p>
                    </div>
                  </div>
                  <a
                    href="/"
                    className="reviews_btn"
                    onClick={this.onExpandClick}
                    data-index={el.id}
                  >
                    {_.includes(expanded, el.id) ? 'Скрыть' : 'Читать далее'}
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    );
  }
}

export default FeedbacksSection;
