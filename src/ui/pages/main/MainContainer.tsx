import React, { useLayoutEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { NavLink, Redirect, Route, Switch, useHistory } from 'react-router-dom';

import { setUserData, TUserData } from '../../../bll/reducers';
import { selectUserData } from '../../../bll/selectors';
import { useAppDispatch, useAppSelector } from '../../../common/hooks';
import socials from '../../../img';
import { Icon } from '../../components/elements/icons/Icon';
import { Footer } from '../../components/modules/footer/Footer';
import { SidebarContainer } from '../../components/modules/sidebar/SidebarContainer';
import { SocialCard } from '../../components/modules/socialCard/SocialCard';
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

export const MainContainer = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const userData = useAppSelector<TUserData | null>(selectUserData);
  const { t } = useTranslation(['pages', 'common']);
  useLayoutEffect(() => {
    const papers: any = document.getElementsByClassName('r-paper');
    for (let i = 0; i < papers.length; i++) {
      papers[i].style.background = `#f${Math.random().toString(16).substr(-4)}f`;
    }
  }, [history.location.pathname]);

  if (userData === null) {
    dispatch(
      setUserData({
        name: 'David',
        email: 'someemail@gmail.com',
        id: '1',
        accessLevel: 1,
      }),
    );
    return <Redirect to="/login" />;
  }

  const images = socials.map((social: any) => (
    <li key={social.title}>
      <SocialCard data={social} titleChange={t('common:links.change', { ns: 'common' })} />
    </li>
  ));

  return (
    <main className="main _container">
      <aside className="sidebar">
        <div className="sidebar__container">
          <div className="logo logo__header">Uniblog</div>
          <Switch>
            <Route
              path="/crossposting"
              render={() => <ul className="crossposting__aside">{images}</ul>}
            />
            <Route path="/" render={() => <SidebarContainer />} />
          </Switch>
          <div className="dash sidebar__dash" />
          <section className="profile-link">
            <NavLink to="/profile" className="iconized__L" exact>
              <Icon name="user" size="full" />
              <p>{userData.name}</p>
              <p className="profile-link__subtitle">{t('pages:navbar.personalAccount')}</p>
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
          <Footer />
        </div>
      </div>
    </main>
  );
};
