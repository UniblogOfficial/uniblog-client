import React, { useCallback, MouseEvent, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { addMLDraftBlock } from '../../../../../../bll/reducers';
import { MLContentType, SocialNetwork } from '../../../../../../common/constants';
import { useAppDispatch } from '../../../../../../common/hooks';
import {
  IMLDraftContentText,
  Nullable,
  TImageFile,
  TMLContent,
  TMLDraftBlocks,
  TMLDraftImages,
} from '../../../../../../common/types/instance';
import { Button } from '../../../../../components/elements';

import { MLImageEditor } from './MLImageEditor';
import { MLLinkForm } from './MLLinkForm';
import { MLLogoEditor } from './MLLogoEditor';
import { MLShopEditor } from './MLShopEditor';
import { MLTextarea } from './MLTextarea';

type TMLContentProps = {
  contentSet: MLContentType[];
  blocks: TMLDraftBlocks;
  images: TMLDraftImages;
  blockEditorType: Nullable<MLContentType>;
  blockEditorOrder: number;
  setBlockEditor: (payload: { type: MLContentType; order: number } | null) => void;
};

export const MLContent = (props: TMLContentProps) => {
  const dispatch = useAppDispatch();
  const { contentSet, blocks, images, blockEditorType, blockEditorOrder, setBlockEditor } = props;
  const { t } = useTranslation(['pages', 'common']);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageFiles, setImageFiles] = useState<Array<TImageFile>>([]);

  const [contentBlocks, setContentBlocks] = useState<boolean[]>(
    contentSet.map((block, i) => false),
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
      <div>
        <Button
          value={MLContentType.SHOP}
          onClick={onButtonEditorClick}
          className="button _full _rounded">
          Add shop block
        </Button>
      </div>
    </>
  );

  return (
    <>
      {!blockEditorType && actionButtons}
      {blockEditorType === MLContentType.TEXT && (
        <>
          <MLTextarea order={blockEditorOrder} block={blocks.textSet[blockEditorOrder]} />
        </>
      )}
      {blockEditorType === MLContentType.LINK && (
        <>
          <MLLinkForm order={blockEditorOrder} close={onButtonEditorClick} />
        </>
      )}
      {blockEditorType === MLContentType.LOGO && (
        <div className="ml-logo-editor">
          <MLLogoEditor
            order={blockEditorOrder}
            block={blocks.logoSet[blockEditorOrder]}
            images={images.blocks.logoSet[blockEditorOrder]}
          />
        </div>
      )}
      {blockEditorType === MLContentType.IMAGE && (
        <div className="ml-image-editor">
          <MLImageEditor
            order={blockEditorOrder}
            block={blocks.imageSet[blockEditorOrder]}
            images={images.blocks.imageSet[blockEditorOrder]}
          />
        </div>
      )}
      {blockEditorType === MLContentType.SHOP && (
        <div className="ml-shop-editor">
          <MLShopEditor
            order={blockEditorOrder}
            block={blocks.shopSet[blockEditorOrder]}
            images={images.blocks.shopSet[blockEditorOrder]}
          />
        </div>
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
