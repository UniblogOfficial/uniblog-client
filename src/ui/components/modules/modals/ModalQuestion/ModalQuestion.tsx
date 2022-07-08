import React, { memo, ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import style from './ModalQuestion.module.scss';

import { Nullable } from 'common/types/instance';
import { Button } from 'ui/components/elements';
import { Modal } from 'ui/components/modules/modals/Modal';

type ModalQuestionProps = {
  isOpen: boolean;
  setTrue: () => void;
  setFalse: () => void;
  description: string;
};

export const ModalQuestion = memo(
  ({ setTrue, setFalse, description, isOpen }: ModalQuestionProps): Nullable<ReactElement> => {
    const { t } = useTranslation(['common']);

    if (!isOpen) {
      return null;
    }

    return (
      <Modal close={setFalse}>
        <div className={style.wrapper}>
          {description}
          <div className={style.buttons}>
            <Button variant="cancel" onClick={setFalse} className="button _rounded">
              {t('common:buttons.no')}
            </Button>

            <Button data-value="ok" onClick={setTrue} className="button _rounded">
              {t('common:buttons.yes')}
            </Button>
          </div>
        </div>
      </Modal>
    );
  },
);
