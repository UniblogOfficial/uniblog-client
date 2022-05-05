import React, { FC, useCallback, MouseEvent, useState, ReactElement } from 'react';

import { MLContentType, SocialNetwork } from '../../../../../common/constants';
import { Nullable, TMLContent } from '../../../../../common/types/instance';
import temp1 from '../../../../../img/temp1.png';
import { Icon } from '../../../../components/elements';

type TMLContentProps = {
  template: number[];
  setContent: (data: TMLContent) => void;
};

type TContentBlock = {
  order: number;
  type: MLContentType;
  content: Nullable<ReactElement>;
};

export const MLContent: FC<TMLContentProps> = ({ template, setContent }) => {
  const [contentBlocks, setContentBlocks] = useState<TContentBlock[]>(
    // [50, 25, 12.5, 12.5]
    template.map((block, i) => {
      const isLink = block <= 15;
      const isText = block > 15 && block < 50;
      const isPhoto = block >= 50;
      switch (true) {
        case isLink:
          return { order: i, type: MLContentType.LINK, content: null };
        case isText:
          return { order: i, type: MLContentType.TEXT, content: null };
        case isPhoto:
          return { order: i, type: MLContentType.PHOTO, content: null };
        default:
          return { order: i, type: MLContentType.UNKNOWN, content: null };
      }
    }),
  );

  const onBlockClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const order = +e.currentTarget.dataset.value! as number;
      const copy = [...contentBlocks];
      switch (e.currentTarget.value) {
        case 'link':
          copy[order].content = <>Вконтактике</>;
          setContent({
            order,
            type: MLContentType.LINK,
            link: 'https://vk.com',
            linkType: SocialNetwork.VK,
            title: 'VK',
            text: 'Вконтактике',
            img: undefined,
          });
          break;
        case 'text':
          const text = 'Падпишыс бро плиз плиз умоляю ну пажалуста';
          copy[order].content = <>{text}</>;
          setContent({
            order,
            type: MLContentType.TEXT,
            link: null,
            linkType: null,
            title: null,
            text,
            img: undefined,
          });
          break;
        case 'photo':
          copy[order].content = <img src={temp1} alt="temp1" />;
          setContent({
            order,
            type: MLContentType.PHOTO,
            link: null,
            linkType: null,
            title: null,
            text: null,
            img: temp1,
          });
          break;
        default:
          copy[order].content = <>unknown</>;
      }
      setContentBlocks(copy);
    },
    [contentBlocks, setContent],
  );
  const templateLayout = (
    <ul className="template">
      {template.map((block, i) => (
        <li
          key={id[i]}
          style={{ flex: `0 1 ${block}%` }}
          className={`template__block ${contentBlocks[i].content ? '_filled' : '_interactive'}`}>
          {contentBlocks[i].content ? (
            contentBlocks[i].content
          ) : (
            <button
              value={contentBlocks[i].type}
              data-value={contentBlocks[i].order}
              onClick={onBlockClick}
              type="button">
              <Icon name="circle-add" />
            </button>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <h3 className="paper-title">Add mediacontent</h3>
      <div className="multilink-editor__constructor">{templateLayout}</div>
    </>
  );
};

const id = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
