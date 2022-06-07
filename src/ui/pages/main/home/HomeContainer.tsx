import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'common/hooks';
import { TUser } from 'common/types/instance';
import socials from 'img';
import { Button } from 'ui/components/elements/button/Button';
import { SocialAccountState, SocialCard } from 'ui/components/modules/socialCard/SocialCard';

type THomeContainerProps = {
  userData: TUser;
};

export const HomeContainer = ({ userData }: THomeContainerProps) => {
  const [socialData, setSocialData] = useState(() =>
    socials.map(social => ({ type: social.type, state: SocialAccountState.NOT_AVAILABLE })),
  );

  const { t } = useTranslation(['pages', 'common']);

  const socialActionTitles = [
    t('common:links.add', { ns: 'common' }),
    t('common:links.change', { ns: 'common' }),
  ];

  const images = socials.map((social: any, i: number) => {
    const actionTitle = socialActionTitles[socialData[i].state];
    return (
      <li key={social.title}>
        <SocialCard data={social} actionTitle={actionTitle} />
      </li>
    );
  });
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
