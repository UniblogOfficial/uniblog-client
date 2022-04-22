import React, { FC, MouseEvent } from 'react';

import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { TUserData } from '../../../../bll/reducers';
import { Button } from '../../elements/button/Button';
import { Icon } from '../../elements/icons/Icon';
import { TIconName } from '../iconSpritesMaps/IconSpritesMap';

type TNavLinksDataItem = {
  id: number;
  title: string;
  href: string;
  icon: TIconName;
};

type TSidebarContainerProps = {};

export const SidebarContainer: FC<TSidebarContainerProps> = () => {
  const { t, i18n } = useTranslation('pages');
  const changeLanguage = (e: MouseEvent<HTMLButtonElement>) => {
    i18n.changeLanguage(e.currentTarget.value);
  };
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
  const mappedNavLinks = navLinksData.map((data, i) => (
    <li key={data.id} className="nav__item">
      <NavLink to={data.href} className="nav__link iconized__L" exact>
        <Icon name={data.icon} size="full" />
        {data.title}
      </NavLink>
    </li>
  ));
  return (
    <>
      <nav className="nav">
        <ul className="nav__list">{mappedNavLinks}</ul>
      </nav>
      <div className="lang-switch">
        <Button
          value="ru"
          variant={i18n.language === 'ru' ? undefined : 'regular'}
          className={i18n.language === 'ru' ? 'left active' : 'left'}
          orientation="right"
          onClick={changeLanguage}>
          Русский
        </Button>
        <Button
          value="en"
          variant={i18n.language === 'en' ? undefined : 'regular'}
          className={i18n.language === 'en' ? 'right active' : 'right'}
          orientation="left"
          onClick={changeLanguage}>
          English
        </Button>
      </div>
    </>
  );
};
