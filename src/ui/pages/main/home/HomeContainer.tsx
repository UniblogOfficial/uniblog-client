import React from 'react';

import { useTranslation } from 'react-i18next';

import { TUserData } from '../../../../bll/reducers';
import { selectUserData } from '../../../../bll/selectors';
import { useAppSelector } from '../../../../common/hooks';
import socials from '../../../../img';
import { Button } from '../../../components/elements/button/Button';
import { SocialCard } from '../../../components/modules/socialCard/SocialCard';

type THomeContainerProps = {};

export const HomeContainer = () => {
  const userData = useAppSelector<TUserData | null>(selectUserData);
  const { t } = useTranslation(['pages', 'common']);
  if (!userData) return null;

  const images = socials.map((social: any) => (
    <li key={social.title}>
      <SocialCard data={social} titleChange={t('common:links.change', { ns: 'common' })} />
    </li>
  ));
  return (
    <div className="home">
      <header className="home__header">
        <h1 className="page-title home__greeting">
          {t('pages:home.greeting')}, {userData.name}
        </h1>
        <div className="home__add-new-post">
          <Button>
            {t('common:buttons.addNewPost', { ns: 'common' })} <strong>+</strong>
          </Button>
        </div>
      </header>
      <main className="grid home__main">
        <div className="grid__row row-2">
          <section className="paper chart">
            <h3 className="paper-title">{t('pages:home.subtitles.networks')}</h3>
          </section>
          <section className="paper socials">
            <h3 className="paper-title">{t('pages:home.subtitles.myNetworks')}</h3>
            <ul className="socials__grid">{images}</ul>
          </section>
        </div>
        <div className="grid__row row-3">
          <section className="r-paper coverage">21</section>
          <section className="r-paper">22</section>
          <section className="r-paper">23</section>
        </div>
      </main>
    </div>
  );
};
