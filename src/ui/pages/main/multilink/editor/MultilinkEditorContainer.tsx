import React, { useMemo, useState, MouseEvent } from 'react';

import { useTranslation } from 'react-i18next';

import phone from '../../../../../img/phone.png';
import { Carousel } from '../../../../components/elements';
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

  const onNextButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    stage < 4 && setStage(prev => prev + 1);
  };

  return (
    <div className="grid__row multilink-editor">
      <section className="ml-creation-area">
        <div className="paper _with-button-bottom">
          {stage === EditorStage.TEMPLATE && <MLTemplate />}
          {stage === EditorStage.BACKGROUND && <MLBackground />}
          {stage === EditorStage.SOCIALS && <MLSocials />}
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
          <div>
            <img src={phone} alt="pnone-layout" />
          </div>
        </div>
      </section>
    </div>
  );
};
