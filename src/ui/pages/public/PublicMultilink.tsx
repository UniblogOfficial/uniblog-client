import React, { useCallback } from 'react';

import { MLContentType, ID } from 'common/constants';
import { TMultilink } from 'common/types/instance';
import {
  MLLogo,
  MLText,
  MLLink,
  MLSocial,
  MLImages,
  MLImageText,
  MLVideo,
} from 'ui/components/modules/mlBlocks';
import { MLShop } from 'ui/components/modules/mlBlocks/mlShop/MLShop';

type TMultilinkProps = {
  multilink: TMultilink;
  className: 'ml-public' | 'ml-template' | 'ml-preview';
};

export const PublicMultilink = ({ multilink, className }: TMultilinkProps) => {
  const { background, contentSet, images } = multilink;
  const getLayout = useCallback(
    (limited: boolean) => {
      const templateClassName = limited ? `${className}` : `${className} ${className}_unlimited`;
      return (
        <div className={templateClassName} style={{ background }}>
          {contentSet.map((type, i) => {
            let block;
            let image;
            switch (type) {
              case MLContentType.LOGO:
                block = multilink.logoSet.find(el => el.order === i);
                // variable image is one or set of images of current block
                image = null;
                if (!block) return null;
                return <MLLogo key={ID[i]} block={block} images={image} />;
              case MLContentType.TEXT:
                block = multilink.textSet.find(el => el.order === i);
                if (!block) return null;
                return <MLText key={ID[i]} block={block} />;
              case MLContentType.LINK:
                block = multilink.linkSet.find(el => el.order === i);
                if (!block) return null;
                return <MLLink key={ID[i]} block={block} />;
              case MLContentType.SOCIAL:
                block = multilink.socialSet.find(el => el.order === i);
                if (!block) return null;
                return <MLSocial key={ID[i]} block={block} isPublic />;
              case MLContentType.IMAGE:
                block = multilink.imageSet.find(el => el.order === i);
                image = null;
                if (!block) return null;
                return <MLImages key={ID[i]} block={block} images={image} />;
              case MLContentType.IMAGETEXT:
                block = multilink.imageTextSet.find(el => el.order === i);
                image = null;
                if (!block) return null;
                return <MLImageText key={ID[i]} block={block} images={image} />;
              case MLContentType.VIDEO:
                block = multilink.videoSet.find(el => el.order === i);
                if (!block) return null;
                return <MLVideo key={ID[i]} block={block} />;
              case MLContentType.SHOP:
                block = multilink.shopSet.find(el => el.order === i);
                image = null;
                if (!block) return null;
                return <MLShop key={ID[i]} block={block} images={image} isPublic />;
              default:
                return <li key={ID[i]} />;
            }
          })}
        </div>
      );
    },
    [background, multilink, contentSet, className],
  );
  return <>{getLayout(true)}</>;
};
