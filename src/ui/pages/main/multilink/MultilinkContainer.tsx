import React from 'react';

import { useTranslation } from 'react-i18next';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';

import { useAppSelector } from '../../../../common/hooks';
import { Nullable, TUser } from '../../../../common/types/instance';
import { Breadcrumbs } from '../../../components/elements/breadcrumbs/Breadcrumbs';
import { Button } from '../../../components/elements/button/Button';
import { Icon } from '../../../components/elements/icons/Icon';
import { PageHeader } from '../../../components/modules/headers/PageHeader';

import { MultilinkEditorContainer } from './editor/MultilinkEditorContainer';
import { MultilinkListContainer } from './MultilinkListContainer';

type TMultilinkContainerProps = {
  userData: TUser;
};

export const MultilinkContainer = ({ userData }: TMultilinkContainerProps) => {
  const { t } = useTranslation(['pages', 'common']);

  return (
    <div className="multilink">
      <PageHeader pageTitle={t('pages:multilink.title')} />
      <main className="multilink__main grid">
        <div className="grid__row">
          <h1 className="page-title">{t('pages:multilink.title')}</h1>
        </div>
        <div className="grid__row">
          <nav className="crossposting__nav">
            <NavLink to="/multilink/new" className="link-nulled">
              <Button className="button button-column _rounded" variant="regular">
                <Icon name="circle-add" className="nav-icon" size="full" />
                {t('pages:multilink.buttons.create', { ns: 'pages' })}
              </Button>
            </NavLink>
            <NavLink to="/multilink/all" className="link-nulled">
              <Button className="button button-column _rounded" variant="regular">
                <Icon name="window" className="nav-icon" size="full" />
                {t('pages:multilink.buttons.published')}
              </Button>
            </NavLink>
          </nav>
        </div>
        <Switch>
          <Route
            path="/multilink/new"
            render={() => <MultilinkEditorContainer userData={userData} />}
          />
          <Route path="/multilink/all" render={() => <MultilinkListContainer />} />
          <Redirect from="/multilink/*" to="/404" />
        </Switch>
      </main>
    </div>
  );
};
