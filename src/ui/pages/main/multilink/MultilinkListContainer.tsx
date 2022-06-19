import React, { useEffect } from 'react';

import { PublicMultilink } from '../../public/PublicMultilink';

import { getAllMultilinks } from 'bll/reducers';
import { selectAppStatus } from 'bll/selectors';
import { AppStatus, ID } from 'common/constants';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { Nullable, TMultilink } from 'common/types/instance';
import { Preloader } from 'ui/components/elements';

type TMultilinkListContainerProps = {};

export const MultilinkListContainer = () => {
  const dispatch = useAppDispatch();
  const multilinks = useAppSelector<Nullable<TMultilink[]>>(state => state.multilink.allMultilinks);
  const status = useAppSelector(selectAppStatus);
  const loadingStatus = status === AppStatus.CONTENT_LOADING;

  useEffect(() => {
    dispatch(getAllMultilinks());
  }, [dispatch]);

  const mappedMLs =
    multilinks &&
    multilinks.map((multilink, i) => (
      <div key={ID[i]} className="grid__row">
        <PublicMultilink multilink={multilink} className="ml-template" />
      </div>
    ));

  if (loadingStatus) {
    return (
      <div className="grid__row">
        <Preloader />
      </div>
    );
  }
  return <>{mappedMLs}</>;
};
