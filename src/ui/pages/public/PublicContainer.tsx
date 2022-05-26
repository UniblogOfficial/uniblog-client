import React, { useCallback } from 'react';

import { Redirect } from 'react-router-dom';

import { MLContentType, PublicPath } from '../../../common/constants';
import { useAppSelector } from '../../../common/hooks';
import { TMLContent } from '../../../common/types/instance';
import { parseRawImage } from '../../../common/utils/ui';

type TPublicContainerProps = {};

export const PublicContainer = () => {
  const multilink = useAppSelector(state => state.multilink.multilink);
  const getBlockLayout = useCallback((content: TMLContent) => {
    switch (content.type) {
      case MLContentType.LINK:
        return (
          content.link && (
            <a
              href={content.link || undefined}
              target="_blank"
              className="link link-nulled"
              rel="noreferrer">
              {content.title}
            </a>
          )
        );
      case MLContentType.TEXT:
        return <p className="text">{content.text}</p>;
      case MLContentType.IMAGE:
        return <img src={parseRawImage(content)} alt="img" />;
      default:
        return null;
    }
  }, []);
  if (!multilink) {
    return <Redirect to={PublicPath.NOT_FOUND} />;
  }

  const contentLayout = (
    <>
      {multilink.template.map((template, i) => (
        <div
          key={id[i]}
          className="public__content-block"
          style={{
            flex: `0 1 ${template}%`,
          }}>
          {getBlockLayout(
            multilink.content.find(block => block.order === i) || multilink.content[i],
          )}
        </div>
      ))}
    </>
  );
  return (
    <main style={{ flexDirection: 'column', background: multilink.background }}>
      <div className="public">
        <div className="public__logo">
          <img src={parseRawImage(multilink.logo)} alt="logo" />
        </div>
        <div className="public__title">{multilink.name}</div>
        <div className="public__content">{contentLayout}</div>
      </div>
    </main>
  );
};

const id = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
