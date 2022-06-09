import React, { FC } from 'react';

import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { Button, Breadcrumbs } from 'ui/components/elements';

type TPageHeaderProps = {
  pageTitle: string;
};

export const PageHeader: FC<TPageHeaderProps> = ({ pageTitle }) => {
  const { t } = useTranslation(['pages', 'common']);
  return (
    <header className="page-header">
      <div className="button__goback">
        <NavLink to="/" className="link-nulled">
          <Button variant="regular">{t('common:buttons.back')}</Button>
        </NavLink>
      </div>
      <Breadcrumbs
        path={[{ title: t('pages:navbar.home'), url: '/' }, { title: pageTitle }]}
        className="breadcrumbs"
        activeClassName="_active"
      />
    </header>
  );
};
