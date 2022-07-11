import React from 'react';

import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { Breadcrumbs } from 'ui/components/elements/breadcrumbs/Breadcrumbs';
import { Button } from 'ui/components/elements/button/Button';
import { PageHeader } from 'ui/components/modules/headers/PageHeader';

type TPriceContainerProps = {};

export const PriceContainer = () => {
  const { t } = useTranslation(['pages', 'common']);
  const onNichtKlickButtonClick = () => {
    const newWindow = document.open(
      `${process.env.REACT_APP_HOST_DEVELOPMENT}/purchase?t=wwcs9v`,
      '_blank',
      'width=777,height=666',
    );
  };
  return (
    <div className="price">
      <PageHeader pageTitle={t('pages:price.title')} />
      <main className="price__main grid">
        <div className="grid__row">
          <h1 className="page-title">{t('pages:price.title')}</h1>
        </div>
        <div className="grid__row">
          <section className="paper promo">
            <Button onClick={onNichtKlickButtonClick}>Klick mich nicht!</Button>
          </section>
        </div>
        <div className="grid__row">
          <section className="paper price-grid">
            <div className="price__header">
              <div className="payment-period">Период оплаты</div>
              <div className="period-switch">
                <Button className="period-button border-left">
                  В месяц<span>Стандартная цена</span>
                </Button>
                <Button variant="regular" className="period-button ">
                  За 3 месяца<span>Экономия 5%</span>
                </Button>
                <Button variant="regular" className="period-button">
                  За 6 месяцев<span>Экономия 10%</span>
                </Button>
                <Button variant="regular" className="period-button border-right">
                  За год<span>Экономия 10%</span>
                </Button>
              </div>
            </div>
            <div className="price__main">
              <div className="grid--container">
                <div className="grid--price-columns" />
                <div className="grid--price-columns toCenter plan-text">
                  Vip <div className="user-tariff">Мой тариф</div>
                </div>
                <div className="grid--price-columns toCenter plan-text">Gold</div>
                <div className="grid--price-columns toCenter plan-text">Platinum</div>
                <div className="grid--price-columns">
                  <div className="left-margin">Punkt1</div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-included">Есть</div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-included">Есть</div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-included">Есть</div>
                </div>
                <div className="grid--price-columns">
                  <div className="left-margin">Punkt1</div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-included">Есть</div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-included">Есть</div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-included">Есть</div>
                </div>
                <div className="grid--price-columns ">
                  <div className="left-margin">Punkt1</div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-not-included">Нету</div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-included">Есть</div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-included">Есть</div>
                </div>
                <div className="grid--price-columns ">
                  <div className="left-margin">Punkt1</div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-not-included">Нету</div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-not-included">Нету</div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-included">Есть</div>
                </div>
                <div className="grid--price-columns ">
                  <div className="left-margin">Punkt1</div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-not-included">Нету</div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-not-included">Нету</div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-included">Есть</div>
                </div>
                <div className="grid--price-columns " />
                <div className="grid--price-columns toCenter price-columns">
                  3600 рублей <div>в месяц</div>
                </div>
                <div className="grid--price-columns toCenter price-columns">
                  5900 рублей <div>в месяц</div>
                </div>
                <div className="grid--price-columns toCenter price-columns">
                  6900 рублей <div>в месяц</div>
                </div>
                <div className="grid--price-columns noneBorder" />
                <div className="grid--price-columns toCenter noneBorder">
                  <Button>Оплатить</Button>
                </div>
                <div className="grid--price-columns toCenter noneBorder">
                  <Button>Оплатить</Button>
                </div>
                <div className="grid--price-columns toCenter noneBorder">
                  <Button>Оплатить</Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
