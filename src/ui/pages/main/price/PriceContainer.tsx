import React from 'react';

import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { Breadcrumbs } from '../../../components/elements/breadcrumbs/Breadcrumbs';
import { Button } from '../../../components/elements/button/Button';
import { PageHeader } from '../../../components/modules/headers/PageHeader';

type TPriceContainerProps = {};

export const PriceContainer = () => {
  const { t } = useTranslation(['pages', 'common']);
  return (
    <div className="price">
      <PageHeader pageTitle={t('pages:price.title')} />
      <main className="price__main grid">
        <div className="grid__row">
          <h1 className="page-title">{t('pages:price.title')}</h1>
        </div>
        <div className="grid__row">
          <section className="paper promo">11</section>
        </div>
        <div className="grid__row">
          <section className="r-paper price-grid">21</section>
        </div>
      </main>
    </div>
  );
};
