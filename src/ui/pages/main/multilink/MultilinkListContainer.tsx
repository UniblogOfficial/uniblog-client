import React, { useEffect, useState, MouseEvent } from 'react';

import { useTranslation } from 'react-i18next';

import { PublicMultilink } from '../../public/PublicMultilink';

import { getAllMultilinks } from 'bll/reducers';
import { selectAppStatus } from 'bll/selectors';
import { AppStatus, ID } from 'common/constants';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { Nullable, TMultilink } from 'common/types/instance';
import { Button, Preloader } from 'ui/components/elements';
import { Modal } from 'ui/components/modules/modals/Modal';

type TMultilinkListContainerProps = {};

export const MultilinkListContainer = () => {
  const dispatch = useAppDispatch();
  const multilinks = useAppSelector<Nullable<TMultilink[]>>(state => state.multilink.allMultilinks);
  const status = useAppSelector(selectAppStatus);
  const { t } = useTranslation(['pages', 'common']);
  const loadingStatus = status === AppStatus.CONTENT_LOADING;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentML, setCurrentML] = useState('');

  useEffect(() => {
    !multilinks?.length && dispatch(getAllMultilinks());
  }, [dispatch, multilinks?.length]);
  const onMLClick = (e: MouseEvent<HTMLButtonElement>) => {
    setCurrentML(e.currentTarget.value);
    setIsModalVisible(true);
  };

  const mappedMLs =
    multilinks &&
    multilinks.map((multilink, i) => (
      <div key={ID[i]} className="paper">
        <div className="ml-preview__wrapper ">
          <PublicMultilink multilink={multilink} className="ml-preview" />
          <Button className="ml-preview__button" value={multilink.name} onClick={onMLClick}>
            открыть
          </Button>
        </div>
      </div>
    ));

  if (loadingStatus) {
    return (
      <div className="grid__row" style={{ height: '200px', width: '90%' }}>
        <Preloader className="app-preloader" />
      </div>
    );
  }
  return (
    <>
      <div className="multilink-list-wrapper">{mappedMLs}</div>
      {isModalVisible && (
        <Modal close={() => setIsModalVisible(false)}>
          <div className="paper _with-button-bottom">
            <div>
              <a
                href={`${
                  process.env.REACT_APP_MODE === 'development'
                    ? process.env.REACT_APP_HOST_DEVELOPMENT
                    : process.env.REACT_APP_HOST_PRODUCTION
                }/${currentML}`}>{`${process.env.REACT_APP_HOST_PRODUCTION}/${currentML}`}</a>
            </div>
            <div className="paper__button-container">
              <Button className="button _full _paper" onClick={() => setIsModalVisible(false)}>
                {t('common:buttons.back')}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
