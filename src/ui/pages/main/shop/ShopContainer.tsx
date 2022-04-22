import React from 'react';

import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { Breadcrumbs } from '../../../components/elements/breadcrumbs/Breadcrumbs';
import { Button } from '../../../components/elements/button/Button';
import { PageHeader } from '../../../components/modules/headers/PageHeader';

type TShopContainerProps = {};

export const ShopContainer = () => {
  const { t } = useTranslation(['pages', 'common']);
  return (
    <div className="shop">
      <PageHeader pageTitle={t('pages:shop.title')} />
      <main className="shop__main grid">
        <h1 className="page-title">{t('pages:shop.title')}</h1>
        <div className="grid__row row-3">
          <section className="r-paper shop-item">11</section>
          <section className="r-paper">12</section>
          <section className="r-paper">13</section>
        </div>
        <div className="grid__row row-3">
          <section className="r-paper shop-item">21</section>
          <section className="r-paper">22</section>
          <section className="r-paper">23</section>
        </div>
        <div className="grid__row row-3">
          <section className="r-paper shop-item">31</section>
          <section className="r-paper">32</section>
          <section className="r-paper">33</section>
        </div>
        <div className="grid__row row-3">
          <section className="r-paper shop-item">41</section>
          <section className="r-paper">42</section>
          <section className="r-paper">43</section>
        </div>
        <div className="grid__row row-3">
          <section className="r-paper shop-item">51</section>
          <section className="r-paper">52</section>
          <section className="r-paper">53</section>
        </div>
      </main>
    </div>
  );
};
