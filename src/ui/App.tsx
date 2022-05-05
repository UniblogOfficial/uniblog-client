import React, { useEffect } from 'react';

import { BrowserRouter, useHistory } from 'react-router-dom';

import { getMultilink, me } from '../bll/reducers';
import { useAppDispatch, useAppSelector } from '../common/hooks';

import { SpritesMap } from './components/modules/iconSpritesMaps/SpritesMap';
import { Routes } from './Routes';

export const App = () => {
  const dispatch = useAppDispatch();

  const { isInitialized } = useAppSelector(state => state.app);

  const history = useHistory();
  console.log(history);
  useEffect(() => {
    dispatch(me());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMultilink('f'));
  }, [dispatch]);

  /* if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '50%', textAlign: 'center', width: '100%' }}>
        preloader
      </div>
    );
  } */
  return (
    <>
      <SpritesMap />
      <div className="wrapper">
        {/* {status === 'failed' && <ErrorSnackbar />} */}
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    </>
  );
};
