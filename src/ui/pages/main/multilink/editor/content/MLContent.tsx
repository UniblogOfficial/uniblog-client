import React, { useCallback, MouseEvent, useState, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { MLImageEditor } from './MLImageEditor';
import { MLLinkEditor } from './MLLinkEditor';
import { MLLogoEditor } from './MLLogoEditor';
import { MLShopEditor } from './MLShopEditor';
import { MLTextEditor } from './MLTextEditor/MLTextEditor';

import { addMLDraftBlock } from 'bll/reducers';
import { MLContentType } from 'common/constants';
import { useAppDispatch } from 'common/hooks';
import { Nullable, TImageFile, TMLDraftBlocks, TMLDraftImages } from 'common/types/instance';
import { Button } from 'ui/components/elements';

type TMLContentProps = {
  contentMap: MLContentType[];
  blocks: TMLDraftBlocks;
  images: TMLDraftImages;
  blockEditorType: Nullable<MLContentType>;
  blockEditorOrder: number;
  setBlockEditor: (payload: { type: MLContentType; order: number } | null) => void;
};

export const MLContent = (props: TMLContentProps) => {
  const dispatch = useAppDispatch();
  const { contentMap, blocks, images, blockEditorType, blockEditorOrder, setBlockEditor } = props;
  const { t } = useTranslation(['pages', 'common']);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageFiles, setImageFiles] = useState<Array<TImageFile>>([]);

  const onButtonEditorClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (e.currentTarget.dataset.value) {
        setBlockEditor(null);
        return;
      }
      dispatch(addMLDraftBlock(e.currentTarget.value as MLContentType));
      setBlockEditor({ type: e.currentTarget.value as MLContentType, order: contentMap.length });
    },
    [contentMap.length, dispatch, setBlockEditor],
  );

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

  const currentEditor = useMemo(() => {
    switch (blockEditorType) {
      case MLContentType.LOGO: {
        const currentBlock = blocks.logoBlocks[blockEditorOrder];
        return (
          currentBlock && (
            <div className="ml-logo-editor">
              <MLLogoEditor
                order={blockEditorOrder}
                block={currentBlock}
                images={images.blocks.logoBlocks[blockEditorOrder]}
              />
            </div>
          )
        );
      }
      case MLContentType.TEXT: {
        const currentBlock = blocks.textBlocks[blockEditorOrder];
        return currentBlock && <MLTextEditor order={blockEditorOrder} block={currentBlock} />;
      }
      case MLContentType.IMAGETEXT: {
        const currentBlock = blocks.imageTextBlocks[blockEditorOrder];
        return currentBlock && <>Not implemented</>;
      }
      case MLContentType.IMAGE: {
        const currentBlock = blocks.imageBlocks[blockEditorOrder];
        return (
          currentBlock && (
            <div className="ml-image-editor">
              <MLImageEditor
                order={blockEditorOrder}
                block={currentBlock}
                images={images.blocks.imageBlocks[blockEditorOrder]}
              />
            </div>
          )
        );
      }
      case MLContentType.LINK: {
        const currentBlock = blocks.linkBlocks[blockEditorOrder];
        return (
          currentBlock && <MLLinkEditor order={blockEditorOrder} close={onButtonEditorClick} />
        );
      }
      case MLContentType.SOCIAL: {
        const currentBlock = blocks.socialBlocks[blockEditorOrder];
        return currentBlock && <>Not implemented</>;
      }
      case MLContentType.SHOP: {
        const currentBlock = blocks.shopBlocks[blockEditorOrder];
        return (
          currentBlock && (
            <div className="ml-shop-editor">
              <MLShopEditor
                order={blockEditorOrder}
                block={blocks.shopBlocks[blockEditorOrder]}
                images={images.blocks.shopBlocks[blockEditorOrder]}
              />
            </div>
          )
        );
      }
      default:
        return <>Not implemented</>;
    }
  }, [blockEditorOrder, blockEditorType, blocks, images.blocks, onButtonEditorClick]);

  return (
    <>
      {!blockEditorType && actionButtons}
      {blockEditorType && currentEditor}
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
