/* eslint-disable dot-notation */
import React from 'react';

import { Button } from '../../../../components/elements';

import styles from './MLBackground.module.scss';

type TMLBackgroundProps = {};

export const MLBackground = () => (
  <>
    <h3 className="paper-title">Choose a background</h3>
    <div className="multilink-editor__constructor">
      <div className="grid">
        <ul className="grid__row row-3">
          <li className={`${styles['bg']} ${styles['bg-1']}`}>
            <div />
          </li>
          <li className={`${styles['bg']} ${styles['bg-2']}`}>
            <div />
          </li>
          <li className={`${styles['bg']} ${styles['bg-3']}`}>
            <div />
          </li>
        </ul>
        <ul className="grid__row row-3">
          <li className={`${styles['bg']} ${styles['bg-4']}`}>
            <div />
          </li>
          <li className={`${styles['bg']} ${styles['bg-5']}`}>
            <div />
          </li>
          <li className={`${styles['bg']} ${styles['bg-6']}`}>
            <div />
          </li>
        </ul>
        <ul className="grid__row row-3">
          <li className={`${styles['bg']} ${styles['bg-7']}`}>
            <div />
          </li>
          <li className={`${styles['bg']} ${styles['bg-8']}`}>
            <div />
          </li>
          <li className={`${styles['bg']} ${styles['bg-9']}`}>
            <div />
          </li>
        </ul>
      </div>
    </div>
    <Button variant="regular" className="button button-download _rounded">
      Download
    </Button>
  </>
);
