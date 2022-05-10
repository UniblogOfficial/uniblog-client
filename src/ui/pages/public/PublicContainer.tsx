import React, { useCallback } from 'react';

import { Redirect } from 'react-router-dom';

import { MLContentType, PublicPath } from '../../../common/constants';
import { useAppSelector } from '../../../common/hooks';
import { TMLContent } from '../../../common/types/instance';

type TPublicContainerProps = {};

export const PublicContainer = () => {
  const multilink = useAppSelector(state => state.multilink.multilink);
  const getPreviewBlockLayout = useCallback((content: TMLContent) => {
    switch (content.type) {
      case MLContentType.LINK:
        return <div className="link">{content.title}</div>;
      case MLContentType.TEXT:
        return <p className="text">{content.text}</p>;
      case MLContentType.IMAGE:
        const buffer = Buffer.from(content.imageData!);
        return (
          <img src={`data:${content.imageType};base64, ${buffer.toString('base64')}`} alt="img" />
        );
      default:
        break;
    }
  }, []);
  if (!multilink) {
    return <Redirect to={PublicPath.NOT_FOUND} />;
  }

  const currentPreviewLayout = (
    <>
      {multilink.template?.map((template, i) => {
        const isFilled = !!multilink.content[i];
        return (
          <div
            key={id[i]}
            style={{
              display: 'flex',
              flex: `0 1 ${template}%`,
              paddingBottom: '20px',
              backgroundColor: isFilled ? '' : '#0002',
            }}>
            {multilink.content[i] ? getPreviewBlockLayout(multilink.content[i]) : null}
          </div>
        );
      })}
    </>
  );
  return (
    <div
      className="public"
      style={{ display: 'flex', flexDirection: 'column', background: multilink.background }}>
      <div className="paper-title">{multilink.name}</div>
      {/* <div style={{ display: 'flex', flexDirection: 'column' }}>{currentPreviewLayout}</div> */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1 1',
          paddingTop: '15px',
          maxWidth: '500px',
        }}>
        {currentPreviewLayout}
      </div>
    </div>
  );
};

const id = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
