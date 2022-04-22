import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { Breadcrumbs } from '../../../components/elements/breadcrumbs/Breadcrumbs';
import { Button } from '../../../components/elements/button/Button';
import { Radio } from '../../../components/elements/radio/Radio';
import { PageHeader } from '../../../components/modules/headers/PageHeader';

type TCrosspostingContainerProps = {};

export const CrosspostingContainer = () => {
  const { t } = useTranslation(['pages', 'common']);
  const [temp, setTemp] = useState('now');
  console.log(temp);
  return (
    <div className="crossposting">
      <PageHeader pageTitle={t('pages:crossposting.title')} />
      <main className="crossposting__main grid">
        <h1 className="page-title">{t('pages:crossposting.title')}</h1>
        <div className="grid__row row-2">
          <section className="paper text-editor">
            <h3 className="paper-title">{t('pages:crossposting.subtitles.description')}</h3>
          </section>
          <section className="paper planner">
            <Radio
              options={['now', 'later']}
              value={temp}
              titles={[
                t('pages:crossposting.checks.publishNow'),
                t('pages:crossposting.checks.schedulePublication'),
              ]}
              onChangeOption={setTemp}
              className="planner__radio"
            />
          </section>
        </div>
        <div className="grid__row row-6">
          <section className="r-paper attachment">21</section>
          <section className="r-paper attachment">22</section>
          <section className="r-paper attachment">23</section>
          <section className="r-paper attachment">24</section>
          <section className="r-paper attachment">25</section>
          <section className="r-paper attachment">26</section>
        </div>
      </main>
    </div>
  );
};
