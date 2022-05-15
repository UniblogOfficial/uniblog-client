import React, { useMemo, useState, MouseEvent, useCallback, FC } from 'react';

import { useTranslation } from 'react-i18next';

import { publishMultilink } from '../../../../../bll/reducers';
import { MLContentType } from '../../../../../common/constants';
import { useAppDispatch, useAppSelector } from '../../../../../common/hooks';
import { Nullable, TMLContent, TMultilinkDraft, TUser } from '../../../../../common/types/instance';
import { TMLDraftContent } from '../../../../../common/types/instance/multilink';
import { parseRawImage } from '../../../../../common/utils/ui';
import phone from '../../../../../img/phone.png';
import { Button, Icon } from '../../../../components/elements';

import { MLBackground } from './background/MLBackground';
import { MLContent } from './content/MLContent';
import { MLPreview } from './preview/MLPreview';
import { MLTemplate } from './template/MLTemplate';

type TMultilinkEditorContainerProps = {
  userData: TUser;
};

enum EditorStage {
  TEMPLATE = 1,
  BACKGROUND = 2,
  CONTENT = 3,
  PREVIEW = 4,
}

export const MultilinkEditorContainer: FC<TMultilinkEditorContainerProps> = ({ userData }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['pages', 'common']);
  const [stage, setStage] = useState<EditorStage>(1);
  const { name, avatar, logo, template, background, contentSet } = useAppSelector<TMultilinkDraft>(
    state => state.multilink.multilinkDraft,
  );

  const onPublishButtonClick = () => {
    const backgroundDefault = '#fff';
    if (template && contentSet) {
      dispatch(
        publishMultilink({
          name,
          logo,
          template,
          background: background || backgroundDefault,
          contentSet,
        }),
      );
    }
  };

  const onNextButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    stage < 5 && stage >= 1 && setStage(stage + Number(e.currentTarget.value));
  };

  const getPreviewBlockLayout = useCallback((content: TMLDraftContent) => {
    switch (content.type) {
      case MLContentType.LINK:
        return <div className="link">{content.title}</div>;
      case MLContentType.TEXT:
        return <p className="text">{content.text}</p>;
      case MLContentType.IMAGE:
        return content.isFilled ? <img src={content.img?.previewUrl} alt="img" /> : null;
      default:
        break;
    }
  }, []);

  const currentPreviewLayout = useMemo(
    () => (
      <>
        {template?.map((el: number, i: number) => {
          const { isFilled } = contentSet[i];
          return (
            <div
              key={id[i]}
              style={{ flex: `0 1 ${el}%`, backgroundColor: isFilled ? undefined : '#0002' }}>
              {getPreviewBlockLayout(contentSet[i])}
            </div>
          );
        })}
      </>
    ),
    [contentSet, getPreviewBlockLayout, template],
  );

  const logoSrc = avatar ? parseRawImage(avatar) : undefined;

  return (
    <div
      className="grid__row multilink-editor"
      style={stage === EditorStage.PREVIEW ? { justifyContent: 'center' } : undefined}>
      {stage !== EditorStage.PREVIEW && (
        <section className="ml-creation-area">
          <div className="paper _with-button-bottom">
            {stage === EditorStage.TEMPLATE && <MLTemplate />}
            {stage === EditorStage.BACKGROUND && <MLBackground />}
            {stage === EditorStage.CONTENT && template && contentSet && (
              <MLContent template={template} contentSet={contentSet} />
            )}

            {stage > 1 && (
              <Button
                onClick={onNextButtonClick}
                value="-1"
                className="button _back-ml-editor _rounded">
                {t('common:buttons.back')}
              </Button>
            )}

            <div className="paper__button-container">
              <Button onClick={onNextButtonClick} value="1" className="button _full _paper">
                {t('common:buttons.next')}
              </Button>
            </div>
          </div>
        </section>
      )}
      <section
        className="preview-area"
        style={stage === EditorStage.PREVIEW ? { flex: '0 0 550px' } : undefined}>
        <div className="paper">
          <h3 className="paper-title">{t('pages:multilink.creation.stages.preview')}</h3>
          {stage === EditorStage.PREVIEW && <MLPreview name={name} username={userData.name} />}
          <div className="preview-device">
            <div className="phone">
              <div className="phone__container" style={{ background }}>
                <div className="phone__logo">
                  {logoSrc ? (
                    <img className="img-default" src={logoSrc} alt="logo" />
                  ) : (
                    <Icon name="user" />
                  )}
                </div>
                <h4 className="phone__user-title">
                  <strong>{name}</strong>
                </h4>
                <div className="phone__template">{currentPreviewLayout}</div>
              </div>
              <div className="phone__layout">
                <img src={phone} alt="phone-layout" />
              </div>
            </div>
          </div>
          {stage === EditorStage.PREVIEW && (
            <div className="action-buttons">
              <Button
                onClick={onNextButtonClick}
                value="-1"
                className="button _back-ml-editor _rounded">
                {t('common:buttons.back')}
              </Button>
              <Button onClick={onPublishButtonClick} className="button _rounded">
                {t('common:buttons.ok')}
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const id = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
