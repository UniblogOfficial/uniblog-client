import React, { ChangeEvent, useState } from 'react';

import { setMLDraftBlockContent } from '../../../../../../../bll/reducers';
import { useAppDispatch } from '../../../../../../../common/hooks';
import { MLDraftSocial } from '../../../../../../../common/types/instance';

import styles from './MLSocialEditor.module.scss';
import { SocialItem } from './SocialItem/SocialItem';

type MLSocialEditorProps = {
  id: string;
  block: MLDraftSocial;
};

export const MLSocialEditor = ({ id, block }: MLSocialEditorProps) => {
  const dispatch = useAppDispatch();

  const linkTypeElements = block.linkTypes.map(m => (
    <p key={m} className={styles.linkTypesWeight}>
      {m.toString()}:
    </p>
  ));

  const setLink = (index: number, link: string) => {
    dispatch(
      setMLDraftBlockContent({
        content: { links: block.links.map((s, i) => (i === index ? link : s)) },
        id,
        type: block.type,
      }),
    );
  };

  const socialElements = block.links.map((s, index) => (
    <SocialItem key={s} socialNetwork={s} setLink={setLink} index={index} />
  ));

  const onChangeSize = (e: ChangeEvent<HTMLInputElement>) => {
    const currentSize = +e.currentTarget.value;
    dispatch(setMLDraftBlockContent({ content: { size: currentSize }, id, type: block.type }));
  };

  return (
    <>
      Изменить размер иконки:
      <input
        type="range"
        name="Изменить размер иконки"
        min={40}
        max={80}
        step={5}
        value={block.size}
        onChange={onChangeSize}
        className={styles.rangeSize}
      />
      <div className={styles.links}>
        <div className={styles.linkType}>{linkTypeElements}</div>
        <div className={styles.socialElements}>{socialElements}</div>
      </div>
    </>
  );
};
