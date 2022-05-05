import React from 'react';

import { useTranslation } from 'react-i18next';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';

import { Button, Icon } from '../../../components/elements';
import { PageHeader } from '../../../components/modules/headers/PageHeader';

import { MultilinkEditorContainer } from './editor/MultilinkEditorContainer';
import { MultilinkListContainer } from './MultilinkListContainer';

type TMultilinkContainerProps = {};

export const MultilinkContainer = () => {
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
                {t('pages:crossposting.buttons.newPost')}
              </Button>
            </NavLink>
            <NavLink to="/multilink/all" className="link-nulled">
              <Button className="button button-column _rounded" variant="regular">
                <Icon name="window" className="nav-icon" size="full" />
                {t('pages:crossposting.buttons.published')}
              </Button>
            </NavLink>
          </nav>
        </div>
        <Switch>
          <Route path="/multilink/new" render={() => <MultilinkEditorContainer />} />
          <Route path="/multilink/all" render={() => <MultilinkListContainer />} />
          <Redirect from="/multilink/*" to="/404" />
        </Switch>
      </main>
    </div>
  );
};
