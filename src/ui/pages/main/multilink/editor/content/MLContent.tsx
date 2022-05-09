import React, {
  FC,
  useCallback,
  MouseEvent,
  useState,
  ReactElement,
  ChangeEvent,
  useRef,
} from 'react';

import { DropEvent } from 'react-dropzone';

import { MLContentType, SocialNetwork } from '../../../../../../common/constants';
import { Nullable, TMLContent } from '../../../../../../common/types/instance';
import { TMLDraftContent } from '../../../../../../common/types/instance/multilink';
import temp1 from '../../../../../../img/temp1.png';
import { Icon } from '../../../../../components/elements';

import { DropZoneField } from './imageForm/DropZoneField';

export type TImageFile = {
  file: File;
  name: string;
  preview: string;
  size: number;
};

type TMLContentProps = {
  template: number[];
  contentSet: Nullable<TMLDraftContent>[];
  setContent: (data: TMLDraftContent) => void;
};

type TContentBlock = {
  order: number;
  type: MLContentType;
  content: Nullable<ReactElement>;
};

export const MLContent: FC<TMLContentProps> = ({ template, contentSet, setContent }) => {
  // const order = useRef<number>(0);
  const [textareaValues, setTextareaValues] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<Array<TImageFile>>([]);
  const [contentBlocks, setContentBlocks] = useState<TContentBlock[]>(
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
          return { order: i, type: MLContentType.IMAGE, content: null };
        default:
          return { order: i, type: MLContentType.UNKNOWN, content: null };
      }
    }),
  );
  const onImageZoneChange = useCallback(
    (e, imageFile: TImageFile) => {
      console.log(e);
      const order = +e.currentTarget.dataset.value! as number;
      setImageFiles([imageFile]);
      setContent({
        order,
        type: MLContentType.IMAGE,
        link: null,
        linkType: null,
        title: null,
        text: null,
        img: imageFile,
      });
    },
    [setContent],
  );

  const onImageZoneDrop = (
    e: DropEvent,
    newImageFile: Array<File>,
    onChange: (e: DropEvent, imageFile: TImageFile) => void,
  ) => {
    const imageFile = {
      file: newImageFile[0],
      name: newImageFile[0].name,
      preview: URL.createObjectURL(newImageFile[0]),
      size: newImageFile[0].size,
    };
    setImageFiles([imageFile]);
    onChange(e, imageFile);
  };

  const onTextareaChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const text = e.target.value;
      // eslint-disable-next-line no-return-assign
      const order = +e.currentTarget.dataset.value! as number;
      setTextareaValues(Object.assign([], textareaValues, { orderIndex: text }));
      setContent({
        order,
        type: MLContentType.TEXT,
        link: null,
        linkType: null,
        title: null,
        text,
        img: undefined,
      });
    },
    [setContent, textareaValues],
  );

  /*   const onFilledBlockClick = (e: MouseEvent<HTMLElement>) => {
    order.current = +e.currentTarget.dataset.value! as number;
  }; */

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
          copy[order].content = (
            <textarea
              data-value={contentBlocks[order].order}
              value={textareaValues[order]}
              onChange={onTextareaChange}
              maxLength={70}
              className="template__block__textarea"
            />
          );
          setContent({
            order,
            type: MLContentType.TEXT,
            link: null,
            linkType: null,
            title: null,
            text: '',
            img: undefined,
          });
          break;
        case 'image':
          copy[order].content = (
            <DropZoneField
              data-value={contentBlocks[order].order}
              onChange={onImageZoneChange}
              handleOnDrop={onImageZoneDrop}
              imageFiles={imageFiles}
              touched={false}
            />
          );
          /* setContent({
            order: order.current,
            type: MLContentType.IMAGE,
            link: null,
            linkType: null,
            title: null,
            text: null,
            img: temp1,
          }); */
          break;
        default:
          copy[order].content = <>unknown</>;
      }
      setContentBlocks(copy);
    },
    [contentBlocks, setContent, onTextareaChange, textareaValues, imageFiles, onImageZoneChange],
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
