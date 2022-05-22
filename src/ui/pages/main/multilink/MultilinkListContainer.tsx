import React, { useEffect } from 'react';

import { getAllMultilinks } from '../../../../bll/reducers';
import { ID, MLContentType } from '../../../../common/constants';
import { useAppDispatch, useAppSelector } from '../../../../common/hooks';
import { Nullable, TMLContent, TMultilink } from '../../../../common/types/instance';
import { parseRawImage } from '../../../../common/utils/ui';
import { Icon } from '../../../components/elements';

type TMultilinkListContainerProps = {};

export const MultilinkListContainer = () => {
  const dispatch = useAppDispatch();
  const multilinks = useAppSelector<Nullable<TMultilink[]>>(state => state.multilink.allMultilinks);
  useEffect(() => {
    dispatch(getAllMultilinks());
  }, [dispatch]);
  const mappedMLs =
    multilinks &&
    multilinks.map(({ name, logo, template, background, content }) => {
      const getBlockLayout = (cont: TMLContent) => {
        switch (cont.type) {
          case MLContentType.LINK:
            return (
              cont.link && (
                <a
                  href={cont.link || undefined}
                  target="_blank"
                  className="link link-nulled"
                  rel="noreferrer">
                  {cont.title}
                </a>
              )
            );
          case MLContentType.TEXT:
            return <p className="text">{cont.text}</p>;
          case MLContentType.IMAGE:
            return <img src={parseRawImage(cont)} alt="img" />;
          default:
            return null;
        }
      };

      const contentLayout = (
        <>
          {template.map((temp, i) => (
            <div
              key={ID[i]}
              className="public__content-block"
              style={{
                flex: `0 1 ${temp}%`,
              }}>
              {getBlockLayout(content.find(block => block.order === i) || content[i])}
            </div>
          ))}
        </>
      );
      const logoSrc = logo ? parseRawImage(logo) : undefined;
      return (
        <section key={name} className="preview-area">
          <div className="paper">
            <div className="preview-device">
              <div className="phone">
                <div className="phone__container" style={{ background }}>
                  <div className="phone__logo">
                    {logoSrc ? <img src={logoSrc} alt="logo" /> : <Icon name="user" />}
                  </div>
                  <h4 className="phone__user-title">
                    <strong>{name}</strong>
                  </h4>
                  <div className="phone__template">{contentLayout}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    });
  return <div className="grid__row">{mappedMLs}</div>;
};
