/* eslint-disable dot-notation */
import React, { CSSProperties, FC, useCallback, useMemo, MouseEvent } from 'react';

import { useTranslation } from 'react-i18next';

import { setMLDraftBackground } from '../../../../../../bll/reducers';
import { useAppDispatch } from '../../../../../../common/hooks';
import { Button } from '../../../../../components/elements';

import styles from './MLBackground.module.scss';

type TMLBackgroundProps = {};

export const MLBackground = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['pages', 'common']);
  const onSnippetClick = useCallback(
    (e: MouseEvent<HTMLInputElement>) => {
      dispatch(setMLDraftBackground(e.currentTarget.style.background));
    },
    [dispatch],
  );
  const snippets = useMemo(
    () =>
      bgs.map((props, i) => (
        <li key={id[i]} className={`${styles['bg']}`}>
          <input onClick={onSnippetClick} style={props} type="button" />
          <div />
        </li>
      )),
    [onSnippetClick],
  );

  return (
    <>
      <h3 className="paper-title">{t('pages:multilink.creation.stages.background')}</h3>
      <div className="multilink-editor__constructor">
        <ul className="grid bg-menu-grid">{snippets}</ul>
      </div>
      <Button variant="regular" className="button button-download _rounded">
        {t('common:buttons.download')}
      </Button>
    </>
  );
};

const bgs: CSSProperties[] = [
  {
    background: '#fff',
  },
  {
    background: 'linear-gradient(90deg, #E1EEC3 0%, #F05053 100%)',
  },
  {
    background: 'linear-gradient(180deg, #76B852 0%, #8DC26F 100%)',
  },
  {
    background: 'linear-gradient(135deg, #1C92D2 0%, #F2FCFE 100%)',
  },
  {
    background: 'linear-gradient(180deg, #4E54C8 0%, #8F94FB 100%)',
  },
  {
    background: 'linear-gradient(180deg, #FBD3E9 0%, #BB377D 100%)',
  },
  {
    background: 'linear-gradient(180deg, #e8f71f 0%, #8F94FB 100%)',
  },
  {
    background: 'linear-gradient(180deg, #f71f1f 0%, #8F94FB 100%)',
  },
  {
    background: 'linear-gradient(180deg, #f71fec 0%, #8F94FB 100%)',
  },
];

const id = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
