import React, { useLayoutEffect } from 'react';

import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import { TUserState } from '../../../bll/reducers';
import { selectUserData } from '../../../bll/selectors';
import { useAppDispatch, useAppSelector } from '../../../common/hooks';
import { Footer } from '../../components/modules/footer/Footer';
import { SidebarContainer } from '../../components/modules/sidebar/SidebarContainer';
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
  const userData = useAppSelector<TUserState>(selectUserData);

  useLayoutEffect(() => {
    const papers: any = document.getElementsByClassName('r-paper');
    for (let i = 0; i < papers.length; i++) {
      papers[i].style.background = `#f${Math.random().toString(16).substr(-4)}f`;
    }
  }, [history.location.pathname]);

  if (userData === null) {
    return <Redirect to="/login" />;
  }

  return (
    <main className="main _container">
      <SidebarContainer userData={userData} />
      <div className="content">
        <div className="content__container">
          <Switch>
            <Route path="/crossposting" render={() => <CrosspostingContainer />} />
            <Route path="/multilink" render={() => <MultilinkContainer userData={userData} />} />
            <Route path="/shop" render={() => <ShopContainer />} />
            <Route path="/analytics" render={() => <AnalyticsContainer />} />
            <Route path="/addons" render={() => <AddonsContainer />} />
            <Route path="/price" render={() => <PriceContainer />} />
            <Route path="/chat" render={() => <ChatContainer />} />
            <Route path="/profile" render={() => <ProfileContainer userData={userData} />} />
            <Route path="/" exact render={() => <HomeContainer userData={userData} />} />
            <Route path="/404" render={() => <NotFound />} />
            <Redirect from="*" to="/404" />
          </Switch>
          <Footer />
        </div>
      </div>
    </main>
  );
};
