import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { SpritesMap } from 'ui/components/modules/iconSpritesMaps/SpritesMap';
import { PurchaseContainer } from 'ui/pages/public/PurchaseContainer';
import { Routes } from 'ui/Routes';

export const App = () => {
  let a;
  let b;
  return (
    <>
      <SpritesMap />
      <div className="wrapper">
        {/* {status === 'failed' && <ErrorSnackbar />} */}
        <BrowserRouter>
          <Switch>
            <Route path="/purchase" render={() => <PurchaseContainer />} />
            <Route path="/" render={() => <Routes />} />
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
};
