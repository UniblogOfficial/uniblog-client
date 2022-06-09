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
  const { background, contentMap, images } = multilink;
  const getLayout = useCallback(
    (limited: boolean) => {
      const templateClassName = limited ? `${className}` : `${className} ${className}_unlimited`;
      return (
        <div className={templateClassName} style={{ background }}>
          {contentMap.map((type, i) => {
            let block;
            let image;
            switch (type) {
              case MLContentType.LOGO:
                block = multilink.logoBlocks.find(el => el.order === i);
                // variable image is one or set of images of current block
                image = null;
                if (!block) return null;
                return <MLLogo key={ID[i]} block={block} images={image} />;
              case MLContentType.TEXT:
                block = multilink.textBlocks.find(el => el.order === i);
                if (!block) return null;
                return <MLText key={ID[i]} block={block} />;
              case MLContentType.LINK:
                block = multilink.linkBlocks.find(el => el.order === i);
                if (!block) return null;
                return <MLLink key={ID[i]} block={block} />;
              case MLContentType.SOCIAL:
                block = multilink.socialBlocks.find(el => el.order === i);
                if (!block) return null;
                return <MLSocial key={ID[i]} block={block} isPublic />;
              case MLContentType.IMAGE:
                block = multilink.imageBlocks.find(el => el.order === i);
                image = null;
                if (!block) return null;
                return <MLImages key={ID[i]} block={block} images={image} />;
              case MLContentType.IMAGETEXT:
                block = multilink.imageTextBlocks.find(el => el.order === i);
                image = null;
                if (!block) return null;
                return <MLImageText key={ID[i]} block={block} images={image} />;
              case MLContentType.VIDEO:
                block = multilink.videoBlocks.find(el => el.order === i);
                if (!block) return null;
                return <MLVideo key={ID[i]} block={block} />;
              case MLContentType.SHOP:
                block = multilink.shopBlocks.find(el => el.order === i);
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
    [background, multilink, contentMap, className],
  );
  return <>{getLayout(true)}</>;
};
