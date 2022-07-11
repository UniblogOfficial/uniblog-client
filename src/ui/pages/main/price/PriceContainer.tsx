import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { Breadcrumbs } from 'ui/components/elements/breadcrumbs/Breadcrumbs';
import { Button } from 'ui/components/elements/button/Button';
import { PageHeader } from 'ui/components/modules/headers/PageHeader';

type TPriceContainerProps = {};

export const PriceContainer = () => {
  const { t } = useTranslation(['pages', 'common']);
  const [periodButton, setPeriodButton] = useState<'1' | '2' | '3' | '4'>('4');
  const onNichtKlickButtonClick = () => {
    const newWindow = document.open(
      `${process.env.REACT_APP_HOST_DEVELOPMENT}/purchase?t=wwcs9v`,
      '_blank',
      'width=777,height=666',
    );
  };
  const priceTitle = {
    vip: '',
    gold: '',
    platinum: '',
  };
  switch (periodButton) {
    case '1':
      priceTitle.vip = '3600';
      priceTitle.gold = '5900 ';
      priceTitle.platinum = '6900';
      break;
    case '2':
      priceTitle.vip = '10260';
      priceTitle.gold = '16815 ';
      priceTitle.platinum = '19665';
      break;
    case '3':
      priceTitle.vip = '20520';
      priceTitle.gold = '33630 ';
      priceTitle.platinum = '39330';
      break;
    case '4':
      priceTitle.vip = '42120';
      priceTitle.gold = '69030 ';
      priceTitle.platinum = '80730';
      break;
  }
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
                <Button
                  onClick={() => setPeriodButton('1')}
                  variant={periodButton === '1' ? undefined : 'regular'}
                  className="period-button border-left">
                  В месяц<span>Стандартная цена</span>
                </Button>
                <Button
                  onClick={() => setPeriodButton('2')}
                  variant={periodButton === '2' ? undefined : 'regular'}
                  className="period-button ">
                  За 3 месяца<span>Экономия 5%</span>
                </Button>
                <Button
                  onClick={() => setPeriodButton('3')}
                  variant={periodButton === '3' ? undefined : 'regular'}
                  className="period-button">
                  За 6 месяцев<span>Экономия 10%</span>
                </Button>
                <Button
                  onClick={() => setPeriodButton('4')}
                  variant={periodButton === '4' ? undefined : 'regular'}
                  className="period-button border-right">
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
                  {priceTitle.vip} рублей <div>в месяц</div>
                </div>
                <div className="grid--price-columns toCenter price-columns">
                  {priceTitle.gold} рублей <div>в месяц</div>
                </div>
                <div className="grid--price-columns toCenter price-columns">
                  {priceTitle.platinum} рублей <div>в месяц</div>
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
