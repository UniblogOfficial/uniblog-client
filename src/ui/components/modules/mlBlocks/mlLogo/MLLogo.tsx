import React, { useMemo } from 'react';

import { IMLDraftContentLogo, Nullable } from '../../../../../common/types/instance';
import { parseRawImage } from '../../../../../common/utils/ui';

type TMLLogoProps = {
  block: Nullable<IMLDraftContentLogo>;
  callback?: <T>(payload: T) => void;
};

export const MLLogo = ({ block, callback }: TMLLogoProps) => {
  const logo = useMemo(() => {
    if (!block || !block.image) return null;
    const imgSrc = block.image.previewUrl ? block.image.previewUrl : parseRawImage(block.image);
    return (
      <div
        className="ml-logo__logo"
        style={{ height: block.size ?? '100px', width: block.size ?? '100px' }}>
        <img src={imgSrc} alt="logo" />
      </div>
    );
  }, [block]);
  const banner = useMemo(() => {
    if (!block || !block.banner) return null;
    const imgSrc = block.banner.previewUrl ? block.banner.previewUrl : block.banner.src;
    return (
      <div className="ml-logo__banner" style={{ height: block.size ?? '100px' }}>
        <img src={imgSrc} alt="banner" />
      </div>
    );
  }, [block]);
  if (!block) return null;
  const className = callback ? 'ml-logo interactive' : 'ml-logo';
  return (
    <section className={className}>
      {callback && (
        <input type="button" data-type={block.type} data-order={block.order} onClick={callback} />
      )}
      {banner}
      {logo}
    </section>
  );
};
