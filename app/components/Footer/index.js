import React from 'react';

import PolicyPdf from '../../files/privacy_policy.pdf';

import Footer2 from './img/footer_2.svg';
import Footer3 from './img/footer_3.svg';
import Footer4 from './img/footer_4.svg';
import Footer5 from './img/footer_5.svg';
import FooterLogo from './img/footer_logo.svg';

import './Footer.scss';

function Footer() {
  return (
    <footer className="footer testfoot">
      <div className="wrapper">
        <div className="footer__block">
          <img src={FooterLogo} alt="logo" className="footer_logo" />
          <div className="footer__cell">
            <div className="footer__subcell">
              <p className="footer__subcell_text">Мы с соцсетях</p>
              <a
                href="https://www.instagram.com/ovsyankafood"
                target="_blank"
                className="footer__subcell_link"
              >
                <div className="footer_ic inst_icon" />
              </a>
            </div>
            <div className="footer__subcell">
              <p className="footer__subcell_text">Заказ по телефону</p>
              <a href="tel:+73812288557" className="footer__subcell_link">
                <img src={Footer4} alt="phone" className="footer_ic" />
                +7 (3812) 288-557
              </a>
            </div>
            <div className="footer__subcell">
              <p className="footer__subcell_text">Оплата по картам </p>
              <img src={Footer5} alt="pay" className="footer_ic" />
              <img src={Footer2} alt="pay" className="footer_ic" />
              <img src={Footer3} alt="pay" className="footer_ic" />
            </div>
          </div>
          <div className="footer__cell">
            <div className="footer__subcell">
              <a
                href={PolicyPdf}
                target="_blank"
                className="footer__subcell_link"
              >
                Политика конфиденциальности
              </a>
            </div>
            <div className="footer__subcell">
              <p className="footer__subcell_text">
                Цены на сайте указаны с учетом всех возможных скидок
              </p>
            </div>
            <div className="footer__subcell">
              <p className="footer__subcell_text">
                Вопросы и предложения направлять на&nbsp;
                <a
                  href="mailto:ovsyankafood@mail.ru"
                  className="footer__subcell_link"
                >
                  ovsyankafood@mail.ru
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
