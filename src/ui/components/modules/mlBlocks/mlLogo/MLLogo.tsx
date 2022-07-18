import React, { useMemo } from 'react';

import styles from './MLLogo.module.scss';

import { MLDraftLogo, Nullable, TImageFile, TMLImageContentLogo } from 'common/types/instance';
import { parseRawImage, px } from 'common/utils/ui';

type TMLLogoProps = {
  id: string;
  block: MLDraftLogo;
  images: Nullable<TMLImageContentLogo<TImageFile>>;
  callback?: <T>(payload: T) => void;
};

export const MLLogo = ({ id, block, callback, images }: TMLLogoProps) => {
  const logo = useMemo(() => {
    const imgSrc = images?.logo ? images?.logo.previewUrl : block.logo;
    if (!imgSrc) return null;
    return <img src={imgSrc} alt="logo" />;
  }, [block.logo, images?.logo]);
  const banner = useMemo(() => {
    const imgSrc = images?.banner ? images.banner.previewUrl : block.banner;
    if (!imgSrc) return null;
    return (
      <div className={styles['banner']}>
        <img src={imgSrc} alt="banner" />
      </div>
    );
  }, [block.banner, images?.banner]);
  const className = callback ? `${styles['block']} interactive` : styles['block'];

  return (
    <section
      className={className}
      style={{
        padding: px(block.padding),
        margin: px(block.margin),
        background: block.background,
      }}>
      {callback && <input type="button" data-type={block.type} data-id={id} onClick={callback} />}
      {banner}
      <div
        className={styles['logo']}
        style={{ height: block.size ?? '100px', width: block.size ?? '100px' }}>
        {logo}{' '}
      </div>
    </section>
  );
};
