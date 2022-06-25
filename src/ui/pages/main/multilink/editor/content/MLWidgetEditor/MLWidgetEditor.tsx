import React, { ChangeEvent, IframeHTMLAttributes, useState } from 'react';

import { setMLDraftBlockContent } from '../../../../../../../bll/reducers';
import { useAppDispatch } from '../../../../../../../common/hooks';
import { IMLDraftWidget } from '../../../../../../../common/types/instance';

import styles from './MLWidgetEditor.module.scss';

import { Button, Textarea } from 'ui/components/elements';

type TMLWidgetEditorProps = {
  order: number;
  block: IMLDraftWidget;
};

type TIFrameAttributes = {
  src: string;
  width: string;
  height: string;
};

export const MLWidgetEditor = ({ order, block }: TMLWidgetEditorProps) => {
  const dispatch = useAppDispatch();
  const [rawValue, setRawValue] = useState('');
  const [iFrameAttrs, setIFrameAttrs] = useState<TIFrameAttributes>({
    src: '',
    width: '0px',
    height: '0px',
  });

  const onTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setRawValue(e.currentTarget.value);
  };

  const onAddSourceButtonClick = () => {
    const doc = new DOMParser().parseFromString(rawValue, 'text/html');

    const iframe = doc.body.children[0] as IframeHTMLAttributes<HTMLIFrameElement> | undefined;

    if (iframe?.src && iframe.width && iframe.height) {
      setIFrameAttrs({
        src: iframe.src,
        width: `${iframe.width}`,
        height: `${iframe.height}`,
      });

      block.url = iframe.src;
      dispatch(setMLDraftBlockContent({ content: block, order }));
    }
  };

  return (
    <>
      <Textarea className={styles.input} value={rawValue} onChange={onTextareaChange} />
      <Button onClick={onAddSourceButtonClick}>Add element</Button>
      <iframe
        className={styles.iframe}
        width={iFrameAttrs.width}
        height={iFrameAttrs.height}
        src={iFrameAttrs.src}
        title="widget"
      />
    </>
  );
};
