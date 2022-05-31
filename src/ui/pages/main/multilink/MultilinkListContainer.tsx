import React, { useEffect } from 'react';

import { getAllMultilinks } from '../../../../bll/reducers';
import { ID } from '../../../../common/constants';
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
    multilinks.map((multilink, i) => (
      <div key={ID[i]} className="grid__row">
        <PublicMultilink multilink={multilink} className="ml-template" />
      </div>
    ));

  return <>{mappedMLs}</>;
};
