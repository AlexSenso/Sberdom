import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import votingImage from './images/bitmap@3x.png';

import './Chats.scss';

const menuItems = [
  'ОБСУЖДЕНИЯ',
  'МОИ СОСЕДИ',
  'ЖАЛОБЫ И ПРЕДЛОЖЕНИЯ',
]

export default class Chats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSlide: 0,
      activeChat: 0,
      fieldValue: '',
      showActions: true,
      chatsItems: [
        {
          type: 'voting',
          title: 'Судьба дерева',
          date: '25 мая 2019 / 12:40',
          preview: 'Некоторым жильцам закрывает свет',
          description: 'Некоторым жильцам закрывает свет в окна, а другим наоборот нравится зелень возле дома.',
          img: votingImage,
          actions: ['ОСТАВИТЬ', 'СРУБИТЬ'],
        },
        {
          type: 'chat',
          title: 'Василий Сорокин 331',
          date: '24 мая 2019 / 19:44',
          preview: 'Привет! У нас есть мысль поста',
          messages: [
            {
              name: 'Василий',
              message: 'Привет! У нас есть мысль поставить камеры на этаже — в этом месяце две кражи ( Цена вопроса 2000₽ с человека. Впишешься?',
              isYours: false,
            },
            {
              name: 'Вы',
              message: 'Тоже об этом давно думал. Я за! Кто еще участвует?',
              isYours: true,
            },
          ],
        },
        {
          type: 'chat',
          title: 'Юлусов Влад 62',
          preview: 'Это от Вас я слышу звуки др',
          date: '23 мая 2019 / 21:51',
          messages: [
            {
              name: 'Вы',
              message: 'Это от Вас я слышу звуки дрели? Уже десять часов вечера.',
              isYours: true,
            },
            {
              name: 'Юлусов Влад Сергеевич',
              message: 'Да, до одиннадцати же, вроде, можно?',
              isYours: false,
            },
            {
              name: 'Вы',
              message: 'Это когда было? Давно уже в законе о тишине написано, что до десяти. Мои дети проснулись и больше не могут уснуть!!',
              isYours: true,
            },
            {
              name: 'Юлусов Влад Сергеевич',
              message: 'Хорошо-хорошо, через две минуты строители обещают закончить.',
              isYours: false,
            },
            {
              name: 'Вы',
              message: 'Только если две минуты! Детям спать давно пора!',
              isYours: true,
            },
          ],
        },
      ],
    };
  }

  onMenuClick = event => {
    event.preventDefault();
    this.setState({ activeSlide: parseInt(event.target.dataset.key) });
  };

  onChatClick = event => {
    event.preventDefault();
    this.setState({ activeChat: parseInt(event.target.dataset.key) });
  };

  onFieldChange = event => {
    event.preventDefault();
    this.setState({ fieldValue: event.target.value });
  };

  onSubmitForm = event => {
    event.preventDefault();
    if (this.state.fieldValue !== '') {
      const chats = this.state.chatsItems
      chats[this.state.activeChat].messages.push({
        name: 'Вы',
        message: this.state.fieldValue,
        isYours: true,
      });
      this.setState({ chatsItems: chats });
      this.setState({ fieldValue: '' });
    }
  };

  onChatActionsClick = event => {
    event.preventDefault();
    this.setState({ showActions: false });
  };

  render() {
    return (
      <div className="chats-page">
        <div className="chats-header">
          <ul className="chats-menu">
            {_.map(menuItems, (item, key) => (
              <li
                key={key}
                className={classNames([
                  'camera-menu-item',
                  { active: this.state.activeSlide === key },
                ])}
                onClick={this.onMenuClick}
                data-key={key}
              >
                {item}
              </li>
            ))}
          </ul>
          <button className="add-chat-action">+ НОВОЕ ОБСУЖДЕНИЕ</button>
        </div>
        <div className="chats">
          <ul className="chats-list">
            {_.map(this.state.chatsItems, (item, key) => (
              <li
                key={key}
                className={classNames([
                  'chats-item',
                  { active: this.state.activeChat === key },
                ])}
                onClick={this.onChatClick}
                data-key={key}
              >
                <div data-key={key} className="chats-title">{item.title}</div>
                <div data-key={key} className="chats-description-wrapper">
                  <div data-key={key} className="chats-description">{item.preview}</div>
                  <div data-key={key} className="chats-date">{item.date}</div>
                </div>
              </li>
            ))}
          </ul>
          {_.get(this.state.chatsItems, [this.state.activeChat, 'type']) === "chat" &&
            <div className="active-chat">
              <ul>
                {_.map(_.get(this.state.chatsItems, [this.state.activeChat, 'messages']), (item, key) => (
                  <li
                    key={key}
                    className={classNames([
                      'active-chats-item',
                      { 'active-chats-item-yours': item.isYours },
                    ])}
                    onClick={this.onChatClick}
                    data-key={key}
                  >
                    <div className="active-chats-title">{item.name}</div>
                    <div className="active-chats-message">{item.message}</div>
                  </li>
                ))}
              </ul>
              <form className="chat-form" onSubmit={this.onSubmitForm}>
                <input value={this.state.fieldValue} onChange={this.onFieldChange} className="chat-form-text-input" placeholder="сообщение" type="text"/>
                <button type="submit" className="chat-form-button">ОТПР.</button>
              </form>
            </div>
          }

          {_.get(this.state.chatsItems, [this.state.activeChat, 'type']) === "voting" &&
            <div className="active-chat">
              <div className="voting-title">{_.get(this.state.chatsItems, [this.state.activeChat, 'title'])}</div>
              <div className="voting-description">{_.get(this.state.chatsItems, [this.state.activeChat, 'description'])}</div>
              <img className="voting-image" src={_.get(this.state.chatsItems, [this.state.activeChat, 'img'])} alt="icon" />
              {
                this.state.showActions &&
                <div className="voting-actions">
                  {_.map(_.get(this.state.chatsItems, [this.state.activeChat, 'actions']), (item, key) => (
                    <button onClick={this.onChatActionsClick} key={key} className="voting-action">{item}</button>
                  ))}
                </div>
              }
            </div>
          }
        </div>
      </div>
    );
  }
}
