import React from 'react';

import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { Breadcrumbs } from '../../../components/elements/breadcrumbs/Breadcrumbs';
import { Button } from '../../../components/elements/button/Button';
import { PageHeader } from '../../../components/modules/headers/PageHeader';

type TMultilinkContainerProps = {};

export const MultilinkContainer = () => {
  const { t } = useTranslation(['pages', 'common']);
  return (
    <div className="multilink">
      <PageHeader pageTitle={t('pages:multilink.title')} />
      <main className="multilink__main grid">
        <h1 className="page-title">{t('pages:multilink.title')}</h1>
        <div className="grid__row">
          <section className="r-paper multilink-grid">11</section>
        </div>
      </main>
    </div>
  );
};
