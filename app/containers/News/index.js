import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

import './News.scss';
import { connect } from 'react-redux';
import { compose } from 'redux';

const newsItems = [
  {
    title: 'Голосование: судьба дерева',
    description:
      'Некоторым жильцам закрывает свет в окна, а другим наоборот нравится зелень возле дома',
    date: '25 мая 2019',
    type: 'link'
  },
  {
    title: 'Сегодня завершился отопительный сезон в Петербурге',
    description:
      'Теплоснабжающим организациям приступить к подготовке к следующему отопительному сезону 2019-2020 года.',
    date: '20 мая 2019',
  },
  {
    title: 'Завтра будет ограничена подача электроэнергии',
    description:
      '10 мая с 10:00 до 17:00 в связи с плановыми работами.',
    date: '19 мая 2019',
  },
  {
    title: 'УК информирует о работе в праздничные дни',
    description:
      'Уважаемые жители! Поздравляем вас с майскими праздниками',
    date: '1 мая 2019',
  },
  {
    title:
      'Информация о порядке размещения на фасадах оборудования',
    description:
      'Публикуем порядок согласования размещения кондиционеров и других устройств',
    date: '22 марта 2019',
  },
  {
    title: 'Управляющая компания: цветов в наших дворах становится больше!',
    description: 'Специалисты управляющей компании высадили растения в вазоны',
    date: '20 марта 2019',
  },
  {
    title:
      'Только что специалистами УК выполнены работы по ремонту автоматических ворот',
    description:
      'Успешно и точно в срок выполнены работы по ремонту автоматических ворот',
    date: '18 марта 2019',
  },
  {
    title: 'Расскажите детям об опасности шалостей с огнем!',
    description:
      'В преддверии новогодних праздников и каникул расскажите детям об опасности шалостей с огнем!',
    date: '22 декабря 2018',
  },
]



export class News extends React.Component {
  goToChats = event => {
    event.preventDefault();
    this.props.getMenuItem(1)
  };

  render() {
    return (
      <div className="news-page">
        <div className="news-lists">
          <div className="news">
            <ul className="news-list">
              <li
                className={classNames([
                  'news-item-mail',
                  { 'news-item-mail-active': this.props.motion },
                ])}
              >
                <div className="news-title">Вам письмо!</div>
                <div className="news-description-wrapper">
                  <div className="news-description">Что-то интересное упало в почтовый ящик</div>
                  <div className="news-date">Только что</div>
                </div>
              </li>
              {_.map(newsItems, (item, key) => (
                <li
                  key={key}
                  className={classNames([
                    'news-item',
                    { 'news-item-link': _.get(item, 'type') === 'link' },
                  ])}
                  onClick={
                    _.get(item, 'type') === 'link' ? this.goToChats : () => {}
                  }
                >
                  <div className="news-title">{item.title}</div>
                  <div className="news-description-wrapper">
                    <div className="news-description">{item.description}</div>
                    <div className="news-date">{item.date}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="thermometer">
            <div className="thermometer-item">
              <div className="thermometer-title">Градусник за окном</div>
              <div className="thermometer-wrapper">
                <div className="thermometer-icon" />
                <div className="thermometer-reading">
                  {this.props.temperature && (
                    <div className="thermometer-temperature">
                      +{this.props.temperature}º
                    </div>
                  )}
                  {this.props.humidity && (
                    <div className="thermometer-humidity">
                      ВЛАЖНОСТЬ {this.props.humidity}%
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div
              className="notification-item news-item"
            >
              <div className="news-title">Оплатить счета за май</div>
              <div className="news-description-wrapper">
                <div className="news-description">
                  Водоснабжение, электроэнергия, обслуживание дома
                </div>
                <div className="news-date">24 мая 2019</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const temperature = _.get(state.toJS(), ['home', 'sensor_data', 'temperature'], {})
  const humidity = _.get(state.toJS(), ['home', 'sensor_data', 'humidity'], {})
  const motion = _.get(state.toJS(), ['home', 'motion'], {})

  return {
    temperature: temperature.value,
    humidity: humidity.value,
    motion: motion.motionDetected,
  }
}

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
)(News);
