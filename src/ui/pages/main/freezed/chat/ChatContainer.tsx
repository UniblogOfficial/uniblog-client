import React from 'react';

import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { Breadcrumbs } from '../../../../components/elements/breadcrumbs/Breadcrumbs';
import { Button } from '../../../../components/elements/button/Button';
import { PageHeader } from '../../../../components/modules/headers/PageHeader';

type TChatContainerProps = {};

export const ChatContainer = () => {
  const { t } = useTranslation(['pages', 'common']);
  return (
    <div className="chat">
      <PageHeader pageTitle={t('pages:chat.title')} />
      <main className="chat__main grid">
        <div className="grid__row">
          <h1 className="page-title">{t('pages:chat.title')}</h1>
        </div>
        <div className="grid__row">
          <section className="paper chat-grid">
            <Button disabled className="button-fake">
              <strong>Клава</strong> {t('pages:chat.infoMessages.info2')}
            </Button>
            <Button disabled className="button-fake">
              <strong>Клава</strong> {t('pages:chat.infoMessages.info1')}
            </Button>
          </section>
        </div>
      </main>
    </div>
  );
};
