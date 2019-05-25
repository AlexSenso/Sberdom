import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

import './News.scss';
import { connect } from 'react-redux';
import { compose } from 'redux';

const newsItems = [
  {
    title:
      'Только что специалистами УК выполнены работы по ремонту автоматических ворот',
    description:
      'Успешно и точно в срок выполнены работы по ремонту автоматических ворот',
    date: '18 марта 2019',
  },
  {
    title: 'Управляющая компания: цветов в наших дворах становится больше!',
    description: 'Специалисты управляющей компании высадили растения в вазоны',
    date: '20 марта 2019',
  },
  {
    title:
      'Информация о порядке размещения на фасадах многоквартирных домов кондиционеров, видеокамер, декоративных решеток и прочего оборудования',
    description:
      'Публикуем порядок согласования размещения кондиционеров и других устройств (вентиляционных трубопроводов, вентиляционных решеток, декоративных решеток, декоративных экранов, роллет, жалюзи, антенн (не являющихся сооружением), видеокамер наружного наблюдения, водосточных труб, маркиз, флагодержателей, громкоговорителей) (далее – оборудование) на фасадах зданий в Санкт-Петербурге',
    date: '22 марта 2019',
  },
  {
    title: 'Сегодня завершился отопительный сезон в Петербурге',
    description:
      'Председатель Комитета по энергетике и инженерному обеспечению СПб распорядился: теплоснабжающим организациям приступить к подготовке к следующему отопительному сезону 2019-2020 года.',
    date: '13 мая 2019',
  },
  {
    title: 'УК информирует о работе в праздничные дни',
    description:
      'Уважаемые жители! Поздравляем вас с майскими праздниками, и напоминаем, что в дни майских праздников оперативные службы управляющей компании будут работать в обычном режиме, назначены дежурные специалисты для решения вопросов обеспечения жизнедеятельности многоквартирных домов',
    date: '1 мая 2019',
  },
  {
    title: 'Расскажите детям об опасности шалостей с огнем!',
    description:
      'Памятка для родителей: В преддверии новогодних праздников и каникул расскажите детям об опасности шалостей с огнем!',
    date: '22 декабря 2018',
  },
  {
    title: 'Завтра будет ограничена подача электроэнергии',
    description:
      '10 мая с 10:00 до 17:00 в связи с плановыми работами островным  «Кабельная сеть» будет прекращена подача электроэнергии.',
    date: '9 мая 2019',
  },
]



export class News extends React.Component {
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
                  className="news-item"
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
