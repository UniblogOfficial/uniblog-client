import React, { useMemo } from 'react';

import styles from './MLLogo.module.scss';

import { IMLDraftLogo, Nullable, TImageFile, TMLImageContentLogo } from 'common/types/instance';
import { parseRawImage, px } from 'common/utils/ui';

type TMLLogoProps = {
  block: IMLDraftLogo;
  images: Nullable<TMLImageContentLogo<TImageFile>>;
  callback?: <T>(payload: T) => void;
};

export const MLLogo = ({ block, callback, images }: TMLLogoProps) => {
  const logo = useMemo(() => {
    const imgSrc = images?.logo ? images?.logo.previewUrl : block.logo;
    if (!imgSrc) return null;
    return (
      <div
        className={styles['logo']}
        style={{ height: block.size ?? '100px', width: block.size ?? '100px' }}>
        <img src={imgSrc} alt="logo" />
      </div>
    );
  }, [block, images?.logo]);
  const banner = useMemo(() => {
    const imgSrc = images?.banner ? images.banner.previewUrl : block.banner;
    if (!imgSrc) return null;
    return (
      <div className={styles['banner']}>
        <img src={imgSrc} alt="banner" />
      </div>
    );
  }, [block, images?.banner]);
  if (!block) return null;
  const className = callback ? `${styles['block']} interactive` : styles['block'];
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
