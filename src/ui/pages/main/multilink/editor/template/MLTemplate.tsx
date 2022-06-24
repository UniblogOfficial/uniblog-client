import React, { CSSProperties, FC, useCallback, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { getTemplates } from './templates';

import { setMLDraftTemplate } from 'bll/reducers';
import { ID, MLContentType } from 'common/constants';
import { useAppDispatch } from 'common/hooks';
import { TUser } from 'common/types/instance';
import { parseRawImage, px } from 'common/utils/ui';
import socials from 'img/socials';
import { Carousel, Icon } from 'ui/components/elements';

type TMLTemplateProps = {
  userData: TUser;
};

export const MLTemplate = ({ userData }: TMLTemplateProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['pages', 'common']);
  const { name, avatar } = userData;
  const [templates, setTemplates] = useState(getTemplates(name, avatar));

  const setCurrentTemplate = useCallback(
    (stage: number) => {
      if (templates.some((_t, i) => i === stage)) {
        dispatch(setMLDraftTemplate({ templates, index: stage }));
      }
    },
    [dispatch, templates],
  );

  const getTemplateLayouts = useCallback(
    () =>
      templates.map((template, i) => (
        <ul key={ID[i]} className="ml-template">
          {template.map((block, j) => {
            switch (block.type) {
              case MLContentType.LOGO:
                return (
                  <li key={block.order}>
                    <div
                      className="ml-logo__logo"
                      style={{ height: block.size ?? '100px', width: block.size ?? '100px' }}>
                      <img src={block.logo!} alt="logo" />
                    </div>
                  </li>
                );
              case MLContentType.TEXT:
                return (
                  <li
                    key={block.order}
                    style={{
                      padding: px(block.padding) ?? '0',
                      background: block.background ?? undefined,
                      justifyContent: block.align ?? undefined,
                    }}>
                    <p
                      style={{
                        textAlign: block.align ?? undefined,
                        fontSize: block.fontSize ?? undefined,
                        fontWeight: block.fontWeight ?? undefined,
                      }}>
                      {block.text}
                    </p>
                  </li>
                );
              case MLContentType.LINK:
                return (
                  <li
                    key={block.order}
                    className="ml-link"
                    style={{
                      padding: px(block.padding) ?? '0',
                      margin: px(block.margin) ?? '0',
                      background: block.background ?? undefined,
                    }}>
                    <div style={{ fontSize: block.fontSize ?? undefined }}>{block.title}</div>
                  </li>
                );
              case MLContentType.SOCIAL:
                return (
                  <li key={block.order} style={{ padding: px(block.padding) ?? '0' }}>
                    <ul className="ml-social">
                      {block.linkTypes.map((icon: string) => {
                        const data = socials.find(social => social.type === icon);
                        return (
                          <li key={icon}>
                            <img src={data!.src} alt={data?.title} />
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              case MLContentType.IMAGETEXT:
                const imgMargin = () => {
                  switch (block.imgPosition) {
                    case 'left':
                      return '0 12px 12px 0';
                    case 'right':
                      return '0 0 12px 12px';
                    default:
                      return '0';
                  }
                };
                return (
                  <li key={block.order} style={{ padding: px(block.padding) ?? '0' }}>
                    <div className="ml-imagetext">
                      <div
                        className="ml-imagetext__image"
                        style={{
                          float: block.imgPosition as CSSProperties['float'],
                          margin: imgMargin(),
                        }}>
                        <img src={block.image!} alt="" />
                      </div>
                      <p className="ml-imagetext__text">{block.text}</p>
                    </div>
                  </li>
                );
              default:
                return <li key={block.order} />;
            }
          })}
        </ul>
      )),
    [templates],
  );

  const carouselArrows = useMemo(
    () => [
      <div key="arrow1">
        <Icon
          name="chevron"
          side="left"
          size="max"
          rotate={180}
          containerClassName="carousel-arrow"
        />
      </div>,
      <div key="arrow2">
        <Icon name="chevron" side="right" size="max" containerClassName="carousel-arrow" />
      </div>,
    ],
    [],
  );
  return (
    <div className="multilink-editor__constructor">
      <Carousel
        items={getTemplateLayouts()}
        itemsPerView={1}
        arrows={carouselArrows}
        arrowStep={1}
        className="carousel"
        transitionTime={200}
        callback={setCurrentTemplate}
      />
    </div>
  );
};
