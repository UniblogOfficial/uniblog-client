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

import { MLContentType, SocialNetwork } from '../../../../../../common/constants';
import { Nullable, TImageFile, TMLContent } from '../../../../../../common/types/instance';
import { TMLDraftContent } from '../../../../../../common/types/instance/multilink';
import { Icon } from '../../../../../components/elements';
import { DropZoneField } from '../../../../../components/modules/imageForm/DropZoneField';
import { Modal } from '../../../../../components/modules/modals/Modal';

import { MLLinkForm } from './MLLinkForm';
import { MLTextarea } from './MLTextarea';

type TMLContentProps = {
  template: number[];
  contentSet: Nullable<TMLDraftContent>[];
  setContent: (data: TMLDraftContent) => void;
};

type TContentBlock = {
  type: MLContentType;
  content: Nullable<ReactElement>;
};

export const MLContent: FC<TMLContentProps> = ({ template, contentSet, setContent }) => {
  const { t } = useTranslation(['pages', 'common']);
  const [textareaValues, setTextareaValues] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<Array<TImageFile>>([]);
  const [contentBlocks, setContentBlocks] = useState<TContentBlock[]>(
    template.map((block, i) => {
      const isLink = block <= 15;
      const isText = block > 15 && block < 40;
      const isPhoto = block >= 40;
      switch (true) {
        case isLink:
          return { type: MLContentType.LINK, content: null };
        case isText:
          return { type: MLContentType.TEXT, content: null };
        case isPhoto:
          return { type: MLContentType.IMAGE, content: null };
        default:
          return { type: MLContentType.UNKNOWN, content: null };
      }
    }),
  );

  const onImageZoneChange = useCallback(
    (imageFile: TImageFile, id?: number) => {
      setImageFiles([imageFile]);
      setContent({
        order: id || 0,
        type: MLContentType.IMAGE,
        link: null,
        linkType: null,
        title: null,
        text: null,
        img: imageFile,
      });
    },
    [setContent],
  );

  const changeTextBlock = useCallback(
    (text: string, order: number) => {
      setTextareaValues(Object.assign([], textareaValues, { orderIndex: text }));
      setContent({
        order,
        type: MLContentType.TEXT,
        link: null,
        linkType: null,
        title: null,
        text,
        img: null,
      });
    },
    [setContent, textareaValues],
  );

  const closeModal = useCallback(
    (order: number) => {
      const copy = [...contentBlocks];
      copy[order].content = <>Вконтактике</>;
      setContentBlocks(copy);
    },
    [contentBlocks],
  );

  const onBlockClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const order = +e.currentTarget.dataset.value! as number;
      const copy = [...contentBlocks];
      switch (e.currentTarget.value) {
        case 'link':
          copy[order].content = (
            <Modal close={() => closeModal(order)}>
              <MLLinkForm order={order} setContent={() => setContent} />
            </Modal>
          );
          break;
        case 'text':
          copy[order].content = (
            <MLTextarea
              order={order}
              value={textareaValues[order]}
              changeTextBlock={changeTextBlock}
            />
          );
          setContent({
            order,
            type: MLContentType.TEXT,
            link: null,
            linkType: null,
            title: null,
            text: '',
            img: null,
          });
          break;
        case 'image':
          copy[order].content = (
            <DropZoneField
              id={order}
              onChange={onImageZoneChange}
              imageFiles={imageFiles}
              touched={false}
            />
          );
          break;
        default:
          copy[order].content = <>unknown</>;
      }
      setContentBlocks(copy);
    },
    [
      contentBlocks,
      setContent,
      textareaValues,
      changeTextBlock,
      onImageZoneChange,
      imageFiles,
      closeModal,
    ],
  );

  const templateLayout = (
    <ul className="template">
      {template.map((block, i) => (
        <li
          key={id[i]}
          style={{ flex: `0 1 ${block}%` }}
          className={`template__block ${contentBlocks[i].content ? '_filled' : '_interactive'}`}>
          {contentBlocks[i].content ? (
            contentBlocks[i].content
          ) : (
            <button
              value={contentBlocks[i].type}
              data-value={i}
              onClick={onBlockClick}
              type="button">
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
