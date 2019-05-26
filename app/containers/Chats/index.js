import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

import './Chats.scss';

const menuItems = [
  'ОБСУЖДЕНИЯ',
  'МОИ СОСЕДИ',
  'ЖАЛОБЫ И ПРЕДЛОЖЕНИЯ',
]

const ChatsItems = [
  {
    title: 'Василий Сорокин 331',
    date: '25 мая 2019 / 19:44',
    preview: 'Привет! У нас есть мысль поста',
    messages: [
      {
        name: 'Василий',
        message: 'Привет! У нас есть мысль поставить камеры на эатже — в этом месяце две кражи ( Цена вопроса 2000₽ с человека. Впишишься?',
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
    title: 'Голосование: Судьба дерева',
    date: '24 мая 2019 / 12:20',
    preview: 'Привет! У нас есть мысль поста',
    messages: [
      {
        name: 'Василий',
        message: 'Привет! У нас есть мысль поставить камеры на эатже — в этом месяце две кражи ( Цена вопроса 2000₽ с человека. Впишишься?',
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
]

export default class Chats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSlide: 0,
      activeChat: 0,
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

  onSubmitForm = event => {
    event.preventDefault();
  };

  render() {
    console.log('activeChat', this.state.activeChat)
    return (
      <div className="chats-page">
        <ul className="camera-menu">
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
        <div className="chats">
          <ul className="chats-list">
            {_.map(ChatsItems, (item, key) => (
              <li
                key={key}
                className="chats-item"
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
          <div className="active-chat">
            <ul>
              {_.map(_.get(ChatsItems, [this.state.activeChat, 'messages']), (item, key) => (
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
              <input className="chat-form-text-input" placeholder="сообщение" type="text"/>
              <button type="submit" className="chat-form-button">ОТПР.</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
