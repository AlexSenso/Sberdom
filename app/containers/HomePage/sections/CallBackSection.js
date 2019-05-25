import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import classNames from 'classnames';
import _ from 'lodash';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeSelectCost, makeSelectItems } from '../../ShoppingCart/selectors';
import CallbackImage from '../img/callback_img.png';
import CloseIcon from '../../../components/Header/img/close.svg';

class CallBackSection extends React.PureComponent {
  state = {
    isPaymentForm: false,
    paymentUrl: './',
    paymentType: 'cash',
    phoneValue: null,
    isValid: true,
    nameValue: '',
    textValue: '',
  };

  handleClose = e => {
    e.preventDefault();
    this.setState({ isPaymentForm: false });
  };

  handlePaymentChange = () => {
    this.setState(prevState => ({
      paymentType: prevState.paymentType === 'cash' ? 'card' : 'cash',
    }));
  };

  handleNameChange = e => {
    this.setState({ nameValue: e.target.value });
  };

  handlePhoneChange = value => {
    this.setState({ phoneValue: value });
    this.setState({ isValid: true });
  };

  // handleTextChange = e => {
  //   this.setState({ textValue: e.target.value });
  // };

  onSubmit = e => {
    e.preventDefault();
    const isValid = isValidPhoneNumber(this.state.phoneValue);
    if (isValid) {
      const { cost, items } = this.props;
      const { paymentType, nameValue, phoneValue, textValue } = this.state;

      const productsText = _.reduce(
        items,
        (result, item) => `${result}
       ${item.name} - ${item.amount} шт.,`,
        '',
      );

      if (paymentType === 'card') {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();

        const dateTime = `${mm}${dd}${yyyy}${Date.now()}`;

        axios
          .post('/api/order/credit', {
            phone: phoneValue,
            name: nameValue,
            message: textValue,
            products: productsText,
            cost,
            orderId: dateTime,
          })
          .then(() => {})
          .catch(error => {
            console.log(error);
          });

        axios
          .post('https://securepay.tinkoff.ru/v2/Init', {
            TerminalKey: '1507904168601',
            Amount: cost * 100,
            // Amount: 100,
            OrderId: dateTime,
            Description: `name: ${nameValue}, phone: ${phoneValue}, description: ${textValue}`,
          })
          .then(response => {
            this.setState({ isPaymentForm: true });
            this.setState({ paymentUrl: response.data.PaymentURL });
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        axios
          .post('/api/order/cash', {
            phone: phoneValue,
            name: nameValue,
            message: textValue,
            products: productsText,
            cost,
          })
          .then(() => {
            const orderedUrl = `${window.location.origin}/?ordered=true`;
            window.location.href = orderedUrl;
          })
          .catch(error => {
            console.log(error);
          });
      }
    } else {
      this.setState({ isValid: false });
    }
  };

  render() {
    const {
      paymentType,
      phoneValue,
      isValid,
      nameValue,
      // textValue,
    } = this.state;
    const { cost } = this.props;

    let buttonText;
    if (cost < 500) {
      buttonText = 'Онлайн заказ доступен от 500 руб.';
    } else if (paymentType === 'cash') {
      buttonText = 'Оформить заказ';
    } else {
      buttonText = 'Оформить и оплатить заказ';
    }
    return (
      <section className="section_callback" id="section_callback">
        <div className="callback">
          <div className="wrapper">
            <div className="title">
              <p className="title_text">
                Начните питаться правильно уже сегодня
              </p>
            </div>
            <div className="callback__block">
              <img className="callback_img" src={CallbackImage} alt="img" />
              <form
                className="form callback_form"
                id="form"
                onSubmit={this.onSubmit}
              >
                <input
                  type="text"
                  name="name"
                  value={nameValue}
                  required
                  placeholder="Ваше имя"
                  className="field"
                  onChange={this.handleNameChange}
                />
                <div className="phone_input_wrapper">
                  <PhoneInput
                    country="RU"
                    countries={['RU']}
                    international={false}
                    showCountrySelect={false}
                    placeholder="Введите номер телефона"
                    value={phoneValue}
                    onChange={this.handlePhoneChange}
                    name="phone2"
                    required
                    inputClassName={classNames(
                      'field',
                      !isValid && 'field_error',
                    )}
                  />
                  {/* {!isValid && ( */}
                  {/* <div className="field_validate_error call_me_phone_validation_error"> */}
                  {/* Введите корректный номер телефона */}
                  {/* </div> */}
                  {/* )} */}
                </div>
                {/* <textarea */}
                {/* name="text" */}
                {/* className="textarea" */}
                {/* placeholder="Укажите всю необходимую информацию по заказу" */}
                {/* value={textValue} */}
                {/* onChange={this.handleTextChange} */}
                {/* /> */}
                <div className="handle_payment_fields">
                  <div className="handle_payment_field">
                    <input
                      id="cash"
                      type="radio"
                      className="radio"
                      value="cash"
                      checked={paymentType === 'cash'}
                      onChange={this.handlePaymentChange}
                    />
                    <label htmlFor="cash" className="radio_label">
                      Оплата наличными при получении
                    </label>
                  </div>
                  <div className="handle_payment_field">
                    <input
                      id="card"
                      type="radio"
                      className="radio"
                      value="card"
                      checked={paymentType === 'card'}
                      onChange={this.handlePaymentChange}
                    />
                    <label htmlFor="card" className="radio_label">
                      Оплата картой
                    </label>
                  </div>
                </div>
                <button className="btn" type="submit" disabled={cost < 500}>
                  {buttonText}
                </button>
                <p className="form_subtext">
                  Пожалуйста, предупредите при заказе о наличии аллергии и
                  других непереносимостей продуктов. Заказ считается принятым
                  только после подтверждения его менеджером.
                </p>
              </form>
            </div>
          </div>
        </div>
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
                src={this.state.paymentUrl}
                width="100%"
                height="100%"
                align="left"
              />
            </div>
          </DialogContent>
        </Dialog>
      </section>
    );
  }
}

CallBackSection.propTypes = {
  cost: PropTypes.number.isRequired,
  items: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  cost: makeSelectCost(),
  items: makeSelectItems(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(CallBackSection);
