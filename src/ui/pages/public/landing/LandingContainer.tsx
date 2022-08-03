import React from 'react';

import './css/bootstrap.min.css';
import './css/custom.scss';
import './css/animate.min.css';
import './css/link-custom.css';
import './css/slider-custom.css';
import './css/scroll-custom.css';
import './css/index.scss';
import { NavLink } from 'react-router-dom';

import images from './images/index';

export const LandingContainer = () => (
  <div className="bg-white landing-body" data-theme-style="light">
    <div
      id="home"
      style={{
        background:
          'linear-gradient(to right bottom, rgb(0, 255, 255), rgb(0, 115, 255) 50%, rgb(170, 90, 255))',
      }}>
      <nav id="navbar" className="navbar navbar-main navbar-expand-lg navbar-light">
        <div className="container" style={{}}>
          <a className="navbar-brand" href="https://uniblog.ru/">
            <img
              src={images.Logo}
              className="img-fluid navbar-logo landing-img"
              alt="Website Logo"
            />
          </a>
        </div>
        <button
          className="btn navbar-custom-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#main_navbar"
          aria-controls="main_navbar"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <i className="fa fa-fw fa-bars" />
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="main_navbar">
          <div className="dropdown mb-2" style={{ marginRight: '5%' }}>
            <a
              className="dropdown-toggle clickable"
              id="language_switch"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              <i className="fa fa-fw fa-language text-muted" /> Язык
            </a>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="language_switch">
              <h6 className="dropdown-header">Выбрать язык</h6>
              <a className="dropdown-item" href="https://uniblog.org/">
                <i className="fa fa-fw fa-sm fa-circle-notch mr-1 text-success" />
                английский
              </a>
              <a className="dropdown-item" href="https://uniblog.ru/">
                <i className="fa fa-fw fa-sm fa-check mr-1 text-muted" />
                русский
              </a>
            </div>
          </div>
          <ul className="navbar-nav">
            <li className="nav-item d-flex align-items-center">
              <NavLink to="/home" className="btn btn-sm btn-outline-primary">
                <i className="fa fa-fw fa-sm fa-sign-in-alt" /> Вход
              </NavLink>
              {/* https://uni-blog.ru/login */}
            </li>
            <li className="nav-item d-flex align-items-center">
              <NavLink to="/coming-soon" className="btn btn-sm btn-primary">
                <i className="fa fa-fw fa-sm fa-plus" />
                Регистрация
              </NavLink>
              {/* https://uni-blog.ru/register */}
            </li>
          </ul>
        </div>
      </nav>
      <section>
        <main className="animate__animated animate__fadeIn landing-main">
          {/* <section class="bg-marketing d-table w-100" style="background:url(images/fon2.png)" id="home"> */}
          <div className="container">
            <div className="row justify-content-center mt-1">
              <div className="col-lg-7 col-md-7 text-center">
                <div className="title-heading mt-0 mt-md-0 mt-0 mt-sm-0 pt-2 pt-sm-0">
                  <h3 className="heading mb-3 landing-h3">
                    Мы пока ещё &quot;допиливаем&quot; наш сервис
                  </h3>
                  <p className="heading mb-3">
                    Привет, меня зовут Евгений. Я один из основателей сервиса. Связь со мной:
                  </p>
                  <div className="mt-0 pt-0">
                    <a
                      href="https://linkii.ru/evgenykrasikov"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasRight"
                      aria-controls="offcanvasRight"
                      className="btn btn-outline-primary mt-0">
                      Моя мультиссылка
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="index-container" style={{ padding: '100px' }}>
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="text-left">
                    <h1 className="index-header mb-3">
                      Всё по одной ссылке:{' '}
                      <div className="card">
                        <h1>
                          {/* scroll title */}
                          <div className="scroller">
                            <span>
                              Бизнес💰
                              <br />
                              Контакты🎫
                              <br />
                              Соцсети🧩
                              <br />
                              Личный бренд🦹
                            </span>
                          </div>
                        </h1>
                      </div>
                    </h1>
                    <p className="index-subheader text-gray-700 mb-3">
                      Создавайте страницы-визитки для себя и своего бизнеса с ссылками на все нужные
                      соцсети и получайте удобный инструмент, аналитику, кросспостинг
                    </p>
                    <div>
                      <NavLink
                        to="/coming-soon"
                        className="btn btn-primary index-button"
                        style={{ marginRight: '5px' }}>
                        Попробовать
                      </NavLink>
                      <NavLink to="/home" className="btn btn-primary index-button">
                        Вход
                      </NavLink>
                    </div>
                  </div>
                </div>
                <div className="d-none d-lg-block col col-index-image">
                  <img src={images.hero1} className="index-image landing-img" alt="#" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
    <div className="container mt-10">
      <div className="row">
        <div className="col-md-6">
          <img
            src={images.presentation1}
            className="img-fluid shadow landing-img"
            loading="lazy"
            alt="#"
          />
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <div>
            <span className="fa-stack fa-2x">
              <img className="image-icon landing-img" src={images.icon1} alt="#" />
            </span>
            <h2 className="mt-3 landing-h2">Всё в одном месте</h2>
            <p className="mt-3">
              Представьте, что: Вам больше не нужно заходить в 4-5 кабинетов, чтобы увидёт нужные
              данные. Что не нужно изворачиваться, чтобы уместить все контакты и информацию в одно
              поле шабки заголовка профиля в соцсети. Что вы можете показать всю информацию так, как
              хотите Вы, а не как это заложено дизайном аккаунта.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="container mt-10">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center">
          <div>
            <span className="fa-stack fa-2x">
              <img className="image-icon landing-img" src={images.icon2} alt="#" />
            </span>
            <h2 className="mt-3 landing-h2">Мультиссылка Linkii</h2>
            <p className="mt-3">
              Создавайте собственную страницу со всем необходимым на ней - ссылками на все соц.сети,
              текстами, видео и фото, вашими любимые треки, описанием ваших товаров и услуг.
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <img
            src={images.presentation2}
            className="img-fluid shadow landing-img"
            loading="lazy"
            alt="#"
          />
        </div>
      </div>
    </div>
    <div className="container mt-10">
      <div className="row">
        <div className="col-md-6">
          <img
            src={images.presentation3}
            className="img-fluid shadow landing-img"
            loading="lazy"
            alt="#"
          />
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <div>
            <span className="fa-stack fa-2x">
              <img className="image-icon landing-img" src={images.icon3} alt="#" />
            </span>
            <h2 className="mt-3 landing-h2">Кросспостинг</h2>
            <p className="mt-3">
              Создавайте и публикуйте свой контент СРАЗУ во всех свои сети и мессенджеры за пару
              кликов.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="container mt-10">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center">
          <div>
            <span className="fa-stack fa-2x">
              <img className="image-icon landing-img" src={images.icon4} alt="#" />
            </span>
            <h2 className="mt-3 landing-h2">Аналитика всех сетей в одном месте</h2>
            <p className="mt-3">
              Просто и наглядно отслеживайте успехи всех ваших соц.сетей на одном экране.
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <img
            src={images.presentation5}
            className="img-fluid shadow landing-img"
            loading="lazy"
            alt="#"
          />
        </div>
      </div>
    </div>
    <div className="container mt-10">
      <div className="text-center mb-8">
        <h2 className="landing-h2">Наша Команда</h2>
        <p className="text-muted">
          Мы отправились в это увлекательное плаванье за новым опытом и достижениями
        </p>
      </div>
      <div className="team">
        <div className="team-item">
          <h2 className="mt-5 landing-h2">
            <pre>Инвестиции</pre>
          </h2>
          <div className="col-md-3">
            <img
              src={images.CEO}
              width={600}
              height={600}
              className="img-fluid shadow landing-img landing-img_avatar"
              loading="lazy"
              style={{
                background: `linear-gradient(to right bottom, rgb(0, 255, 255), rgb(0, 115, 255) 50%, rgb(170, 90, 255)`,
              }}
              alt="#"
            />
          </div>
          <p className="mt-3">
            Георгий отвечает за внешнее представление компании и стратегическое развитие
          </p>
          <div className="col-md-3" />
        </div>
        <div className="team-item">
          <h2 className="mt-5 landing-h2">
            <pre>Продукт</pre>
          </h2>
          <div className="col-md-3">
            <a href="https://t.me/Evgeny163" title="Давай познакомимся в tg">
              <img
                src={images.CPO}
                width={600}
                height={600}
                className="img-fluid shadow landing-img landing-img_avatar"
                loading="lazy"
                style={{
                  background: `linear-gradient(to right bottom, rgb(0, 255, 255), rgb(0, 115, 255) 50%, rgb(170, 90, 255)`,
                }}
                alt="#"
              />
            </a>
          </div>
          <p className="mt-3">Евгений отвечает за продуктовое виденье и ведение проектов</p>
          <div className="col-md-3" />
        </div>
        <div className="team-item">
          <h2 className="mt-5 landing-h2">
            <pre>Офис</pre>
          </h2>
          <div className="col-md-3">
            <a href="https://t.me/s_ulyashenkov" title="Давай познакомимся в tg">
              <img
                src={images.COO}
                width={600}
                height={600}
                className="img-fluid shadow landing-img landing-img_avatar"
                loading="lazy"
                style={{
                  background: `linear-gradient(to right bottom, rgb(0, 255, 255), rgb(0, 115, 255) 50%, rgb(170, 90, 255)`,
                }}
                alt="#"
              />
            </a>
          </div>
          <p className="mt-3">
            Сергей занимается операционным управлением и юридическими вопросами
          </p>
          <div className="col-md-3" />
        </div>
        <div className="team-item">
          <h2 className="mt-5 landing-h2">
            <pre>Технологии</pre>
          </h2>
          <div className="col-md-3">
            <img
              src={images.CTO}
              width={600}
              height={600}
              className="img-fluid shadow landing-img landing-img_avatar"
              loading="lazy"
              style={{
                background: `linear-gradient(to right bottom, rgb(0, 255, 255), rgb(0, 115, 255) 50%, rgb(170, 90, 255)`,
              }}
              alt="#"
            />
          </div>
          <p className="mt-3">Михаил отвечает за технологии и разработку</p>
          <div className="col-md-3" />
        </div>
      </div>
    </div>
    <div className="container mt-10">
      <div className="text-center mb-8">
        <h2 className="landing-h2">Тарифный план</h2>
        <p className="text-muted">
          Основной функционал доступен в бесплатном тарифе Basic. Чтобы сделать свою страницу более
          эффективной, используйте тарифы PRO и BUSINESS.
        </p>
      </div>
      <div>
        <div className="row justify-content-around">
          <div className="col-12 col-md-6 col-lg-4 p-3">
            <div className="pricing-plan rounded" style={{}}>
              <div className="pricing-header">
                <span className="btn btn-lg btn-block btn-primary">Basic</span>
                <div className="pricing-price">
                  <span className="pricing-price-amount">0 ₽</span>
                </div>
                <div className="pricing-details">Доступен основной функционал</div>
              </div>
              <div
                className="pricing-body d-flex flex-column justify-content-between"
                style={{ background: 'transparent' }}>
                <ul className="pricing-features">
                  <li>
                    <div className="">
                      <span data-toggle="-----------">
                        <i className="fa fa-fw fa-sm fa-link mr-1" />
                        Любое количество ссылок
                      </span>
                    </div>
                    <i className="fa fa-fw fa-sm fa-check-circle text-success" />
                  </li>
                  <li>
                    <div className="">
                      <span data-toggle="tooltip" title="-----------">
                        <i className="fa fa-fw fa-sm fa-pen-nib mr-1" />
                        Текстовые блоки и заголовки
                      </span>
                    </div>
                    <i className="fa fa-fw fa-sm fa-check-circle text-success" />
                  </li>
                  <li>
                    <div className="">
                      <span data-toggle="tooltip" title="-----------">
                        <i className="fa fa-fw fa-sm fa-paint-brush mr-1" />
                        Готовые шаблоны
                      </span>
                    </div>
                    <i className="fa fa-fw fa-sm fa-check-circle text-success" />
                  </li>
                  <li>
                    <div className="">
                      <span data-toggle="tooltip" title="-----------">
                        <i className="fa fa-fw fa-sm fa-fill mr-1" /> Ваш собственный дизайн
                      </span>
                    </div>
                    <i className="fa fa-fw fa-sm fa-check-circle text-success" />
                  </li>
                  <li>
                    <div className="">
                      <span data-toggle="tooltip" title="-----------">
                        <i className="fa fa-fw fa-sm fa-hashtag mr-1" />
                        Кнопка перехода на основной сайт
                      </span>
                    </div>
                    <i className="fa fa-fw fa-sm fa-check-circle text-success" />
                  </li>
                  <li>
                    <div className="">
                      <span data-toggle="tooltip" title="-----------">
                        <i className="fa fa-fw fa-sm fa-forward mr-1" />
                        Кнопки социальных сетей
                      </span>
                    </div>
                    <i className="fa fa-fw fa-sm fa-check-circle text-success" />
                  </li>
                </ul>
                <br />
                <br />
                <br />
                <br />
                <NavLink to="/coming-soon" className="btn btn-lg btn-block btn-primary">
                  {/* https://uniblog.ru/oplata2 */}
                  Выбрать тариф
                </NavLink>
              </div>
            </div>
          </div>
          <div
            className="col-12 col-md-6 col-lg-4 p-3"
            data-plan-monthly="true"
            data-plan-annual="true"
            data-plan-lifetime="true">
            <div className="pricing-plan rounded" style={{}}>
              <div className="pricing-header">
                <span className="btn btn-lg btn-block btn-primary">PRO</span>
                <div className="pricing-price">
                  <span className="pricing-price-amount">90 ₽\м</span>
                  <div
                    className="pricing-price-currency"
                    title="По мере расширения функционала цена может расти"
                    style={{ color: 'red' }}>
                    скидка!
                  </div>
                </div>
                <div className="pricing-details">Весь Функцианал Всего за 1080 ₽ в год</div>
              </div>
              <div
                className="pricing-body d-flex flex-column justify-content-between"
                style={{ background: 'transparent' }}>
                <ul className="pricing-features">
                  <li>
                    <div className="">
                      <span data-toggle="tooltip" title="-----------">
                        <i className="fa fa-fw fa-sm fa-globe mr-1" /> Всё, что есть в тарифе Basic
                      </span>
                    </div>
                    <i className="fa fa-fw fa-sm fa-check-circle text-success" />
                  </li>
                  <li>
                    <div className="">
                      <span data-toggle="tooltip" title="-----------">
                        <i className="fa fa-fw fa-sm fa-clock mr-1" />
                        Отображение блоков расписания
                        <b style={{ fontWeight: '700' }}>- СКОРО</b>
                      </span>
                    </div>
                    <i className="fa fa-fw fa-sm fa-check-circle text-muted" />
                  </li>
                  <li>
                    <div className="">
                      <span data-toggle="tooltip" title="-----------">
                        <i className="fa fa-fw fa-sm fa-chart-bar mr-1" />
                        Аналитика кликов{' '}
                      </span>
                    </div>
                    <i className="fa fa-fw fa-sm fa-check-circle text-success" />
                  </li>
                  <li>
                    <div className="">
                      <span data-toggle="-----------">
                        <i className="fa fa-fw fa-sm fa-eye mr-1" />
                        Вставка картинок и видео
                      </span>
                    </div>
                    <i className="fa fa-fw fa-sm fa-check-circle text-success" />
                  </li>
                  <li>
                    <div className="">
                      <span data-toggle="tooltip" title="-----------">
                        <i className="fa fa-fw fa-sm fa-search-plus mr-1" />
                        Географических карт <b style={{ fontWeight: '700' }}>- СКОРО</b>
                      </span>
                    </div>
                    <i className="fa fa-fw fa-sm fa-check-circle text-muted" />
                  </li>
                  <li>
                    <div className="">
                      <span data-toggle="tooltip" title="-----------">
                        <i className="fa fa-fw fa-sm fa-ad mr-1" /> Блок вопросов и ответов{' '}
                        <b style={{ fontWeight: '700' }}>- СКОРО</b>
                      </span>
                    </div>
                    <i className="fa fa-fw fa-sm fa-check-circle text-muted" />
                  </li>
                  <li>
                    <div className="">
                      <span data-toggle="-----------">
                        <i className="fa fa-fw fa-sm fa-paint-brush mr-1" /> Дополнительный обои
                      </span>
                    </div>
                    <i className="fa fa-fw fa-sm fa-check-circle text-success" />
                  </li>
                </ul>
                <br />
                <br />
                <NavLink to="/coming-soon" className="btn btn-lg btn-block btn-primary">
                  {/* https://uniblog.ru/oplata2 */}
                  Выбрать тариф
                </NavLink>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 p-3">
            <div className="pricing-plan rounded" style={{}}>
              <div className="pricing-header">
                <span className="btn btn-lg btn-block btn-primary">BUSINESS</span>
                <div className="pricing-price">
                  <span className="pricing-price-amount">от 1000 ₽</span>
                </div>
                <div className="pricing-details">Кастомное решение для вашего бизнеса</div>
              </div>
              <div
                className="pricing-body d-flex flex-column justify-content-between"
                style={{ background: 'transparent' }}>
                <ul className="pricing-features">
                  <li>
                    <div className="">
                      <span data-toggle="tooltip" title="----">
                        <i className="fa fa-fw fa-sm fa-lock mr-1" /> Всё, что есть в PRO-тарифе
                      </span>
                    </div>
                    <i className="fa fa-fw fa-sm fa-check-circle text-success" />
                  </li>
                  <li>
                    <div className="">
                      <span data-toggle="tooltip" title="----">
                        <i className="fa fa-fw fa-sm fa-lock mr-1" /> Берём на себя сборку страницы
                        и разработку дизайна
                      </span>
                    </div>
                    <i className="fa fa-fw fa-sm fa-check-circle text-success" />
                  </li>
                  <li>
                    <div className="">
                      <span data-toggle="tooltip" title="-----------">
                        <i className="fa fa-fw fa-sm fa-ad mr-1" /> Блок рекламной интеграции и
                        монетезации<b style={{ fontWeight: '700' }}>- СКОРО</b>
                      </span>
                    </div>
                    <i className="fa fa-fw fa-sm fa-check-circle text-muted" />
                  </li>
                  <li>
                    <div className="">
                      <span data-toggle="tooltip" title="-----------">
                        <i className="fa fa-fw fa-sm fa-ad mr-1" /> Блок вашего мерча для фанатов
                        <b style={{ fontWeight: '700' }}>- СКОРО</b>
                      </span>
                    </div>
                    <i className="fa fa-fw fa-sm fa-check-circle text-muted" />
                  </li>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </ul>
                <NavLink to="/coming-soon" className="btn btn-lg btn-block btn-primary">
                  {/* https://uniblog.ru/oplata2 */}
                  Выбрать тариф
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer
      className="d-print-none footer"
      style={{
        background:
          'linear-gradient(to left bottom, rgb(0, 255, 255), rgb(0, 115, 255) 30%, rgb(170, 90, 255))',
      }}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-4 mb-4 mb-sm-0">
            <div className="mb-2">
              <a className="h5 p-0" href="https://uniblog.ru/">
                UniBlog | Сервисы ведения бизнес-соцсетей в bio Vk, OK, TikTok, Telegram и т.п.{' '}
              </a>
            </div>
            <div>
              <p>UniBlog Inc. © 2022</p>
            </div>
          </div>
          <div className="col-12 col-sm-4 mb-4 mb-sm-0">
            <div className="mb-2">
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
            <div className="dropdown mb-2">
              <a
                className="dropdown-toggle clickable"
                id="language_switch"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                <i className="fa fa-fw fa-language text-muted" />
                &nbsp; Язык
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="language_switch">
                <h6 className="dropdown-header">Изменить язык</h6>
                <a className="dropdown-item" href="https://uniblog.org/">
                  <i className="fa fa-fw fa-sm fa-circle-notch mr-1 text-success" />
                  английский{' '}
                </a>
                <a className="dropdown-item" href="https://uniblog.ru/">
                  <i className="fa fa-fw fa-sm fa-check mr-1 text-muted" />
                  русский{' '}
                </a>
              </div>
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
    </footer>

    <input type="hidden" name="global_url" defaultValue="https://uniblog.ru/" />
    <input type="hidden" name="global_token" defaultValue="138b5d725d0e926187b8973fdedc33c3" />
    <input type="hidden" name="global_number_decimal_point" defaultValue="." />
    <input type="hidden" name="global_number_thousands_separator" defaultValue="," />
    {/* <script> */}
    {/*  /* So window.altum = {}; let global_token = */}
    {/*  document.querySelector('input[name="global_token"]').value; let url = */}
    {/*  document.querySelector('input[name="global_url"]').value; let decimal_point = */}
    {/*  document.querySelector('[name="global_number_decimal_point"]').value; let thousands_separator */}
    {/*  = document.querySelector('[name="global_number_thousands_separator"]').value; */}
    {/* </script> */}
  </div>
);
