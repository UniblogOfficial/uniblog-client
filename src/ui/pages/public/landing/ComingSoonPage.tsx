import React from 'react';

import images from './images/index';

export const ComingSoonPage = () => (
  <>
    <nav
      id="navbar"
      className="navbar navbar-main navbar-expand-lg navbar-light
"
      style={{ background: `url(${images.fon2})` }}>
      <div className="container">
        <a className="navbar-brand" href="https://uniblog.ru/">
          <img src={images.Logo} className="img-fluid navbar-logo landing-img" alt="Website Logo" />
        </a>
        <a
          href="https://linkii.ru/evgenykrasikov"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
          className="btn btn-outline-primary mt-0">
          Мультиссылка основателя
        </a>
      </div>
    </nav>
    <div className="container mt-10">
      <div className="row">
        <div className="col-md-6">
          <img
            src={images.presentation5}
            className="img-fluid shadow landing-img"
            style={{ backgroundColor: '#fff' }}
            loading="lazy"
            alt=""
          />
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <div>
            <span className="fa-stack fa-2x">
              <img className="image-icon landing-img" src={images.icon5} alt="" />
            </span>
            <h2 className="mt-3">Мы работаем над нашим сервисом</h2>
            <p className="mt-3">
              Мы не хотим исказить первое впечатление о нашем продукте и всё ещё продолжаем его
              закрытое тестирование, отладку и пока не готовы дать публичный доступ :( &nbsp; <br />
              Скоро мы закончим и будем готовы поделиться с вами: <br />
              - Личному кабинету <br />
              - Конструктору Кросспостинга <br />
              - Конструктору Мультиссылок <br />
              <br />
              Мы рады предложить вам воспользоваться нашим сервисом, как beta - пользователь. Для
              этого напишите нам в{' '}
              <a
                href="https://t.me/Uniblog_chat"
                target="_self"
                style={{ textDecoration: 'underline' }}>
                <b>Техническую поддержку</b>
              </a>
              <br />
              <br />
              Спасибо за понимание!
            </p>
          </div>
        </div>
      </div>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-4 mb-4 mb-sm-0">
          <div className="mb-2">
            <a className="h5 p-0" href="https://uniblog.ru/">
              UniBlog | страницы и короткие ссылки для Vk, OK, Instagram, TikTok, Telegram и т.п.{' '}
            </a>
          </div>
          <div>
            <p>UniBlog Inc. © 2022</p>
          </div>
        </div>
        <div className="col-12 col-sm-4 mb-4 mb-sm-0">
          <div className="mb-2">
            <br />
            <span className="mr-2">
              <a
                target="_blank"
                href="mailto:kracko23@mail.ru"
                title="Email"
                className="no-underline"
                rel="noreferrer">
                <i className="fa fa-envelope fa-fw fa-lg" />
                &nbsp; Наша почта
              </a>
            </span>
          </div>
        </div>
        <div className="col-12 col-sm-4 mb-4 mb-sm-0">
          <a href="https://uniblog.online/documents/" target="_self">
            Пользовательское соглашение
          </a>
          <br />
          <a href="https://uniblog.online/documents/index_2.html" target="_self">
            Политика конфиденциальности
          </a>
          <br />
          <a href="https://t.me/Uniblog_chat" target="_self">
            Техническая поддержка
          </a>
          <br />
        </div>
      </div>
    </div>
    <input type="hidden" name="global_url" defaultValue="https://uniblog.ru/" />
    <input type="hidden" name="global_token" defaultValue="138b5d725d0e926187b8973fdedc33c3" />
    <input type="hidden" name="global_number_decimal_point" defaultValue="." />
    <input type="hidden" name="global_number_thousands_separator" defaultValue="," />
  </>
);
