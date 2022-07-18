import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ComingSoonPage } from './pages/public/landing/ComingSoonPage';
import { LandingContainer } from './pages/public/landing/LandingContainer';

import { SpritesMap } from 'ui/components/modules/iconSpritesMaps/SpritesMap';
import { PurchaseContainer } from 'ui/pages/public/PurchaseContainer';
import { Routes } from 'ui/Routes';

export const App = () => {
  let a;
  return (
    <>
      <SpritesMap />
      <div className="wrapper">
        {/* {status === 'failed' && <ErrorSnackbar />} */}
        <BrowserRouter>
          <Switch>
            <Route path="/purchase" render={() => <PurchaseContainer />} />
            <Route path="/coming-soon" render={() => <ComingSoonPage />} />
            <Route exact path="/" render={() => <LandingContainer />} />
            <Route path="/" render={() => <Routes />} />
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
};
