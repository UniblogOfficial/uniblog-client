import React, { useMemo, useState, MouseEvent, useCallback, CSSProperties } from 'react';

import { useTranslation } from 'react-i18next';

import { Nullable } from '../../../../../common/types/instance';
import phone from '../../../../../img/phone.png';
import { Carousel, Icon } from '../../../../components/elements';
import { Button } from '../../../../components/elements/button/Button';

import { MLBackground } from './MLBackground';
import { MLContent } from './MLContent';
import { MLSocials } from './MLSocials';
import { MLTemplate } from './MLTemplate';

type TMultilinkEditorContainerProps = {};

enum EditorStage {
  TEMPLATE = 1,
  BACKGROUND = 2,
  SOCIALS = 3,
  CONTENT = 4,
}

export const MultilinkEditorContainer = () => {
  const { t } = useTranslation(['pages', 'common']);
  const [stage, setStage] = useState<EditorStage>(1);
  const [multilinkAttrs, setMultilinkAttrs] = useState({
    template: null as Nullable<number[]>,
    background: undefined as undefined | string,
    links: [] as string[],
  });

  const setTemplate = useCallback(
    (template: number[]) => {
      if (multilinkAttrs.template !== template) {
        setMultilinkAttrs({ ...multilinkAttrs, template });
      }
    },
    [multilinkAttrs],
  );

  const setBackground = useCallback(
    (background: string) => {
      if (multilinkAttrs.background !== background) {
        console.log(background);

        setMultilinkAttrs({ ...multilinkAttrs, background });
      }
    },
    [multilinkAttrs],
  );

  const setLink = useCallback(
    (link: string) => {
      if (!multilinkAttrs.links.some(l => l === link)) {
        const currentLinks = multilinkAttrs.links;
        currentLinks.push(link);
        setMultilinkAttrs({ ...multilinkAttrs, links: currentLinks });
      }
    },
    [multilinkAttrs],
  );

  const onNextButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    stage < 4 && setStage(prev => prev + 1);
  };

  const currentPreviewLayout = (
    <>
      {multilinkAttrs.template?.map((template, i) => (
        <div key={id[i]} style={{ flex: `0 1 ${template}%` }} />
      ))}
    </>
  );

  return (
    <div className="grid__row multilink-editor">
      <section className="ml-creation-area">
        <div className="paper _with-button-bottom">
          {stage === EditorStage.TEMPLATE && <MLTemplate setTemplate={setTemplate} />}
          {stage === EditorStage.BACKGROUND && <MLBackground setBackground={setBackground} />}
          {stage === EditorStage.SOCIALS && <MLSocials setLink={setLink} />}
          {stage === EditorStage.CONTENT && <MLContent />}
          <div className="paper__button-container">
            <Button value="background" onClick={onNextButtonClick} className="button _full _paper">
              {t('common:buttons.next')}
            </Button>
          </div>
        </div>
      </section>
      <section className="preview-area">
        <div className="paper">
          <h3 className="paper-title">Preview</h3>
          <div>
            <span>
              Link:{' '}
              <a
                href="https://uniblog-online.netlify.app/VasyaRaper"
                target="_blank"
                rel="noreferrer">
                https://uniblog-online.com/VasyaRaper
              </a>
            </span>
            <Button>Share</Button>
          </div>
          <div className="preview-device">
            <div className="phone">
              <div className="phone__container" style={{ background: multilinkAttrs.background }}>
                <div className="phone__logo">
                  <Icon name="user" />
                </div>
                <h4 className="phone__user-title">
                  <strong>@VasyaRaper</strong>
                </h4>
                <div className="phone__template">{currentPreviewLayout}</div>
              </div>
              <div className="phone__layout">
                <img src={phone} alt="phone-layout" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const id = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
