import React, { MouseEvent, useEffect, useState } from 'react';

import { getAllMultilinks } from '../../../../bll/reducers';
import { ID } from '../../../../common/constants';
import { useAppDispatch, useAppSelector } from '../../../../common/hooks';
import { Nullable, TMultilink } from '../../../../common/types/instance';
import { PublicMultilink } from '../../public/PublicMultilink';

const MultilinkDraftContainer = () => {
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentML, setCurrentML] = useState('');
  const multilinks = useAppSelector<Nullable<TMultilink[]>>(state => state.multilink.allMultilinks);
  const onMLClick = (e: MouseEvent<HTMLInputElement>) => {
    setCurrentML(e.currentTarget.value);
    setIsModalVisible(true);
  };
  useEffect(() => {
    !multilinks?.length && dispatch(getAllMultilinks());
  }, [dispatch, multilinks?.length]);
  const mappedMLs =
    multilinks &&
    multilinks.map((multilink, i) => (
      <div key={ID[i]} className="grid__row row-3">
        <input type="button" className="full-absolute" value={multilink.name} onClick={onMLClick} />
        <PublicMultilink multilink={multilink} className="ml-preview" />
      </div>
    ));
  return <div>{mappedMLs}</div>;
};

export default MultilinkDraftContainer;
