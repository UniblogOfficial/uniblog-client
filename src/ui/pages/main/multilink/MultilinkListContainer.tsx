import React, { useEffect } from 'react';

import { getAllMultilinks } from '../../../../bll/reducers';
import { useAppDispatch, useAppSelector } from '../../../../common/hooks';
import { Nullable, TMultilink } from '../../../../common/types/instance';
import { PublicMultilink } from '../../public/PublicMultilink';

type TMultilinkListContainerProps = {};

export const MultilinkListContainer = () => {
  const dispatch = useAppDispatch();
  const multilinks = useAppSelector<Nullable<TMultilink[]>>(state => state.multilink.allMultilinks);
  useEffect(() => {
    dispatch(getAllMultilinks());
  }, [dispatch]);

  const mappedMLs =
    multilinks &&
    multilinks.map(multilink => (
      <PublicMultilink key={multilink.background} multilink={multilink} className="ml-template" />
    ));

  return <div className="grid__row">{mappedMLs}</div>;
};
