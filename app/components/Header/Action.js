import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import axios from 'axios';
import classNames from 'classnames';

import LogoIcon from './img/logo.svg';
import CloseIcon from './img/close.svg';
import PhoneIcon from './img/popup_phone.svg';

import './Action.scss';

/* eslint-disable react/prefer-stateless-function */
class Action extends React.Component {
  state = {
    open: false,
    isCallbackOrdered: false,
    phoneValue: null,
    isValid: true,
  };

  handleClickOpen = e => {
    e.preventDefault();
    this.setState({
      open: true,
      isCallbackOrdered: false,
    });
    ym(50164801, 'reachGoal', 'call_me_button_click');
    return true;
  };

  handleClose = e => {
    e.preventDefault();
    this.setState({ open: false });
  };

  handleInputChange = value => {
    this.setState({ phoneValue: value });
    this.setState({ isValid: true });
  };

  handleClickCallback = e => {
    e.preventDefault();
    const isValid = isValidPhoneNumber(this.state.phoneValue);
    if (isValid) {
      axios
        .post('/api/order/call', {
          phone: this.state.phoneValue,
        })
        .then(() => {
          this.setState({ isCallbackOrdered: true });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.setState({ isValid: false });
    }

    ym(50164801, 'reachGoal', 'call_me_form_order');
    return true;
  };

  render() {
    const { open, isCallbackOrdered, phoneValue, isValid } = this.state;

    return (
      <div className="action">
        <div className="wrapper">
          <div className="action__block">
            <div className="logo">
              <a href="/" className="logo__link">
                <img className="logo__img" src={LogoIcon} alt="logo" />
              </a>
            </div>
            <div className="action__inform">
              <p className="action__inform_text">
                <b>Заказ:</b> будни 10:00 до 16:00, выходные 10:00 до 14:00.
              </p>
              <p className="action__inform_text">
                <b>Доставка:</b> на следующее утро — будни с 07:00 до 11:00,
                <br /> выходные с 08:00 до 11:00
              </p>
              <p className="action__inform_text">
                Доставка бесплатная при заказе от 1000 руб.
              </p>
            </div>
            <div className="action__contact">
              <a
                href="tel:+7 (3812) 288-557"
                onClick={() => {
                  ym(50164801, 'reachGoal', 'header_phone');
                  return true;
                }}
                className="action__contact_link"
              >
                +7 (3812) 288-557
              </a>
              <a
                href="/"
                className="popup_link btn small"
                onClick={this.handleClickOpen}
              >
                Заказать звонок
              </a>
              <Dialog
                onClose={this.handleClose}
                open={open}
                PaperProps={{ className: 'popup' }}
              >
                <DialogTitle>
                  <a href="/" className="close" onClick={this.handleClose}>
                    <img src={CloseIcon} alt="close" className="close_img" />
                  </a>
                </DialogTitle>
                <DialogContent>
                  <div className="popup__title">
                    <img src={PhoneIcon} alt="img" className="popup_ic" />
                    <p className="popup__title_text">Заказать звонок</p>
                  </div>
                  {!isCallbackOrdered ? (
                    <form
                      id="popup_form"
                      className="popup_form call_me_form"
                      onSubmit={this.handleClickCallback}
                    >
                      <PhoneInput
                        country="RU"
                        countries={['RU']}
                        international={false}
                        showCountrySelect={false}
                        placeholder="Введите номер телефона"
                        value={phoneValue}
                        onChange={this.handleInputChange}
                        name="phone"
                        required
                        inputClassName={classNames(
                          'field',
                          !isValid && 'field_error',
                        )}
                      />
                      {/* {!isValid && ( */}
                      {/* <div className="field_validate_error"> */}
                      {/* Введите корректный номер */}
                      {/* <br /> телефона */}
                      {/* </div> */}
                      {/* )} */}
                      <button type="submit" className="btn">
                        Перезвоните нам
                      </button>
                    </form>
                  ) : (
                    <div>
                      <p className="popup__title_text">
                        Заявка на заказ звонка отправлена.
                      </p>
                      <br />
                      <p className="popup__title_text">
                        Совсем скоро мы Вам перезвоним.
                      </p>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Action;
