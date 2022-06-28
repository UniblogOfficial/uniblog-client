import React, { useCallback, MouseEvent, useState, useMemo } from 'react';

import { nanoid } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';

import { MLButtonEditor } from './MLButtonEditor/MLButtonEditor';
import { MLImageEditor } from './MLImageEditor/MLImageEditor';
import { MLLinkEditor } from './MLLinkEditor';
import { MLLogoEditor } from './MLLogoEditor/MLLogoEditor';
import { MLMapEditor } from './MLMapEditor';
import { MLShopEditor } from './MLShopEditor/MLShopEditor';
import { MLTextEditor } from './MLTextEditor/MLTextEditor';
import { MLWidgetEditor } from './MLWidgetEditor/MLWidgetEditor';
import { withBaseEditor } from './withBaseEditor';

import { addMLDraftBlock } from 'bll/reducers';
import { MLContentType } from 'common/constants';
import { useAppDispatch } from 'common/hooks';
import { Nullable, TImageFile, TMLDraftBlocks, TMLDraftImages } from 'common/types/instance';
import {
  MLDraftLink,
  MLDraftLogo,
  MLDraftMap,
  MLDraftText,
  TMLDraftBlocksUnion,
} from 'common/types/instance/mlDraft';
import { Button } from 'ui/components/elements';

type TMLContentProps = {
  contentMap: string[];
  blocks: TMLDraftBlocks;
  images: TMLDraftImages;
  blockEditorType: Nullable<MLContentType>;
  blockEditorId: string;
  setBlockEditor: (payload: { type: MLContentType; id: string } | null) => void;
};

const actionButtonsData = [
  {
    value: MLContentType.TEXT,
    title: 't()', // translation
  },
  // ...
];

export const MLContent = (props: TMLContentProps) => {
  const dispatch = useAppDispatch();
  const { contentMap, blocks, images, blockEditorType, blockEditorId, setBlockEditor } = props;
  const { t } = useTranslation(['pages', 'common']);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageFiles, setImageFiles] = useState<Array<TImageFile>>([]);

  const onButtonEditorClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (e.currentTarget.dataset.value) {
        setBlockEditor(null);
        return;
      }
      const id = nanoid();
      dispatch(addMLDraftBlock({ type: e.currentTarget.value as MLContentType, id }));
      setBlockEditor({ type: e.currentTarget.value as MLContentType, id });
    },
    [dispatch, setBlockEditor],
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
        <Button
          value={MLContentType.WIDGET}
          onClick={onButtonEditorClick}
          className="button _full _rounded">
          Add widget block
        </Button>
      </div>
      <div>
        <Button disabled className="button _full _rounded">
          Add vote block
        </Button>
      </div>
      <div>
        <Button
          value={MLContentType.BUTTON}
          onClick={onButtonEditorClick}
          className="button _full _rounded">
          Add button block
        </Button>
      </div>
      <div>
        <Button
          value={MLContentType.MAP}
          onClick={onButtonEditorClick}
          className="button _full _rounded">
          Add map block
        </Button>
      </div>
      <div>
        <Button disabled className="button _full _rounded">
          Add post block
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
    const currentBlock = blocks[`${blockEditorType}_${blockEditorId}`] as TMLDraftBlocksUnion;
    const order = contentMap.findIndex(el => el === `${blockEditorType}_${blockEditorId}`);
    switch (blockEditorType) {
      case MLContentType.LOGO: {
        if (currentBlock instanceof MLDraftLogo) {
          return (
            currentBlock &&
            withBaseEditor({
              id: blockEditorId,
              block: currentBlock,
              images: images.blocks[blockEditorType][order],
            })(MLLogoEditor)
          );
        }
        break;
      }
      case MLContentType.TEXT: {
        if (currentBlock instanceof MLDraftText) {
          return withBaseEditor({
            id: blockEditorId,
            block: currentBlock,
          })(MLTextEditor);
        }
        break;
      }
      /* case MLContentType.IMAGETEXT: {
        const currentBlock = blocks[blockEditorType][blockEditorId];
        return currentBlock && <>Not implemented</>;
      }
      case MLContentType.IMAGE: {
        const currentBlock = blocks[blockEditorType][blockEditorId];
        return (
          currentBlock && (
            <>
              <MLImageEditor
                order={blockEditorId}
                block={currentBlock}
                images={images.blocks[blockEditorType][blockEditorId]}
              />
            </>
          )
        );
      } */
      case MLContentType.LINK: {
        const image = images.blocks[blockEditorType][order];

        if (currentBlock instanceof MLDraftLink) {
          return withBaseEditor({
            id: blockEditorId,
            block: currentBlock,
            image,
            close: onButtonEditorClick,
          })(MLLinkEditor);
        }
        break;
      }

      /* case MLContentType.BUTTON: {
        const currentBlock = blocks[blockEditorType][blockEditorId];
        return (
          currentBlock &&
          withBaseEditor({
            order: blockEditorId,
            block: currentBlock,
          })(MLButtonEditor)
        );
      }
      case MLContentType.SOCIAL: {
        const currentBlock = blocks[blockEditorType][blockEditorId];
        return (
          currentBlock &&
          withBaseEditor({
            order: blockEditorId,
            block: currentBlock,
          })(null)
        );
      }
      case MLContentType.WIDGET: {
        const currentBlock = blocks[blockEditorType][blockEditorId];
        return (
          currentBlock &&
          withBaseEditor({
            order: blockEditorId,
            block: currentBlock,
          })(MLWidgetEditor)
        );
      }
      case MLContentType.SHOP: {
        const currentBlock = blocks[blockEditorType][blockEditorId];
        return (
          currentBlock &&
          withBaseEditor({
            order: blockEditorId,
            block: currentBlock,
            images: images.blocks[blockEditorType][blockEditorId],
          })(MLShopEditor)
        );
      } */
      case MLContentType.MAP: {
        if (currentBlock instanceof MLDraftMap) {
          return withBaseEditor({
            id: blockEditorId,
            block: currentBlock,
          })(MLMapEditor);
        }
        break;
      }
      default:
        return <>Not implemented</>;
    }
  }, [blockEditorId, blockEditorType, blocks, images.blocks, onButtonEditorClick]);

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
