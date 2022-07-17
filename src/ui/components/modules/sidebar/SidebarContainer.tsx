import React, { FC, MouseEvent } from 'react';

import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { TIconName } from '../iconSpritesMaps/IconSpritesMap';
import { ThemeSwitch } from '../themeSwitch/ThemeSwitch';

import { TUser } from 'common/types/instance';
import { parseRawImage } from 'common/utils/ui';
import { Button, Icon } from 'ui/components/elements';

type TNavLinksDataItem = {
  id: number;
  title: string;
  href: string;
  icon: TIconName;
};

type TSidebarContainerProps = {
  userData: TUser;
};

export const SidebarContainer: FC<TSidebarContainerProps> = ({ userData }) => {
  const { t, i18n } = useTranslation(['pages', 'common']);
  const { name, avatar } = userData;
  const changeLanguage = (e: MouseEvent<HTMLButtonElement>) => {
    i18n.changeLanguage(e.currentTarget.value);
  };
  const navLinksData: Array<TNavLinksDataItem> = [
    {
      id: 1,
      title: t('pages:navbar.home'),
      href: '/home',
      icon: 'home',
    },
    {
      id: 2,
      title: t('pages:navbar.crossposting'),
      href: '/crossposting',
      icon: 'grid-2',
    },
    {
      id: 3,
      title: t('pages:navbar.multilink'),
      href: '/multilink',
      icon: 'window',
    },
    {
      id: 4,
      title: t('pages:navbar.shop'),
      href: '/shop',
      icon: 'cart',
    },
    {
      id: 5,
      title: t('pages:navbar.analytics'),
      href: '/analytics',
      icon: 'analytics',
    },
    {
      id: 6,
      title: t('pages:navbar.addons'),
      href: '/addons',
      icon: 'grid-mosaic',
    },
    {
      id: 7,
      title: t('pages:navbar.price'),
      href: '/price',
      icon: 'lightning',
    },
    {
      id: 10,
      title: t('pages:navbar.chat'),
      href: '/chat',
      icon: 'chat',
    },
  ];
  const avatarSrc = avatar ? parseRawImage(avatar) : undefined;
  const mappedNavLinks = navLinksData.map((data, i) => (
    <li key={data.id} className="nav__item">
      <NavLink exact={i === 0 || false} to={data.href} className="nav__link iconized__L">
        <Icon name={data.icon} size="full" />
        {data.title}
      </NavLink>
    </li>
  ));

  return (
    <aside className="sidebar">
      <div className="sidebar__container">
        <div className="logo logo__header">Uniblog</div>
        <nav className="nav">
          <ul className="nav__list">{mappedNavLinks}</ul>
        </nav>
        <ThemeSwitch />
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
        <div className="dash sidebar__dash" />
        <section className="profile-link">
          <NavLink to="/profile" className="iconized__L" exact>
            {avatarSrc ? (
              <div className="profile-link__avatar">
                <img src={avatarSrc} className="invert" alt="avatar" />
              </div>
            ) : (
              <Icon name="user" size="full" />
            )}
            <p>{name}</p>
            <p className="profile-link__subtitle">{t('pages:navbar.personalAccount')}</p>
          </NavLink>
        </section>
      </div>
    </aside>
  );
};
