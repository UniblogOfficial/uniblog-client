import React, { useState, MouseEvent } from 'react';

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

enum Period {
  ONEMONTH,
  THREEMONTHS,
  SIXMONTHS,
  ONEYEAR,
}

export const PriceContainer = () => {
  const { t } = useTranslation(['pages', 'common']);
  const [period, setPeriod] = useState<Period>(Period.ONEMONTH);

  const price: priceType = {
    vip: '',
    gold: '',
    platinum: '',
    title: '',
  };
  switch (period) {
    case Period.ONEMONTH:
      price.vip = '3600';
      price.gold = '5900 ';
      price.platinum = '6900';
      price.title = t('pages:price.tablePeriods.oneMonth');
      break;
    case Period.THREEMONTHS:
      price.vip = '10260';
      price.gold = '16815 ';
      price.platinum = '19665';
      price.title = t('pages:price.tablePeriods.threeMonths');
      break;
    case Period.SIXMONTHS:
      price.vip = '20520';
      price.gold = '33630 ';
      price.platinum = '39330';
      price.title = t('pages:price.tablePeriods.sixMonths');
      break;
    case Period.ONEYEAR:
      price.vip = '42120';
      price.gold = '69030 ';
      price.platinum = '80730';
      price.title = t('pages:price.tablePeriods.oneYear');
      break;
    default:
      break;
  }

  const onPeriodButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    setPeriod(+e.currentTarget.value as unknown as Period);
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
            <div className="price__title">{t('pages:price.subtitles.promo')}</div>
            <div className="price__promo-area">
              <div className="price__input-wrapper">
                <Input
                  placeholder={t('pages:price.enterCode')}
                  className="price__input"
                  type="text"
                />
                <Icon name="user" size="full" />
              </div>
              <Button>{t('pages:price.buttons.applyPromo')}</Button>
            </div>
          </section>
        </div>
        <div className="grid__row">
          <section className="paper price-grid">
            <div className="price__header">
              <div className="payment-period">{t('pages:price.subtitles.period')}</div>
              <div className="period-switch">
                <Button
                  value={Period.ONEMONTH}
                  onClick={onPeriodButtonClick}
                  variant={period === Period.ONEMONTH ? undefined : 'regular'}
                  className="period-button border-left">
                  {t('pages:price.buttons.onemonth.title')}
                  <span>{t('pages:price.buttons.onemonth.discount')}</span>
                </Button>
                <Button
                  value={Period.THREEMONTHS}
                  onClick={onPeriodButtonClick}
                  variant={period === Period.THREEMONTHS ? undefined : 'regular'}
                  className="period-button ">
                  {t('pages:price.buttons.threemonths.title')}
                  <span>{t('pages:price.buttons.threemonths.discount')}</span>
                </Button>
                <Button
                  value={Period.SIXMONTHS}
                  onClick={onPeriodButtonClick}
                  variant={period === Period.SIXMONTHS ? undefined : 'regular'}
                  className="period-button">
                  {t('pages:price.buttons.sixmonths.title')}
                  <span>{t('pages:price.buttons.sixmonths.discount')}</span>
                </Button>
                <Button
                  value={Period.ONEYEAR}
                  onClick={onPeriodButtonClick}
                  variant={period === Period.ONEYEAR ? undefined : 'regular'}
                  className="period-button border-right">
                  {t('pages:price.buttons.oneyear.title')}
                  <span>{t('pages:price.buttons.oneyear.discount')}</span>
                </Button>
              </div>
            </div>
            <div className="price__main">
              <div className="grid--container">
                <div className="grid--price-columns" />
                <div className="grid--price-columns toCenter plan-text">
                  Vip <div className="user-tariff">{t('pages:price.myPlan')}</div>
                </div>
                <div className="grid--price-columns toCenter plan-text">Gold</div>
                <div className="grid--price-columns toCenter plan-text">Platinum</div>
                <div className="grid--price-columns">
                  <div className="left-margin">{t('pages:price.tableFeatures.feature')}</div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-included">
                    {t('pages:price.tableCheckbox.true')}
                  </div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-included">
                    {t('pages:price.tableCheckbox.true')}
                  </div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-included">
                    {t('pages:price.tableCheckbox.true')}
                  </div>
                </div>
                <div className="grid--price-columns">
                  <div className="left-margin">{t('pages:price.tableFeatures.feature')}</div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-included">
                    {t('pages:price.tableCheckbox.true')}
                  </div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-included">
                    {t('pages:price.tableCheckbox.true')}
                  </div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-included">
                    {t('pages:price.tableCheckbox.true')}
                  </div>
                </div>
                <div className="grid--price-columns ">
                  <div className="left-margin">{t('pages:price.tableFeatures.feature')}</div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-not-included">
                    {t('pages:price.tableCheckbox.false')}
                  </div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-included">
                    {t('pages:price.tableCheckbox.true')}
                  </div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-included">
                    {t('pages:price.tableCheckbox.true')}
                  </div>
                </div>
                <div className="grid--price-columns ">
                  <div className="left-margin">{t('pages:price.tableFeatures.feature')}</div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-not-included">
                    {t('pages:price.tableCheckbox.false')}
                  </div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-not-included">
                    {t('pages:price.tableCheckbox.false')}
                  </div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-included">
                    {t('pages:price.tableCheckbox.true')}
                  </div>
                </div>
                <div className="grid--price-columns ">
                  <div className="left-margin">{t('pages:price.tableFeatures.feature')}</div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-not-included">
                    {t('pages:price.tableCheckbox.false')}
                  </div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-not-included">
                    {t('pages:price.tableCheckbox.false')}
                  </div>
                </div>
                <div className="grid--price-columns toCenter">
                  <div className="price-columns-included">
                    {t('pages:price.tableCheckbox.true')}
                  </div>
                </div>
                <div className="grid--price-columns " />
                <div className="grid--price-columns toCenter price-columns">
                  {price.vip} {t('common:currency.ru.genitivePlural5')} <div>{price.title}</div>
                </div>
                <div className="grid--price-columns toCenter price-columns">
                  {price.gold} {t('common:currency.ru.genitivePlural5')} <div>{price.title}</div>
                </div>
                <div className="grid--price-columns toCenter price-columns">
                  {price.platinum} {t('common:currency.ru.genitivePlural5')}{' '}
                  <div>{price.title}</div>
                </div>
                <div className="grid--price-columns noneBorder" />
                <div className="grid--price-columns toCenter noneBorder">
                  <Button>{t('pages:price.buttons.pay')}</Button>
                </div>
                <div className="grid--price-columns toCenter noneBorder">
                  <Button>{t('pages:price.buttons.pay')}</Button>
                </div>
                <div className="grid--price-columns toCenter noneBorder">
                  <Button>{t('pages:price.buttons.pay')}</Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
