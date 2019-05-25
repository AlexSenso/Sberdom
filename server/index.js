/* eslint consistent-return:0 import/order:0 */

const express = require('express');
// const bodyParser = require('body-parser');
// const TelegramBot = require('node-telegram-bot-api');
const sendmail = require('sendmail')({ silent: false });

const logger = require('./logger');

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
// const myApi = require('./middlewares/myApi');

const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// const TOKEN = '691191726:AAEKmlvGE0iD2KPwrrRZEYEI2Ao1Ajl9rzU';
// const CHAT_ID = '-383424456';
// const emailFrom = 'info@ovsyanka55.ru';
// const emailTo = 'ovsyankafood@mail.ru';
// const bot = new TelegramBot(TOKEN, {
//   polling: {
//     interval: 2000,
//     params: {
//       timeout: 10,
//     },
//   },
// });

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
//
// app.post('/api/order/call', (req, res) => {
//   const message = `Поступил заказ звонка на номер ${req.body.phone}.`;
//   bot.sendMessage(CHAT_ID, message);
//   res.send(message);
//   sendmail({
//     from: emailFrom,
//     to: emailTo,
//     subject: 'Заказ звонка',
//     html: message,
//   });
// });

app.post('/api/order/cash', (req, res) => {
  const message = `Поступил заказ.\n Оплата при получении.\n Имя: ${
    req.body.name
  }.\n Номер телефона: ${req.body.phone}.\n Информация по заказу: ${
    req.body.message
  }.\n 
  Наименование: ${req.body.products}.\n
  На сумму: ${req.body.cost} руб.`;
  bot.sendMessage(CHAT_ID, message);
  res.send(message);

  const htmlCash = `<div>
    <p>Информация о заказе:</p>
    <ul>
      <li><b>Имя:</b> ${req.body.name}</li>
      <li><b>Тел.:</b> ${req.body.phone}</li>
      <li><b>Вид оплаты:</b> Наличными при получении</li>
      <li><b>Наименование заказа:</b> ${req.body.products}</li>
      <li><b>Сумма заказа:</b> ${req.body.cost} руб.</li>
      <li><b>Информация по заказу:</b> ${req.body.message}</li>
    </ul>
    <p>Письмо создано автоматически. Пожалуйста, не отвечайте на него!</p>
  </div>`;
  sendmail({
    from: emailFrom,
    to: emailTo,
    subject: 'Поступил заказ. Оплата при получении',
    html: htmlCash,
  });
});

app.post('/api/order/credit', (req, res) => {
  const message = `Пользователь перешёл к онлайн оплате.\n Имя: ${
    req.body.name
  }.\n Номер телефона: ${req.body.phone}.\n Информация по заказу: ${
    req.body.message
  }.\n 
  Наименование: ${req.body.products}.\n
  На сумму: ${req.body.cost} руб.\n
  ID заказа: ${req.body.orderId}`;
  bot.sendMessage(CHAT_ID, message);
  res.send(message);

  const htmlCredit = `<div>
    <p>Информация о заказе:</p>
    <ul>
      <li><b>Имя:</b> ${req.body.name}</li>
      <li><b>Тел.:</b> ${req.body.phone}</li>
      <li><b>Вид оплаты:</b> Интернет-банк</li>
      <li><b>Номер заказа:</b> ${req.body.orderId}</li>
      <li><b>Наименование заказа:</b> ${req.body.products}</li>
      <li><b>Сумма заказа:</b> ${req.body.cost} руб.</li>
      <li><b>Информация по заказу:</b> ${req.body.message}</li>
    </ul>
    <p>Письмо создано автоматически. Пожалуйста, не отвечайте на него!</p>
  </div>`;
  sendmail({
    from: emailFrom,
    to: emailTo,
    subject: 'Пользователь перешёл к онлайн оплате.',
    html: htmlCredit,
  });
});

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
