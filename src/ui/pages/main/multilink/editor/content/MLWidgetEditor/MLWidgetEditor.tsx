import React, { ChangeEvent, IframeHTMLAttributes, useState } from 'react';

import { setMLDraftBlockContent } from '../../../../../../../bll/reducers';
import { useAppDispatch } from '../../../../../../../common/hooks';
import { IMLDraftWidget } from '../../../../../../../common/types/instance';

import styles from './MLWidgetEditor.module.scss';

import { Button, Textarea } from 'ui/components/elements';

type MLWidgetEditorProps = {
  order: number;
  block: IMLDraftWidget;
};

type ValueIframeType = {
  src: string;
  width: string;
  height: string;
};

export const MLWidgetEditor = ({ order, block }: MLWidgetEditorProps) => {
  const dispatch = useAppDispatch();
  const [valueTextarea, setValueTextarea] = useState('');
  const [valueIframe, setValueIframe] = useState<ValueIframeType>({
    src: '',
    width: '0px',
    height: '0px',
  });

  const onChangeCallback = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValueTextarea(e.currentTarget.value);
  };

  const onClickHandler = () => {
    const doc = new DOMParser().parseFromString(valueTextarea, 'text/html');

    const { src } = doc.body.children[0] as IframeHTMLAttributes<HTMLIFrameElement>;

    setValueIframe({
      // @ts-ignore
      src: doc.body.children[0].src,
      // @ts-ignore
      width: doc.body.children[0].width,
      // @ts-ignore
      height: doc.body.children[0].height,
    });

    // @ts-ignore
    block.url = src;
    dispatch(setMLDraftBlockContent(block, order, 'widgetBlocks'));
  };

  return (
    <>
      <Textarea className={styles.input} value={valueTextarea} onChange={onChangeCallback} />
      <Button onClick={onClickHandler}>Add element</Button>
      <iframe
        className={styles.iframe}
        width={valueIframe.width}
        height={valueIframe.height}
        src={valueIframe.src}
        title="widget"
      />
    </>
  );
};
