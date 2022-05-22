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

import { addMLDraftBlock, setMLDraftTextBlockContent } from '../../../../../../bll/reducers';
import { MLContentType, SocialNetwork } from '../../../../../../common/constants';
import { useAppDispatch } from '../../../../../../common/hooks';
import {
  IMLDraftContentText,
  Nullable,
  TImageFile,
  TMLContent,
} from '../../../../../../common/types/instance';
import { TMLDraftBlocks } from '../../../../../../common/types/instance/mlDraft';
import { Button, Icon } from '../../../../../components/elements';
import { DropZoneField } from '../../../../../components/modules/imageForm/DropZoneField';
import { Modal } from '../../../../../components/modules/modals/Modal';

import { MLLinkForm } from './MLLinkForm';
import { MLTextarea } from './MLTextarea';

type TMLContentProps = {
  contentSet: MLContentType[];
  blocks: TMLDraftBlocks;
  blockEditorType: Nullable<MLContentType>;
  blockEditorOrder: Nullable<number>;
  setBlockEditor: (payload: { type: MLContentType; order: number } | null) => void;
};

export const MLContent = (props: TMLContentProps) => {
  const dispatch = useAppDispatch();
  const { contentSet, blocks, blockEditorType, blockEditorOrder, setBlockEditor } = props;
  const { t } = useTranslation(['pages', 'common']);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageFiles, setImageFiles] = useState<Array<TImageFile>>([]);

  const [contentBlocks, setContentBlocks] = useState<boolean[]>(
    contentSet.map((block, i) => false),
  );

  const onImageZoneChange = useCallback((imageFile: TImageFile, id?: number) => {
    setImageFiles([imageFile]);
    /* dispatch(
        setMLDraftTextBlockContent({
          order: id || 0,
          type: MLContentType.IMAGE,
          isFilled: true,
          images: [imageFile],
        }),
      ); */
  }, []);

  const changeTextBlock = useCallback(
    (text: string, order: number) => {
      const block = blocks.textSet[order];
      if (!block) {
        return;
      }

      block.text = text;
      dispatch(setMLDraftTextBlockContent(block, order));
    },
    [blocks.textSet, dispatch],
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

  const onButtonEditorClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.dataset.value) {
      setBlockEditor(null);
      return;
    }
    dispatch(addMLDraftBlock(e.currentTarget.value as MLContentType));
    setBlockEditor({ type: e.currentTarget.value as MLContentType, order: contentSet.length });
  };

  /*   const contentEditorSwitcher = (order: number, type: MLContentType) => {
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
  ); */

  const actionButtons = (
    <>
      <div>
        <Button
          value={MLContentType.TEXT}
          onClick={onButtonEditorClick}
          className="button _full _rounded">
          Add text block
        </Button>
      </div>
      <div>
        <Button
          value={MLContentType.LINK}
          onClick={onButtonEditorClick}
          className="button _full _rounded">
          Add link block
        </Button>
      </div>
      <div>
        <Button
          value={MLContentType.IMAGE}
          onClick={onButtonEditorClick}
          className="button _full _rounded">
          Add image block
        </Button>
      </div>
      <div>
        <Button
          value={MLContentType.IMAGETEXT}
          onClick={onButtonEditorClick}
          className="button _full _rounded">
          Add image-text block
        </Button>
      </div>
      <div>
        <Button
          value={MLContentType.SOCIAL}
          onClick={onButtonEditorClick}
          className="button _full _rounded">
          Add socials block
        </Button>
      </div>
      <div>
        <Button
          value={MLContentType.LOGO}
          onClick={onButtonEditorClick}
          className="button _full _rounded">
          Add logo block
        </Button>
      </div>
      <div>
        <Button disabled className="button _full _rounded">
          Add icon-text block
        </Button>
      </div>
      <div>
        <Button disabled className="button _full _rounded">
          Add divider
        </Button>
      </div>
      <div>
        <Button disabled className="button _full _rounded">
          Add image-carousel block
        </Button>
      </div>
      <div>
        <Button disabled className="button _full _rounded">
          Add audio block
        </Button>
      </div>
      <div>
        <Button disabled className="button _full _rounded">
          Add video block
        </Button>
      </div>
    </>
  );

  return (
    <>
      {!blockEditorType && actionButtons}
      {blockEditorType === MLContentType.TEXT && blockEditorOrder && (
        <>
          <MLTextarea
            order={blockEditorOrder}
            value={blocks.textSet[blockEditorOrder]?.text ?? ''}
            changeTextBlock={changeTextBlock}
          />
        </>
      )}
      {blockEditorType === MLContentType.LINK && blockEditorOrder && (
        <>
          <MLLinkForm order={blockEditorOrder} close={onButtonEditorClick} />
        </>
      )}
      {blockEditorType && blockEditorType !== MLContentType.LINK && (
        <div className="action-buttons">
          <Button
            value={blockEditorType}
            data-value="-1"
            variant="cancel"
            onClick={onButtonEditorClick}
            className="button _rounded">
            {t('common:buttons.cancel')}
          </Button>
          <Button
            value={blockEditorType}
            data-value="-1"
            onClick={onButtonEditorClick}
            className="button _rounded">
            {t('common:buttons.ok')}
          </Button>
        </div>
      )}
    </>
  );
};

const id = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
