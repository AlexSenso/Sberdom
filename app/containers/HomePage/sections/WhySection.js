import React from 'react';

import Why1 from './img/why_1.svg';
import Why2 from './img/why_2.svg';
import Why3 from './img/why_3.svg';
import Why4 from './img/why_4.svg';

import './WhySection.scss';

function WhySection() {
  return (
    <section className="section_why">
      <div className="why">
        <div className="wrapper">
          <div className="title">
            <p className="title_text">Почему выбирают нас?</p>
          </div>
          <div className="why__block">
            <div className="why__elem">
              <img className="why__elem_img" src={Why1} alt="icon" />
              <p className="why__elem_text">
                Мы знаем все о<br />
                женском питании
              </p>
            </div>
            <div className="why__elem">
              <img className="why__elem_img" src={Why2} alt="icon" />
              <p className="why__elem_text">
                Мы доказали, что <br />
                правильное питание <br />
                доставляет удовольствие
              </p>
            </div>
            <div className="why__elem">
              <img className="why__elem_img" src={Why3} alt="icon" />
              <p className="why__elem_text">
                Мы используем только <br />
                свежие, сезонные продукты
              </p>
            </div>
            <div className="why__elem">
              <img className="why__elem_img" src={Why4} alt="icon" />
              <p className="why__elem_text">
                Наши курьеры всегда <br />
                приезжают вовремя
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhySection;
