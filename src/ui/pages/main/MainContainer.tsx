import React, { useLayoutEffect, useState, MouseEvent } from 'react';

import { useTranslation } from 'react-i18next';
import { NavLink, Redirect, Route, Switch, useHistory } from 'react-router-dom';

import { setUserData, TUserData } from '../../../bll/reducers';
import { selectUserData } from '../../../bll/selectors';
import { useAppDispatch, useAppSelector } from '../../../common/hooks';
import { getKeys } from '../../../common/utils/state';
import { namespaces } from '../../../i18n';
import { Button } from '../../components/elements/button/Button';
import { Icon } from '../../components/elements/icons/Icon';
import { TIconName } from '../../components/modules/iconSpritesMaps/IconSpritesMap';
import translations from '../../locales/en/pages.all.json';
import { NotFound } from '../404';

import { AddonsContainer } from './addons/AddonsContainer';
import { AnalyticsContainer } from './analytics/AnalyticsContainer';
import { ChatContainer } from './chat/ChatContainer';
import { CrosspostingContainer } from './crossposting/CrosspostingContainer';
import { HomeContainer } from './home/HomeContainer';
import { MultilinkContainer } from './multilink/MultilinkContainer';
import { PriceContainer } from './price/PriceContainer';
import { ProfileContainer } from './profile/ProfileContainer';
import { ShopContainer } from './shop/ShopContainer';

type TNavLinksDataItem = {
  id: number;
  title: string;
  href: string;
  icon: TIconName;
};

export const MainContainer = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const userData = useAppSelector<TUserData | null>(selectUserData);

  const { t, i18n } = useTranslation('pages');
  const changeLanguage = (e: MouseEvent<HTMLButtonElement>) => {
    i18n.changeLanguage(e.currentTarget.value);
  };
  useLayoutEffect(() => {
    const papers: any = document.getElementsByClassName('r-paper');
    for (let i = 0; i < papers.length; i++) {
      papers[i].style.background = `#f${Math.random().toString(16).substr(-4)}f`;
    }
  }, [history.location.pathname]);
  const navLinksData: Array<TNavLinksDataItem> = [
    {
      id: 1,
      title: t('navbar.home'),
      href: '/',
      icon: 'home',
    },
    {
      id: 2,
      title: t('navbar.crossposting'),
      href: '/crossposting',
      icon: 'grid-2',
    },
    {
      id: 3,
      title: t('navbar.multilink'),
      href: '/my-site',
      icon: 'window',
    },
    {
      id: 4,
      title: t('navbar.shop'),
      href: '/shop',
      icon: 'cart',
    },
    {
      id: 5,
      title: t('navbar.analytics'),
      href: '/analytics',
      icon: 'analytics',
    },
    {
      id: 6,
      title: t('navbar.addons'),
      href: '/addons',
      icon: 'grid-mosaic',
    },
    {
      id: 7,
      title: t('navbar.price'),
      href: '/price',
      icon: 'lightning',
    },
    {
      id: 10,
      title: t('navbar.chat'),
      href: '/chat',
      icon: 'chat',
    },
  ];
  const titles = getKeys(t('navbar'));
  const mappedNavLinks = navLinksData.map((data, i) => (
    <li key={data.id} className="nav__item">
      <NavLink to={data.href} className="nav__link iconized__L" exact>
        <Icon name={data.icon} size="full" />
        {data.title}
      </NavLink>
    </li>
  ));

  if (userData === null) {
    dispatch(
      setUserData({
        name: 'David',
        email: 'someemail@gmail.com',
        id: '1',
        accessLevel: 1,
      }),
    );
    return <Redirect to="/signup" />;
  }

  return (
    <main className="main _container">
      <aside className="sidebar">
        <div className="sidebar__container">
          <div className="logo logo__header">Uniblog</div>
          <nav className="nav">
            <ul className="nav__list">{mappedNavLinks}</ul>
          </nav>
          <div className="lang-switch">
            <Button
              value="ru"
              variant={i18n.language === 'ru' ? undefined : 'regular'}
              className={i18n.language === 'ru' ? 'left active' : 'left'}
              onClick={changeLanguage}>
              Русский
            </Button>
            <Button
              value="en"
              variant={i18n.language === 'en' ? undefined : 'regular'}
              className={i18n.language === 'en' ? 'right active' : 'right'}
              onClick={changeLanguage}>
              English
            </Button>
          </div>
          <div className="dash sidebar__dash" />
          <section className="profile-link">
            <NavLink to="/profile" className="iconized__L" exact>
              <Icon name="user" size="full" />
              <p>{userData.name}</p>
              <p className="profile-link__subtitle">Личный кабинет</p>
            </NavLink>
          </section>
        </div>
      </aside>
      <div className="content">
        <div className="content__container">
          <Switch>
            <Route path="/crossposting" render={() => <CrosspostingContainer />} />
            <Route path="/my-site" render={() => <MultilinkContainer />} />
            <Route path="/shop" render={() => <ShopContainer />} />
            <Route path="/analytics" render={() => <AnalyticsContainer />} />
            <Route path="/addons" render={() => <AddonsContainer />} />
            <Route path="/price" render={() => <PriceContainer />} />
            <Route path="/chat" render={() => <ChatContainer />} />
            <Route path="/profile" render={() => <ProfileContainer />} />
            <Route path="/" exact render={() => <HomeContainer />} />
            <Route path="/404" render={() => <NotFound />} />
            <Redirect from="*" to="/404" />
          </Switch>
          <footer className="footer paper">
            <ul className="list">
              <li>Контакты</li>
              <li>Блог</li>
              <li>Политика конфиденциальности</li>
            </ul>
            <p>© 2022 UNIBLOG. All Rights Reserved</p>
          </footer>
        </div>
      </div>
    </main>
  );
};
