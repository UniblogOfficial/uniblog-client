import React from 'react';

import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { Breadcrumbs } from '../../../../components/elements/breadcrumbs/Breadcrumbs';
import { Button } from '../../../../components/elements/button/Button';
import { PageHeader } from '../../../../components/modules/headers/PageHeader';

type TAddonsContainerProps = {};

export const AddonsContainer = () => {
  const { t } = useTranslation(['pages', 'common']);
  return (
    <div className="addons">
      <PageHeader pageTitle={t('pages:addons.title')} />
      <main className="addons__main grid">
        <div className="grid__row">
          <h1 className="page-title">{t('pages:addons.title')}</h1>
        </div>
        <div className="grid__row">
          <section className="paper addons-grid">11</section>
        </div>
      </main>
    </div>
  );
};
