import React from 'react';

import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { PageHeader } from 'ui/components/modules/headers/PageHeader';

type TAnalyticsContainerProps = {};

export const AnalyticsContainer = () => {
  const { t } = useTranslation(['pages', 'common']);
  return (
    <div className="analytics">
      <PageHeader pageTitle={t('pages:analytics.title')} />
      <main className="analytics__main grid">
        <div className="grid__row">
          <h1 className="page-title">{t('pages:analytics.title')}</h1>
        </div>
        <div className="grid__row">
          <section className="r-paper analytics-grid">11</section>
        </div>
      </main>
    </div>
  );
};
