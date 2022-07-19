import React, { useState } from 'react';

import {
  getAllImages,
  setMLDraftBackground,
  setMLDraftBlockContent,
} from '../../../../bll/reducers';
import { selectAppStatus } from '../../../../bll/selectors';
import {
  AppStatus,
  MLAllSavedImagesType,
  MLBackgroundType,
  MLContentType,
  MLFieldSavedImages,
} from '../../../../common/constants';
import { useAppDispatch, useAppSelector } from '../../../../common/hooks';
import { MLDraftCarousel } from '../../../../common/types/instance';
import styles from '../../../pages/main/multilink/editor/background/MLBackground.module.scss';
import { Button, Preloader } from '../../elements';
import { Modal } from '../modals/Modal';

import ImageBackground from './ImageBackground';

type SavedImagesPropsType = {
  id?: string;
  contentType?: MLContentType;
  imagesType: MLAllSavedImagesType;
  fieldName?: MLFieldSavedImages;
};

const AllSavedImages = ({ imagesType, contentType, id, fieldName }: SavedImagesPropsType) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAppStatus);
  const obj = useAppSelector(state => state.mlDraft.blocks[`${contentType}_${id}`]);
  const loadingStatus = status === AppStatus.AUTH_LOADING;
  const [openedModal, setOpenedModal] = useState(false);
  const showAllImage = () => {
    setOpenedModal(true);
    dispatch(getAllImages());
  };

  const closeModalContainer = () => {
    setOpenedModal(false);
  };
  const setImageHandler = (url: string) => {
    if (contentType && id && fieldName && obj instanceof MLDraftCarousel) {
      const copyImage = { ...obj, images: [...obj.images, url] };
      dispatch(setMLDraftBlockContent({ content: copyImage, id, type: contentType }));
    } else if (contentType && id && fieldName) {
      dispatch(setMLDraftBlockContent({ content: { [fieldName]: url }, id, type: contentType }));
    } else {
      dispatch(setMLDraftBackground({ background: { [MLBackgroundType.INNER]: `url(${url})` } }));
    }
    setOpenedModal(false);
  };
  return (
    <div>
      <Button onClick={showAllImage}>Сохраненные</Button>
      {openedModal && (
        <Modal close={closeModalContainer}>
          <div className="paper paper__images-container">
            {loadingStatus ? (
              <div className={styles.preloaderContainer}>
                <Preloader className={styles.preloader} />
              </div>
            ) : (
              <ImageBackground setImageHandler={setImageHandler} imagesType={imagesType} />
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
export default AllSavedImages;
