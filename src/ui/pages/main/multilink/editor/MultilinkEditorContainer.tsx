import React, { useMemo, useState, MouseEvent, useCallback, FC } from 'react';

import { useTranslation } from 'react-i18next';

import { MLButton } from '../../../../components/modules/mlBlocks/mlButton/MLButton';

import { MLBackground } from './background/MLBackground';
import { MLContent } from './content/MLContent';
import { MLPreview } from './preview/MLPreview';
import { MLTemplate } from './template/MLTemplate';
import { MLTemplates } from './template/MLTemplates';

import { publishMultilink } from 'bll/reducers';
import { ID, MLContentType } from 'common/constants';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { Nullable, TImageFile, TMultilinkDraft, TUser } from 'common/types/instance';
import {
  MLDraftAudio,
  MLDraftButton,
  MLDraftImage,
  MLDraftImageText,
  MLDraftLink,
  MLDraftLogo,
  MLDraftShop,
  MLDraftSocial,
  MLDraftText,
  MLDraftVideo,
  MLDraftVote,
  MLDraftWidget,
  TMLDraftBlocksUnion,
} from 'common/types/instance/mlDraft';
import { Button, Icon } from 'ui/components/elements';
import {
  MLImage,
  MLImageText,
  MLLink,
  MLLogo,
  MLShop,
  MLSocial,
  MLText,
  MLVideo,
  MLVote,
} from 'ui/components/modules/mlBlocks';
import { MLWidget } from 'ui/components/modules/mlBlocks/mlWidget/MLWidget';

type TMultilinkEditorContainerProps = {
  userData: TUser;
};

enum EditorStage {
  TEMPLATE = 0,
  BACKGROUND = 1,
  CONTENT = 2,
  PREVIEW = 3,
}

const voidOrder = '-1';

export const MultilinkEditorContainer: FC<TMultilinkEditorContainerProps> = ({ userData }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['pages', 'common']);
  const [stage, setStage] = useState<EditorStage>(0);
  const [blockEditorType, setBlockEditorType] = useState<Nullable<MLContentType>>(null);
  const [blockEditorId, setBlockEditorId] = useState(voidOrder);
  const [currentMLTemplate, setCurrentMLTemplate] = useState(0);
  const { name, background, maxWidth, contentMap, blocks, images } =
    useAppSelector<TMultilinkDraft>(state => state.mlDraft);
  const stageTitles = useMemo(
    () => [
      t('pages:multilink.creation.stages.template'),
      t('pages:multilink.creation.stages.background'),
      t('pages:multilink.creation.stages.content'),
      t('pages:multilink.creation.stages.preview'),
    ],
    [t],
  );

  const setBlockEditor = (payload: { type: MLContentType; id: string } | null) => {
    if (payload) {
      setBlockEditorType(payload.type);
      setBlockEditorId(payload.id);
    } else {
      setBlockEditorType(null);
      setBlockEditorId(voidOrder);
    }
  };

  const onPublishButtonClick = () => {
    if (contentMap) {
      dispatch(publishMultilink({ name, background, maxWidth, contentMap, blocks, images }));
    }
  };

  const onNextButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (Number(e.currentTarget.value) > 0) {
      stage < 3 && setStage(stage + Number(e.currentTarget.value)); // to next stage
    }
    if (Number(e.currentTarget.value) < 0) {
      stage > 0 && setStage(stage + Number(e.currentTarget.value)); // to previous stage
    }
  };

  const getLayout = useCallback(
    (editable: boolean, limited: boolean) => {
      const templateClassName = limited ? 'ml-template' : 'ml-template ml-template_unlimited';
      const templateBackground = images.background
        ? `url(${images.background.previewUrl})`
        : background;
      return (
        <div className={templateClassName} style={{ background: templateBackground }}>
          {contentMap.map((contentId, i) => {
            const [type, id] = contentId.split('_') as [MLContentType, string];
            const block: TMLDraftBlocksUnion = blocks[contentId];
            let image;
            const callback = editable ? () => setBlockEditor({ type, id }) : undefined;
            if (block instanceof MLDraftText) {
              return <MLText key={id} id={id} block={block} callback={callback} />;
            }
            if (block instanceof MLDraftSocial) {
              return <MLSocial key={id} id={id} block={block} callback={callback} />;
            }
            if (block instanceof MLDraftWidget) {
              return <MLWidget key={id} id={id} block={block} callback={callback} />;
            }
            if (block instanceof MLDraftVideo) {
              return <MLVideo key={id} id={id} block={block} callback={callback} />;
            }
            if (block instanceof MLDraftAudio) {
              return <>audio block</>;
            }
            if (block instanceof MLDraftVote) {
              return <MLVote key={id} id={id} block={block} callback={callback} />;
            }
            if (block instanceof MLDraftLogo) {
              image = images.blocks[MLContentType.LOGO][i];
              return <MLLogo key={id} id={id} block={block} images={image} callback={callback} />;
            }
            if (block instanceof MLDraftLink) {
              image = images.blocks[MLContentType.LINK][i];
              return <MLLink key={id} id={id} block={block} image={image} callback={callback} />;
            }

            if (block instanceof MLDraftButton) {
              image = images.blocks[MLContentType.BUTTON][i];
              return <MLButton key={id} id={id} block={block} callback={callback} />;
            }
            if (block instanceof MLDraftImage) {
              image = images.blocks[MLContentType.IMAGE][i];
              return <MLImage key={id} id={id} block={block} image={image} callback={callback} />;
            }
            if (block instanceof MLDraftImageText) {
              image = images.blocks[MLContentType.IMAGETEXT][i];
              return (
                <MLImageText key={id} id={id} block={block} image={image} callback={callback} />
              );
            }
            if (block instanceof MLDraftShop) {
              image = images.blocks[MLContentType.SHOP][i];
              return <MLShop key={id} id={id} block={block} images={image} callback={callback} />;
            }
            return <li key={ID[i]} />;
          })}
        </div>
      );
    },
    [contentMap, blocks, background, images.blocks, images.background],
  );
  return (
    <>
      <div className="grid__row multilink-editor__nav paper">
        <div className="button">
          {stage > 0 && (
            <Button onClick={onNextButtonClick} value="-1" className="button _rounded">
              {t('common:buttons.back')}
            </Button>
          )}
        </div>
        <h3 className="paper-title">{stageTitles[stage]}</h3>
        <div className="button _right">
          <Button onClick={onNextButtonClick} value="1" className="button _rounded">
            {t('common:buttons.next')}
          </Button>
        </div>
      </div>
      <div
        className="grid__row paper"
        style={stage === EditorStage.PREVIEW ? { justifyContent: 'center' } : undefined}>
        <div className="multilink-editor">
          <section className="ml-creation-area">
            {stage === EditorStage.TEMPLATE && (
              <MLTemplate userData={userData} currentMLTemplate={currentMLTemplate} />
            )}
            {stage === EditorStage.BACKGROUND && (
              <div className="multilink-editor__constructor">{getLayout(false, false)}</div>
            )}
            {stage === EditorStage.CONTENT && (
              <div className="multilink-editor__constructor">{getLayout(true, false)}</div>
            )}
            {stage === EditorStage.PREVIEW && (
              <div className="multilink-editor__constructor">{getLayout(false, true)}</div>
            )}
          </section>
          <section className="tools-area">
            <div className="tools-area__container">
              {stage === EditorStage.TEMPLATE && (
                <MLTemplates userData={userData} setCurrentMLTemplate={setCurrentMLTemplate} />
              )}
              {stage === EditorStage.BACKGROUND && <MLBackground />}
              {stage === EditorStage.CONTENT && (
                <MLContent
                  contentMap={contentMap}
                  blocks={blocks}
                  images={images}
                  blockEditorType={blockEditorType}
                  blockEditorId={blockEditorId}
                  setBlockEditor={setBlockEditor}
                />
              )}
              {stage === EditorStage.PREVIEW && <MLPreview name={name} username={userData.name} />}
              {stage === EditorStage.PREVIEW && (
                <div className="action-buttons">
                  <Button onClick={onPublishButtonClick} className="button _rounded">
                    {t('common:buttons.ok')}
                  </Button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
