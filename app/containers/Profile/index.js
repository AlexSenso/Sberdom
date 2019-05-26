import React from 'react';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import axios from 'axios';

import CloseIcon from '../../components/Header/img/close.svg';
import './Profile.scss';
import _ from "lodash";
import classNames from "classnames";

const menuItems = [
  'МОЙ ПРОФИЛЬ',
  'ПОКАЗАНИЯ И СЧЕТА'
]

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPaymentForm: false,
      paymentUrl: './',
    };
  }

  handleClose = e => {
    e.preventDefault();
    this.setState({ isPaymentForm: false });
  };

  handleClick = e => {
    e.preventDefault();
    this.setState({ isPaymentForm: true });
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const dateTime = `${mm}${dd}${yyyy}${Date.now()}`;

    axios
      .post('https://securepay.tinkoff.ru/v2/Init', {
        TerminalKey: '1507904168601',
        Amount: 5000,
        // Amount: 100,
        OrderId: dateTime,
        Description: 'name: , phone: , description:',
      })
      .then(response => {
        this.setState({ isPaymentForm: true });
        this.setState({ paymentUrl: response.data.PaymentURL });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {

    return (
    <div className="service-page">
      <ul className="service-menu">
        {_.map(menuItems, (item, key) => (
          <li
            key={key}
            className={classNames([
              'service-menu-item',
              { active: this.state.activeSlide === key },
            ])}
            onClick={this.onMenuClick}
            data-key={key}
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="service-lists">
        <ul className="service-list">
          <li onClick={this.handleClick} className="box-item service-item-wrapper">
            <div className="service-item">
              <div className="service-item-title-wrapper">
                <div className="service-item-title">Май 2019</div>
                <div className="service-item-cost-red">155.0 ₽</div>
              </div>
              <div className="service-item-description">
                Водоснабжение, электроэнергия, ремонт дома
              </div>
              <div className="service-item-pay">
                ОПЛАТИТЬ
              </div>
            </div>
          </li>
          <Dialog
            onClose={this.handleClose}
            open={this.state.isPaymentForm}
            PaperProps={{
              className: 'popup',
              style: {
                maxWidth: '100%',
                marginLeft: '0',
                marginRight: '0',
              },
            }}
          >
            <DialogTitle>
              <a href="/" className="close" onClick={this.handleClose}>
                <img src={CloseIcon} alt="close" className="close_img" />
              </a>
            </DialogTitle>
            <DialogContent>
              <div className="pay_iframe_wrapper">
                <iframe
                  title="paymentFrame"
                  src="http://18.188.91.108/payWater"
                  width="100%"
                  height="100%"
                  align="left"
                />
              </div>
            </DialogContent>
          </Dialog>
          <li className="box-item service-item-wrapper">
            <div className="service-item">
              <div className="service-item-title-wrapper">
                <div className="service-item-title">Апрель 2019</div>
                <div className="service-item-cost-green">2050.55 ₽</div>
              </div>
              <div className="service-item-description">
                Водоснабжение, электроэнергия, ремонт дома
              </div>
              <div className="service-item-pay">
                ОПЛАЧЕНО
              </div>
            </div>
          </li>
          <li className="box-item service-item-wrapper">
            <div className="service-item">
              <div className="service-item-title-wrapper">
                <div className="service-item-title">Март 2019</div>
                <div className="service-item-cost-green">1080.90 ₽</div>
              </div>
              <div className="service-item-description">
                Водоснабжение, электроэнергия, ремонт дома
              </div>
              <div className="service-item-pay">
                ОПЛАЧЕНО
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    );
  }
}
