import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { Icon, Input } from '../../../components/elements';

import { Breadcrumbs } from 'ui/components/elements/breadcrumbs/Breadcrumbs';
import { Button } from 'ui/components/elements/button/Button';
import { PageHeader } from 'ui/components/modules/headers/PageHeader';

type TPriceContainerProps = {};
type priceType = {
  vip: string;
  gold: string;
  platinum: string;
  title: string;
};

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
  const price: priceType = {
    vip: '3600',
    gold: '5900 ',
    platinum: '6900',
    title: 'в месяц',
  };
  switch (periodButton) {
    case '1':
      price.vip = '3600';
      price.gold = '5900 ';
      price.platinum = '6900';
      price.title = 'в месяц';
      break;
    case '2':
      price.vip = '10260';
      price.gold = '16815 ';
      price.platinum = '19665';
      price.title = 'за 3 месяца';
      break;
    case '3':
      price.vip = '20520';
      price.gold = '33630 ';
      price.platinum = '39330';
      price.title = 'за 6 месяцев';
      break;
    case '4':
      price.vip = '42120';
      price.gold = '69030 ';
      price.platinum = '80730';
      price.title = 'за год';
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
            <div className="price__title">Промокод</div>
            <div className="price__promo-area">
              <div className="price__input-wrapper">
                <Input placeholder="Введите промокод" className="price__input" type="text" />
                <Icon name="user" size="full" />
              </div>
              <Button>Применить промокод</Button>
            </div>
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
                  {price.vip} рублей <div>{price.title}</div>
                </div>
                <div className="grid--price-columns toCenter price-columns">
                  {price.gold} рублей <div>{price.title}</div>
                </div>
                <div className="grid--price-columns toCenter price-columns">
                  {price.platinum} рублей <div>{price.title}</div>
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
