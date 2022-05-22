import React, { useMemo, useState, MouseEvent, useCallback, FC } from 'react';

import { useTranslation } from 'react-i18next';

import { publishMultilink } from '../../../../../bll/reducers';
import { MLContentType } from '../../../../../common/constants';
import { useAppDispatch, useAppSelector } from '../../../../../common/hooks';
import { Nullable, TMultilinkDraft, TUser } from '../../../../../common/types/instance';
import { Button, Icon } from '../../../../components/elements';
import {
  MLImages,
  MLImageText,
  MLLink,
  MLLogo,
  MLSocial,
  MLText,
} from '../../../../components/modules/mlBlocks';

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

export const MultilinkEditorContainer: FC<TMultilinkEditorContainerProps> = ({ userData }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['pages', 'common']);
  const [stage, setStage] = useState<EditorStage>(0);
  const [blockEditorType, setBlockEditorType] = useState<Nullable<MLContentType>>(null);
  const [blockEditorOrder, setBlockEditorOrder] = useState<Nullable<number>>(null);
  const { name, background, contentSet, blocks } = useAppSelector<TMultilinkDraft>(
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
      setBlockEditorOrder(null);
    }
  };

  const onPublishButtonClick = () => {
    /* const backgroundDefault = '#fff';
    if (contentSet) {
      dispatch(
        publishMultilink({
          name,
          logo,
          background: background || backgroundDefault,
          contentSet,
        }),
      );
    } */
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
    () => (
      <div className="template template_unlimited" style={{ background: background ?? undefined }}>
        {contentSet.map((type, i) => {
          let block;
          switch (type) {
            case MLContentType.LOGO:
              block = blocks.logoSet[i];
              return <MLLogo block={block} />;
            case MLContentType.TEXT:
              block = blocks.textSet[i];
              return <MLText block={block} />;
            case MLContentType.LINK:
              block = blocks.linkSet[i];
              return <MLLink block={block} />;
            case MLContentType.SOCIAL:
              block = blocks.socialSet[i];
              return <MLSocial block={block} />;
            case MLContentType.IMAGE:
              block = blocks.imageSet[i];
              return <MLImages block={block} />;
            case MLContentType.IMAGETEXT:
              block = blocks.imageTextSet[i];
              return <MLImageText block={block} />;
            default:
              return <li />;
          }
        })}
      </div>
    ),
    [background, contentSet, blocks],
  );

  const getEditableLayout = useCallback(
    () => (
      <div className="template template_unlimited" style={{ background: background ?? undefined }}>
        {contentSet.map((type, i) => {
          let block;
          switch (type) {
            case MLContentType.LOGO:
              block = blocks.logoSet[i];
              return <MLLogo block={block} callback={() => setBlockEditor({ type, order: i })} />;
            case MLContentType.TEXT:
              block = blocks.textSet[i];
              return <MLText block={block} callback={() => setBlockEditor({ type, order: i })} />;
            case MLContentType.LINK:
              block = blocks.linkSet[i];
              return <MLLink block={block} callback={() => setBlockEditor({ type, order: i })} />;
            case MLContentType.SOCIAL:
              block = blocks.socialSet[i];
              return <MLSocial block={block} callback={() => setBlockEditor({ type, order: i })} />;
            case MLContentType.IMAGE:
              block = blocks.imageSet[i];
              return <MLImages block={block} callback={() => setBlockEditor({ type, order: i })} />;
            case MLContentType.IMAGETEXT:
              block = blocks.imageTextSet[i];
              return (
                <MLImageText block={block} callback={() => setBlockEditor({ type, order: i })} />
              );
            default:
              return <li />;
          }
        })}
      </div>
    ),
    [background, contentSet, blocks],
  );
  // const logoSrc = avatar ? parseRawImage(avatar) : undefined;

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
              <div className="multilink-editor__constructor">{getLayout()}</div>
            )}
            {stage === EditorStage.CONTENT && (
              <div className="multilink-editor__constructor">{getEditableLayout()}</div>
            )}
            {stage === EditorStage.PREVIEW && (
              <div className="multilink-editor__constructor">{getLayout()}</div>
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
