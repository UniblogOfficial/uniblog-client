import React, {
  FC,
  useCallback,
  MouseEvent,
  useState,
  ReactElement,
  ChangeEvent,
  useRef,
  useEffect,
} from 'react';

import { useTranslation } from 'react-i18next';

import { setMLDraftContent } from '../../../../../../bll/reducers';
import { MLContentType, SocialNetwork } from '../../../../../../common/constants';
import { useAppDispatch } from '../../../../../../common/hooks';
import { Nullable, TImageFile, TMLContent } from '../../../../../../common/types/instance';
import { TMLDraftContent } from '../../../../../../common/types/instance/multilink';
import { Icon } from '../../../../../components/elements';
import { DropZoneField } from '../../../../../components/modules/imageForm/DropZoneField';
import { Modal } from '../../../../../components/modules/modals/Modal';

import { MLLinkForm } from './MLLinkForm';
import { MLTextarea } from './MLTextarea';

type TMLContentProps = {
  template: number[];
  contentSet: TMLDraftContent[];
};

type TContentBlock = {
  type: MLContentType;
  content: Nullable<ReactElement>;
};

export const MLContent: FC<TMLContentProps> = ({ template, contentSet }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['pages', 'common']);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageFiles, setImageFiles] = useState<Array<TImageFile>>([]);
  const [contentBlocks, setContentBlocks] = useState<boolean[]>(
    contentSet.map((block, i) => false),
  );

  const onImageZoneChange = useCallback(
    (imageFile: TImageFile, id?: number) => {
      setImageFiles([imageFile]);
      dispatch(
        setMLDraftContent({
          order: id || 0,
          type: MLContentType.IMAGE,
          isFilled: true,
          link: null,
          linkType: null,
          title: null,
          text: null,
          img: imageFile,
        }),
      );
    },
    [dispatch],
  );

  const changeTextBlock = useCallback(
    (text: string, order: number) => {
      dispatch(setMLDraftContent({ ...contentSet[order], isFilled: !!text, text }));
    },
    [contentSet, dispatch],
  );

  const closeModal = useCallback(
    (order: number) => {
      setContentBlocks(contentBlocks.map((el, i) => (i === order ? false : el)));
    },
    [contentBlocks],
  );

  const onBlockClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const order = +e.currentTarget.dataset.value! as number;
      setContentBlocks(contentBlocks.map((el, i) => (i === order ? true : el)));
    },
    [contentBlocks],
  );

  const contentEditorSwitcher = (order: number, type: MLContentType) => {
    switch (type) {
      case MLContentType.TEXT:
        return (
          <MLTextarea
            order={order}
            value={contentSet[order].text}
            changeTextBlock={changeTextBlock}
          />
        );
      case MLContentType.LINK:
        return contentSet[order].isFilled ? (
          <div className="template__link">
            <p>{contentSet[order].title}</p>
            <p>{contentSet[order].link}</p>
          </div>
        ) : (
          <Modal close={() => closeModal(order)}>
            <MLLinkForm order={order} />
          </Modal>
        );
      case MLContentType.IMAGE:
        return (
          <DropZoneField
            id={order}
            onChange={onImageZoneChange}
            imageFiles={imageFiles}
            touched={false}
          />
        );
      default:
        return <></>;
    }
  };

  const templateLayout = (
    <ul className="template">
      {template.map((block, i) => (
        <li
          key={id[i]}
          style={{ flex: `0 1 ${block}%` }}
          className={`template__block ${contentBlocks[i] ? '_filled' : '_interactive'}`}>
          {contentBlocks[i] ? (
            contentEditorSwitcher(i, contentSet[i].type)
          ) : (
            <button value={contentSet[i].type} data-value={i} onClick={onBlockClick} type="button">
              <Icon name="circle-add" />
            </button>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <h3 className="paper-title">{t('pages:multilink.creation.stages.content')}</h3>
      <div className="multilink-editor__constructor">{templateLayout}</div>
    </>
  );
};

const id = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
