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
import { MLSocialEditor } from './MLSocialEditor/MLSocialEditor';
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

const getEditorButtons: <T extends Function>(t: T) => TMLContentButton[] = t => [
  {
    name: t('pages:multilink.creation.buttons.addText'),
    type: MLContentType.TEXT,
    isDisabled: false,
  },
  {
    name: t('pages:multilink.creation.buttons.addLink'),
    type: MLContentType.LINK,
    isDisabled: false,
  },
  {
    name: t('pages:multilink.creation.buttons.addImage'),
    type: MLContentType.IMAGE,
    isDisabled: false,
  },
  {
    name: t('pages:multilink.creation.buttons.addImageText'),
    type: MLContentType.IMAGETEXT,
    isDisabled: false,
  },
  {
    name: t('pages:multilink.creation.buttons.addSocial'),
    type: MLContentType.SOCIAL,
    isDisabled: false,
  },
  {
    name: t('pages:multilink.creation.buttons.addLogo'),
    type: MLContentType.LOGO,
    isDisabled: false,
  },
  {
    name: t('pages:multilink.creation.buttons.addWidget'),
    type: MLContentType.WIDGET,
    isDisabled: false,
  },
  {
    name: t('pages:multilink.creation.buttons.addVote'),
    type: MLContentType.VOTE,
    isDisabled: true,
  },
  {
    name: t('pages:multilink.creation.buttons.addButton'),
    type: MLContentType.BUTTON,
    isDisabled: false,
  },
  {
    name: t('pages:multilink.creation.buttons.addMap'),
    type: MLContentType.MAP,
    isDisabled: false,
  },
  {
    name: t('pages:multilink.creation.buttons.addPost'),
    type: MLContentType.POST,
    isDisabled: true,
  },
  {
    name: t('pages:multilink.creation.buttons.addDivider'),
    type: MLContentType.DIVIDER,
    isDisabled: true,
  },
  {
    name: t('pages:multilink.creation.buttons.addCarousel'),
    type: MLContentType.CAROUSEL,
    isDisabled: false,
  },
  {
    name: t('pages:multilink.creation.buttons.addAudio'),
    type: MLContentType.AUDIO,
    isDisabled: false,
  },
  {
    name: t('pages:multilink.creation.buttons.addVideo'),
    type: MLContentType.VIDEO,
    isDisabled: true,
  },
  {
    name: t('pages:multilink.creation.buttons.addTimer'),
    type: MLContentType.TIMER,
    isDisabled: false,
  },
  {
    name: t('pages:multilink.creation.buttons.addShop'),
    type: MLContentType.SHOP,
    isDisabled: false,
  },
  {
    name: t('pages:multilink.creation.buttons.addFeedback'),
    type: MLContentType.FEEDBACK,
    isDisabled: true,
  },
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

  const actionButtons = getEditorButtons(t).map(({ name, type, isDisabled }) => (
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
          })(MLSocialEditor);
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
        description={t('pages:multilink.creation.deleteBlockConfirm')}
      />
      {blockEditorType && (
        <div className="action-buttons">
          <Button
            value={blockEditorType}
            data-value="delete"
            variant="cancel"
            onClick={onButtonEditorClick}
            className="button _rounded">
            {t('common:buttons.delete')}
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
