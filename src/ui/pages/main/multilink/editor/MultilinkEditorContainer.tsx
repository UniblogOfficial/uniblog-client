import React, { useMemo, useState, MouseEvent, useCallback, FC } from 'react';

import { useTranslation } from 'react-i18next';

import { publishMultilink } from '../../../../../bll/reducers';
import { ID, MLContentType } from '../../../../../common/constants';
import { useAppDispatch, useAppSelector } from '../../../../../common/hooks';
import { Nullable, TImageFile, TMultilinkDraft, TUser } from '../../../../../common/types/instance';
import { Button, Icon } from '../../../../components/elements';
import {
  MLImages,
  MLImageText,
  MLLink,
  MLLogo,
  MLSocial,
  MLText,
  MLVideo,
} from '../../../../components/modules/mlBlocks';
import { MLShop } from '../../../../components/modules/mlBlocks/mlShop/MLShop';

import { MLBackground } from './background/MLBackground';
import { MLContent } from './content/MLContent';
import { MLPreview } from './preview/MLPreview';
import { MLTemplate } from './template/MLTemplate';
import { MLTemplates } from './template/MLTemplates';

type TMultilinkEditorContainerProps = {
  userData: TUser;
};

enum EditorStage {
  TEMPLATE = 0,
  BACKGROUND = 1,
  CONTENT = 2,
  PREVIEW = 3,
}

const voidOrder = -1;

export const MultilinkEditorContainer: FC<TMultilinkEditorContainerProps> = ({ userData }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['pages', 'common']);
  const [stage, setStage] = useState<EditorStage>(0);
  const [blockEditorType, setBlockEditorType] = useState<Nullable<MLContentType>>(null);
  const [blockEditorOrder, setBlockEditorOrder] = useState(voidOrder);
  const { name, background, contentSet, blocks, images } = useAppSelector<TMultilinkDraft>(
    state => state.mlDraft,
  );

  const stageTitles = useMemo(
    () => [
      t('pages:multilink.creation.stages.template'),
      t('pages:multilink.creation.stages.background'),
      t('pages:multilink.creation.stages.content'),
      t('pages:multilink.creation.stages.preview'),
    ],
    [t],
  );

  const setBlockEditor = (payload: { type: MLContentType; order: number } | null) => {
    if (payload) {
      setBlockEditorType(payload.type);
      setBlockEditorOrder(payload.order);
    } else {
      setBlockEditorType(null);
      setBlockEditorOrder(voidOrder);
    }
  };

  const onPublishButtonClick = () => {
    if (contentSet) {
      dispatch(publishMultilink({ name, background, contentSet, blocks, images }));
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
      const templateClassName = limited ? 'ml-template' : 'ml-template template_unlimited';
      const templateBackground = images.background
        ? `url(${images.background.previewUrl})`
        : background;
      return (
        <div className={templateClassName} style={{ background: templateBackground }}>
          {contentSet.map((type, i) => {
            let block;
            let image;
            const callback = editable ? () => setBlockEditor({ type, order: i }) : undefined;
            switch (type) {
              case MLContentType.LOGO:
                block = blocks.logoSet[i];
                // variable image is one or set of images of current block
                image = images.blocks.logoSet[i];
                return <MLLogo key={ID[i]} block={block} images={image} callback={callback} />;
              case MLContentType.TEXT:
                block = blocks.textSet[i];
                return <MLText key={ID[i]} block={block} callback={callback} />;
              case MLContentType.LINK:
                block = blocks.linkSet[i];
                return <MLLink key={ID[i]} block={block} callback={callback} />;
              case MLContentType.SOCIAL:
                block = blocks.socialSet[i];
                return <MLSocial key={ID[i]} block={block} callback={callback} isPublic={false} />;
              case MLContentType.IMAGE:
                block = blocks.imageSet[i];
                image = images.blocks.imageSet[i];
                return <MLImages key={ID[i]} block={block} images={image} callback={callback} />;
              case MLContentType.IMAGETEXT:
                block = blocks.imageTextSet[i];
                image = images.blocks.imageTextSet[i];
                return <MLImageText key={ID[i]} block={block} images={image} callback={callback} />;
              case MLContentType.VIDEO:
                block = blocks.videoSet[i];
                return <MLVideo key={ID[i]} block={block} callback={callback} />;
              case MLContentType.SHOP:
                block = blocks.shopSet[i];
                image = images.blocks.shopSet[i];
                return <MLShop key={ID[i]} block={block} images={image} callback={callback} />;
              default:
                return <li key={ID[i]} />;
            }
          })}
        </div>
      );
    },
    [contentSet, blocks, background, images.blocks, images.background],
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
            {stage === EditorStage.TEMPLATE && <MLTemplate userData={userData} />}
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
              {stage === EditorStage.TEMPLATE && <MLTemplates userData={userData} />}
              {stage === EditorStage.BACKGROUND && <MLBackground />}
              {stage === EditorStage.CONTENT && (
                <MLContent
                  contentSet={contentSet}
                  blocks={blocks}
                  images={images}
                  blockEditorType={blockEditorType}
                  blockEditorOrder={blockEditorOrder}
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
