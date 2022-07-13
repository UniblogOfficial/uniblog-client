import React, { MouseEvent, useCallback, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { MLImageContentTimer } from '../../../../../../common/types/instance/mlDraft/mlImageContent/mlImageTimer.class';

import { MLAudioEditor } from './MLAudioEditor/MLAudioEditor';
import { MLButtonEditor } from './MLButtonEditor/MLButtonEditor';
import { MLCarouselEditor } from './MLCarouselEditor/MLCarouselEditor';
import { MLImageEditor } from './MLImageEditor/MLImageEditor';
import { MLLinkEditor } from './MLLinkEditor';
import { MLLogoEditor } from './MLLogoEditor/MLLogoEditor';
import { MLMapEditor } from './MLMapEditor';
import { MLShopEditor } from './MLShopEditor/MLShopEditor';
import { MLTextEditor } from './MLTextEditor/MLTextEditor';
import { MlTimerEditor } from './MLTimerEditor/MLTimerEditor';
import { MLWidgetEditor } from './MLWidgetEditor/MLWidgetEditor';
import { withBaseEditor } from './withBaseEditor';

import { addMLDraftBlock, deleteMLDraftBlock } from 'bll/reducers';
import { MLContentType } from 'common/constants';
import { useAppDispatch } from 'common/hooks';
import {
  MLDraftAudio,
  MLDraftButton,
  MLDraftCarousel,
  MLDraftImage,
  MLDraftImageText,
  MLDraftShop,
  MLDraftSocial,
  MLDraftTimer,
  MLDraftWidget,
  Nullable,
  TMLDraftBlocks,
  TMLDraftImages,
} from 'common/types/instance';
import {
  MLDraftLink,
  MLDraftLogo,
  MLDraftMap,
  MLDraftText,
  MLDraftVideo,
  TMLDraftBlocksUnion,
} from 'common/types/instance/mlDraft';
import {
  MLImageContentCarousel,
  MLImageContentImage,
  MLImageContentLink,
  MLImageContentLogo,
  MLImageContentShop,
  TMLDraftImagesBlocksUnion,
} from 'common/types/instance/mlDraft/mlImageContent';
import { nanoid } from 'common/utils/ui/idGeneration/nanoid';
import { Button } from 'ui/components/elements';
import { ModalQuestion } from 'ui/components/modules/modals/ModalQuestion/ModalQuestion';

type TMLContentProps = {
  contentMap: string[];
  blocks: TMLDraftBlocks;
  images: TMLDraftImages;
  blockEditorType: Nullable<MLContentType>;
  blockEditorId: string;
  setBlockEditor: (payload: { type: MLContentType; id: string } | null) => void;
};

type TMLContentButton = {
  name: string;
  type: MLContentType;
  isDisabled: boolean;
};

const ML_CONTENT_BUTTONS: TMLContentButton[] = [
  { name: 'Add text block', type: MLContentType.TEXT, isDisabled: false },
  { name: 'Add link block', type: MLContentType.LINK, isDisabled: false },
  { name: 'Add image block', type: MLContentType.IMAGE, isDisabled: false },
  { name: 'Add image-text block', type: MLContentType.IMAGETEXT, isDisabled: false },
  { name: 'Add socials block', type: MLContentType.SOCIAL, isDisabled: false },
  { name: 'Add logo block', type: MLContentType.LOGO, isDisabled: false },
  { name: 'Add widget block', type: MLContentType.WIDGET, isDisabled: false },
  { name: 'Add vote block', type: MLContentType.VOTE, isDisabled: true },
  { name: 'Add button block', type: MLContentType.BUTTON, isDisabled: false },
  { name: 'Add map block', type: MLContentType.MAP, isDisabled: false },
  { name: 'Add post block', type: MLContentType.POST, isDisabled: true },
  { name: 'Add divider block', type: MLContentType.DIVIDER, isDisabled: true },
  { name: 'Add image-carousel block', type: MLContentType.CAROUSEL, isDisabled: false },
  { name: 'Add audio block', type: MLContentType.AUDIO, isDisabled: false },
  { name: 'Add video block', type: MLContentType.VIDEO, isDisabled: true },
  { name: 'Add timer block', type: MLContentType.TIMER, isDisabled: false },
  { name: 'Add shop block', type: MLContentType.SHOP, isDisabled: false },
];

export const MLContent = (props: TMLContentProps) => {
  const dispatch = useAppDispatch();

  const { blocks, images, blockEditorType, blockEditorId, setBlockEditor } = props;
  const { t } = useTranslation(['pages', 'common']);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const onButtonEditorClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (e.currentTarget.dataset.value === 'ok') {
        setBlockEditor(null);
        return;
      }
      if (e.currentTarget.dataset.value === 'delete') {
        setIsOpenModal(true);
        return;
      }

      const id = nanoid();
      dispatch(addMLDraftBlock({ type: e.currentTarget.value as MLContentType, id }));
      setBlockEditor({ type: e.currentTarget.value as MLContentType, id });
    },
    [dispatch, setBlockEditor],
  );

  const onModalButtonNoClick = useCallback(() => {
    setIsOpenModal(false);
  }, [setIsOpenModal]);

  const onModalButtonYesClick = useCallback(() => {
    setIsOpenModal(false);
    setBlockEditor(null);
    dispatch(deleteMLDraftBlock({ id: blockEditorId, type: blockEditorType as MLContentType }));
  }, [setIsOpenModal, setBlockEditor, dispatch]);

  const actionButtons = ML_CONTENT_BUTTONS.map(({ name, type, isDisabled }) => (
    <Button
      key={name}
      disabled={isDisabled}
      value={type}
      onClick={onButtonEditorClick}
      className="button _full _rounded">
      {name}
    </Button>
  ));

  const currentEditor = useMemo(() => {
    const currentBlock = blocks[`${blockEditorType}_${blockEditorId}`] as TMLDraftBlocksUnion;
    const currentBlockImages = images.blocks[
      `${blockEditorType}_${blockEditorId}`
    ] as TMLDraftImagesBlocksUnion;

    switch (blockEditorType) {
      case MLContentType.TEXT: {
        if (currentBlock instanceof MLDraftText) {
          return withBaseEditor({
            id: blockEditorId,
            block: currentBlock,
          })(MLTextEditor);
        }
        break;
      }
      case MLContentType.SOCIAL: {
        if (currentBlock instanceof MLDraftSocial) {
          return withBaseEditor({
            id: blockEditorId,
            block: currentBlock,
          })(null);
        }
        break;
      }
      case MLContentType.MAP: {
        if (currentBlock instanceof MLDraftMap) {
          return withBaseEditor({
            id: blockEditorId,
            block: currentBlock,
          })(MLMapEditor);
        }
        break;
      }
      case MLContentType.VIDEO: {
        if (currentBlock instanceof MLDraftVideo) {
          return withBaseEditor({
            id: blockEditorId,
            block: currentBlock,
          })(null);
        }
        break;
      }

      case MLContentType.LOGO: {
        if (
          currentBlock instanceof MLDraftLogo &&
          currentBlockImages instanceof MLImageContentLogo
        ) {
          return withBaseEditor({
            id: blockEditorId,
            block: currentBlock,
            images: currentBlockImages,
          })(MLLogoEditor);
        }
        break;
      }
      case MLContentType.IMAGETEXT: {
        if (currentBlock instanceof MLDraftImageText) {
          return withBaseEditor({
            id: blockEditorId,
            block: currentBlock,
          })(null);
        }
        break;
      }
      case MLContentType.IMAGE: {
        if (
          currentBlock instanceof MLDraftImage &&
          currentBlockImages instanceof MLImageContentImage
        ) {
          return withBaseEditor({
            id: blockEditorId,
            block: currentBlock,
            image: currentBlockImages,
          })(MLImageEditor);
        }
        break;
      }
      case MLContentType.LINK: {
        if (
          currentBlock instanceof MLDraftLink &&
          currentBlockImages instanceof MLImageContentLink
        ) {
          return withBaseEditor({
            id: blockEditorId,
            block: currentBlock,
            image: currentBlockImages,
            close: onButtonEditorClick,
          })(MLLinkEditor);
        }
        break;
      }

      case MLContentType.BUTTON: {
        if (currentBlock instanceof MLDraftButton) {
          return withBaseEditor({
            id: blockEditorId,
            block: currentBlock,
          })(MLButtonEditor);
        }
        break;
      }
      case MLContentType.WIDGET: {
        if (currentBlock instanceof MLDraftWidget) {
          return withBaseEditor({
            id: blockEditorId,
            block: currentBlock,
          })(MLWidgetEditor);
        }
        break;
      }
      case MLContentType.SHOP: {
        if (
          currentBlock instanceof MLDraftShop &&
          currentBlockImages instanceof MLImageContentShop
        ) {
          return withBaseEditor({
            id: blockEditorId,
            block: currentBlock,
            images: currentBlockImages,
          })(MLShopEditor);
        }
        break;
      }
      case MLContentType.AUDIO: {
        if (currentBlock instanceof MLDraftAudio) {
          return withBaseEditor({
            id: blockEditorId,
            block: currentBlock,
          })(MLAudioEditor);
        }
        break;
      }
      case MLContentType.CAROUSEL: {
        if (
          currentBlock instanceof MLDraftCarousel &&
          currentBlockImages instanceof MLImageContentCarousel
        ) {
          return withBaseEditor({
            id: blockEditorId,
            block: currentBlock,
            image: currentBlockImages,
          })(MLCarouselEditor);
        }
        break;
      }
      case MLContentType.TIMER: {
        if (
          currentBlock instanceof MLDraftTimer &&
          currentBlockImages instanceof MLImageContentTimer
        ) {
          return withBaseEditor({
            id: blockEditorId,
            block: currentBlock,
            image: currentBlockImages,
          })(MlTimerEditor);
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
      <ModalQuestion
        isOpen={isOpenModal}
        setTrue={onModalButtonYesClick}
        setFalse={onModalButtonNoClick}
        description="Вы дествительно хотите удалить блок?"
      />
      {blockEditorType && (
        <div className="action-buttons">
          <Button
            value={blockEditorType}
            data-value="delete"
            variant="cancel"
            onClick={onButtonEditorClick}
            className="button _rounded">
            Delete
          </Button>
          <Button
            value={blockEditorType}
            data-value="ok"
            onClick={onButtonEditorClick}
            className="button _rounded">
            {t('common:buttons.ok')}
          </Button>
        </div>
      )}
    </>
  );
};
