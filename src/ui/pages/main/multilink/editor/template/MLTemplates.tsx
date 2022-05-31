import React, { CSSProperties, FC, memo, useCallback, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { setMLDraftTemplate } from '../../../../../../bll/reducers';
import { ID, MLContentType } from '../../../../../../common/constants';
import { useAppDispatch } from '../../../../../../common/hooks';
import { TUser } from '../../../../../../common/types/instance';
import { parseRawImage, px } from '../../../../../../common/utils/ui';
import socials from '../../../../../../img';
import { Carousel, Icon } from '../../../../../components/elements';

import { getTemplates } from './templates';

type TMLTemplatesProps = {
  userData: TUser;
};

export const MLTemplates = memo(({ userData }: TMLTemplatesProps) => {
  const { name, avatar } = userData;
  const [templates, setTemplates] = useState(getTemplates(name, avatar));

  const getTemplateLayouts = useMemo(
    () =>
      templates.map((template, i) => (
        <ul key={ID[i]} className="thumbnail">
          {template.map((block, j) => {
            switch (block.type) {
              case MLContentType.LOGO:
                return (
                  <li key={ID[j]}>
                    <div
                      className="ml-logo__logo"
                      style={{
                        height: px(block.size, 5),
                        width: px(block.size, 5),
                        background: `#f${Math.random().toString(16).substr(-4)}f`,
                      }}
                    />
                  </li>
                );
              case MLContentType.TEXT:
                return (
                  <li
                    key={ID[j]}
                    style={{
                      padding: px(block.padding, 5),
                      background: block.background ?? undefined,
                      justifyContent: block.align ?? undefined,
                      overflow: 'hidden',
                      borderRadius: '5px',
                    }}>
                    {block.text?.length! > 100 ? (
                      <div style={{ height: px(216, 5) }}>
                        <p
                          style={{
                            position: 'relative',
                            background: `#f${Math.random().toString(16).substr(-4)}f50`,
                            color: '#0000',
                            fontSize: px(block.fontSize, 5.000001),
                            fontWeight: block.fontWeight ?? undefined,
                          }}>
                          {block.text}
                        </p>
                      </div>
                    ) : (
                      <p
                        style={{
                          position: 'relative',
                          background: `#f${Math.random().toString(16).substr(-4)}f50`,
                          borderRadius: '5px',
                          color: '#0000',
                          fontSize: px(block.fontSize, 5.000001),
                          fontWeight: block.fontWeight ?? undefined,
                        }}>
                        {block.text?.length! > 10 ? block.text : 'abcdefgijklmn'}
                      </p>
                    )}
                  </li>
                );
              case MLContentType.LINK:
                return (
                  <li
                    key={ID[j]}
                    className="ml-link"
                    style={{
                      padding: px(block.padding, 5),
                      margin: px(block.margin, 5),
                      background: block.background ?? undefined,
                    }}>
                    <div style={{ fontSize: px(block.fontSize, 5) }}>
                      <span
                        style={{
                          background: `#f${Math.random().toString(16).substr(-4)}f50`,
                          borderRadius: '5px',
                          color: '#0000',
                          fontSize: px(block.fontSize, 5.000001),
                        }}>
                        {block.title}
                      </span>
                    </div>
                  </li>
                );
              case MLContentType.SOCIAL:
                return (
                  <li key={ID[j]} style={{ padding: px(block.padding, 5) }}>
                    <ul className="ml-social">
                      {block.linkTypes.map(icon => {
                        const data = socials.find(social => social.type === icon);
                        return (
                          <li
                            key={icon}
                            style={{
                              background: `#f${Math.random().toString(16).substr(-4)}f`,
                              borderRadius: '50%',
                              width: '8px',
                              height: '8px',
                            }}
                          />
                        );
                      })}
                    </ul>
                  </li>
                );
              case MLContentType.IMAGETEXT:
                const imgMargin = () => {
                  switch (block.imgPosition) {
                    case 'left':
                      return px([0, 12, 12, 0], 5);
                    case 'right':
                      return px([0, 0, 12, 12], 5);
                    default:
                      return '0';
                  }
                };
                const textBgc = `#f${Math.random().toString(16).substr(-4)}f50`;
                return (
                  <li key={ID[j]} style={{ padding: px(block.padding, 5) ?? '0' }}>
                    <div
                      className="ml-imagetext"
                      style={{ height: px(134, 5), overflow: 'hidden', width: '100%' }}>
                      <div
                        className="ml-imagetext__image"
                        style={{
                          float: block.imgPosition as CSSProperties['float'],
                          background: `#f${Math.random().toString(16).substr(-4)}f`,
                          margin: imgMargin(),
                          border: 'none',
                          borderRadius: '2px',
                        }}
                      />
                      <p
                        className="ml-imagetext__text"
                        style={{
                          display: 'flex',
                          justifyContent: 'space-around',
                          flexWrap: 'wrap',
                          borderRadius: '5px',
                          whiteSpace: 'nowrap',
                          color: '#0000',
                          fontSize: px(block.fontSize, 5.000001),
                          fontWeight: block.fontWeight ?? undefined,
                        }}>
                        {block.text?.split(' ').map(el => (
                          <span
                            key={el}
                            style={{
                              background: textBgc,
                            }}>
                            {el}
                          </span>
                        ))}
                      </p>
                    </div>
                  </li>
                );
              default:
                return <li key={ID[j]} />;
            }
          })}
        </ul>
      )),
    [templates],
  );

  return <div className="grid__row">{getTemplateLayouts}</div>;
});
