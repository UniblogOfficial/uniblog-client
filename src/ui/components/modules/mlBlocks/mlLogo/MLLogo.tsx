import React, { useMemo } from 'react';

import {
  IMLDraftContentLogo,
  Nullable,
  TImageFile,
  TIncomingImage,
  TMLImageContentLogo,
} from '../../../../../common/types/instance';
import { parseRawImage, px } from '../../../../../common/utils/ui';

type TMLLogoProps = {
  block: Nullable<IMLDraftContentLogo>;
  images: Nullable<TMLImageContentLogo<TImageFile>>;
  callback?: <T>(payload: T) => void;
};

export const MLLogo = ({ block, callback, images }: TMLLogoProps) => {
  const logo = useMemo(() => {
    if (!block || !block.logo) return null;
    const imgSrc = images?.logo ? images?.logo.previewUrl : block.logo;
    return (
      <div
        className="ml-logo__logo"
        style={{ height: block.size ?? '100px', width: block.size ?? '100px' }}>
        <img src={imgSrc} alt="logo" />
      </div>
    );
  }, [block, images?.logo]);
  const banner = useMemo(() => {
    if (!block || !block.banner) return null;
    const imgSrc = images?.banner ? images.banner.previewUrl : block.banner;
    return (
      <div className="ml-logo__banner" style={{ height: block.size ?? '100px' }}>
        <img src={imgSrc} alt="banner" />
      </div>
    );
  }, [block, images?.banner]);
  if (!block) return null;
  const className = callback ? 'ml-logo interactive' : 'ml-logo';
  return (
    <section
      className={className}
      style={{
        padding: px(block.padding) ?? '0',
        margin: px(block.margin),
      }}>
      {callback && (
        <input type="button" data-type={block.type} data-order={block.order} onClick={callback} />
      )}
      {banner}
      {logo}
    </section>
  );
};
