import React, { useMemo, useState, MouseEvent, useCallback, FC } from 'react';

import { useTranslation } from 'react-i18next';

import { publishMultilink } from '../../../../../bll/reducers';
import { MLContentType } from '../../../../../common/constants';
import { useAppDispatch, useAppSelector } from '../../../../../common/hooks';
import { Nullable, TMLContent, TMultilinkDraft, TUser } from '../../../../../common/types/instance';
import { TMLDraftContent } from '../../../../../common/types/instance/multilink';
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
  const [multilinkAttrs, setMultilinkAttrs] = useState<TMultilinkDraft>({
    name: userData.name,
    template: null as Nullable<number[]>,
    background: undefined as undefined | string,
    contentSet: [] as Nullable<TMLDraftContent>[],
  });

  const setTemplate = useCallback(
    (template: number[]) => {
      if (multilinkAttrs.template !== template) {
        setMultilinkAttrs({ ...multilinkAttrs, template, contentSet: template.map(temp => null) });
      }
    },
    [multilinkAttrs],
  );

  const setBackground = useCallback(
    (background: string) => {
      if (multilinkAttrs.background !== background) {
        setMultilinkAttrs({ ...multilinkAttrs, background });
      }
    },
    [multilinkAttrs],
  );

  const setContent = useCallback(
    ({ order, type, link, linkType, title, text, img }: TMLDraftContent) => {
      if (!multilinkAttrs.contentSet[order]) {
        const newContentSet = multilinkAttrs.contentSet;
        newContentSet[order] = { order, type, link, linkType, title, text: '', img };
        setMultilinkAttrs({ ...multilinkAttrs, contentSet: newContentSet });
      } else {
        const newContentSet = multilinkAttrs.contentSet;
        newContentSet[order] = { order, type, link, linkType, title, text, img };
        setMultilinkAttrs({ ...multilinkAttrs, contentSet: newContentSet });
      }
    },
    [multilinkAttrs],
  );

  const onPublishButtonClick = () => {
    const { name, background, template, contentSet } = multilinkAttrs;
    const backgroundDefault = '#fff';
    console.log(template);
    if (template && contentSet) {
      dispatch(
        publishMultilink({
          name,
          template,
          background: background || backgroundDefault,
          contentSet: contentSet.map(
            (content: Nullable<TMLDraftContent>, i: number) =>
              content || {
                order: i,
                type: MLContentType.UNKNOWN,
                link: null,
                linkType: null,
                text: null,
                title: null,
                img: undefined,
              },
          ),
        }),
      );
    }
  };

  const onNextButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget);
    stage < 5 && stage >= 1 && setStage(stage + Number(e.currentTarget.value));
  };

  const getPreviewBlockLayout = useCallback((content: TMLDraftContent) => {
    switch (content.type) {
      case MLContentType.LINK:
        return <div className="link">{content.title}</div>;
      case MLContentType.TEXT:
        return <p className="text">{content.text}</p>;
      case MLContentType.IMAGE:
        return <img src={content.img?.previewUrl} alt="img" />;
      default:
        break;
    }
  }, []);

  const currentPreviewLayout = (
    <>
      {multilinkAttrs.template?.map((template: number, i: number) => {
        const isFilled = !!multilinkAttrs.contentSet[i];
        return (
          <div
            key={id[i]}
            style={{ flex: `0 1 ${template}%`, backgroundColor: isFilled ? '' : '#0002' }}>
            {multilinkAttrs.contentSet[i]
              ? getPreviewBlockLayout(multilinkAttrs.contentSet[i]!)
              : null}
          </div>
        );
      })}
    </>
  );

  return (
    <div
      className="grid__row multilink-editor"
      style={stage === EditorStage.PREVIEW ? { justifyContent: 'center' } : undefined}>
      {stage !== EditorStage.PREVIEW && (
        <section className="ml-creation-area">
          <div className="paper _with-button-bottom">
            {stage === EditorStage.TEMPLATE && <MLTemplate setTemplate={setTemplate} />}
            {stage === EditorStage.BACKGROUND && <MLBackground setBackground={setBackground} />}
            {stage === EditorStage.CONTENT && multilinkAttrs.template && (
              <MLContent
                template={multilinkAttrs.template}
                contentSet={multilinkAttrs.contentSet}
                setContent={setContent}
              />
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
          {stage === EditorStage.PREVIEW && <MLPreview username={multilinkAttrs.name} />}
          <div className="preview-device">
            <div className="phone">
              <div className="phone__container" style={{ background: multilinkAttrs.background }}>
                <div className="phone__logo">
                  <Icon name="user" />
                </div>
                <h4 className="phone__user-title">
                  <strong>{userData.name}</strong>
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
