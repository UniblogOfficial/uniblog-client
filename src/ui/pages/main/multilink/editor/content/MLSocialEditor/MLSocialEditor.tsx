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
  const socialElements = block.links.map(s => <SocialItem key={s} socialNetwork={s.toString()} />);

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
      />
      <table>
        <tr>
          <td>{linkTypeElements}</td>
          <td>{socialElements}</td>
        </tr>
      </table>
    </>
  );
};
