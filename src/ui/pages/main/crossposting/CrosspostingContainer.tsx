import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import socials from '../../../../img';
import { Button } from '../../../components/elements/button/Button';
import { Icon } from '../../../components/elements/icons/Icon';
import { Radio } from '../../../components/elements/radio/Radio';
import { PageHeader } from '../../../components/modules/headers/PageHeader';
import { SocialCard } from '../../../components/modules/socialCard/SocialCard';

type TCrosspostingContainerProps = {};

export const CrosspostingContainer = () => {
  const { t } = useTranslation(['pages', 'common']);
  const [temp, setTemp] = useState('now');
  const images = socials.map((social: any) => (
    <li key={social.title}>
      <SocialCard data={social} titleChange={t('common:links.change', { ns: 'common' })} />
    </li>
  ));
  const at =
    '81aa95845dd5e9ec27543493bef0049339dcefa1b02dd667b203cac799d521f2356b7976b205e6aa3ebe9';
  const u = 166103893;
  const m = 'Posted via Uniblog (2)';
  const a = 'https://prnt.sc/umipVPCnvviL';
  const onNextButtonClick = async () => {
    window.location.href = `https://api.vk.com/method/wall.post?access_token=${at}&owner_id=${u}&message=${m}&attachments=${a}&v=5.131`;
  };
  return (
    <div className="crossposting">
      <PageHeader pageTitle={t('pages:crossposting.title')} />
      <main className="crossposting__main grid">
        <div className="grid__row">
          <h1 className="page-title">{t('pages:crossposting.title')}</h1>
        </div>
        <div className="grid__row">
          <nav className="crossposting__nav">
            <NavLink to="/crossposting/new-post" className="link-nulled">
              <Button className="button button-column _rounded" variant="regular">
                <Icon name="circle-add" className="nav-icon" size="full" />
                {t('pages:crossposting.buttons.newPost')}
              </Button>
            </NavLink>
            <NavLink to="/crossposting/published" className="link-nulled">
              <Button className="button button-column _rounded" variant="regular">
                <Icon name="calendar-add" className="nav-icon" size="full" />
                {t('pages:crossposting.buttons.published')}
              </Button>
            </NavLink>
            <NavLink to="/crossposting/drafts" className="link-nulled">
              <Button className="button button-column _rounded" variant="regular">
                <Icon name="draft" className="nav-icon" size="full" />
                {t('pages:crossposting.buttons.drafts')}
              </Button>
            </NavLink>
          </nav>
        </div>
        <div className="grid__row post-editor">
          <section className="socials">
            <ul>{images}</ul>
          </section>
          <section className="xp-creation-area">
            <div className="paper text-editor">
              <textarea placeholder={t('common:placeholders.enterText')} />
            </div>
            <div className="grid__row row-3">
              <section className="r-paper attachment">21</section>
              <section className="r-paper attachment">22</section>
              <section className="r-paper attachment">23</section>
            </div>
            <Button className="button _rounded" variant="regular">
              Clean
            </Button>
          </section>
          <section className="planner">
            <div className="paper">
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
            </div>
            <Button onClick={onNextButtonClick} className="button _rounded">
              {t('common:buttons.next')}
            </Button>
          </section>
        </div>
      </main>
    </div>
  );
};
