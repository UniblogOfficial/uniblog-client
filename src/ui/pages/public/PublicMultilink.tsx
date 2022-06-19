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
  MLVote,
  MLButton,
} from 'ui/components/modules/mlBlocks';
import { MLShop } from 'ui/components/modules/mlBlocks/mlShop/MLShop';
import { MLWidget } from 'ui/components/modules/mlBlocks/mlWidget/MLWidget';

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
        <div className={templateClassName}>
          <div className="inner">
            <div className="inner-bg" style={{ background: multilink.background }} />
          </div>
          {contentMap.map((type, i) => {
            let block;
            let image;
            switch (type) {
              case MLContentType.TEXT:
                block = multilink[type].find(el => el.order === i);
                if (!block) return null;
                return <MLText key={ID[i]} block={block} />;
              case MLContentType.SOCIAL:
                block = multilink[type].find(el => el.order === i);
                if (!block) return null;
                return <MLSocial key={ID[i]} block={block} isPublic />;
              case MLContentType.VIDEO:
                block = multilink[type].find(el => el.order === i);
                if (!block) return null;
                return <MLVideo key={ID[i]} block={block} />;
              case MLContentType.WIDGET:
                block = multilink[type].find(el => el.order === i);
                if (!block) return null;
                return <MLWidget key={ID[i]} block={block} />;
              case MLContentType.VOTE:
                block = multilink[type].find(el => el.order === i);
                if (!block) return null;
                return <MLVote key={ID[i]} block={block} isPublic />;

              case MLContentType.BUTTON:
                block = multilink[type].find(el => el.order === i);
                if (!block) return null;
                return <MLButton key={ID[i]} block={block} />;
              case MLContentType.LOGO:
                block = multilink[type].find(el => el.order === i);
                // variable image is one or set of images of current block
                image = null;
                if (!block) return null;
                return <MLLogo key={ID[i]} block={block} images={image} />;
              case MLContentType.LINK:
                block = multilink[type].find(el => el.order === i);
                if (!block) return null;
                return <MLLink key={ID[i]} block={block} isPublic />;
              case MLContentType.IMAGE:
                block = multilink[type].find(el => el.order === i);
                image = null;
                if (!block) return null;
                return <MLImages key={ID[i]} block={block} images={image} />;
              case MLContentType.IMAGETEXT:
                block = multilink[type].find(el => el.order === i);
                image = null;
                if (!block) return null;
                return <MLImageText key={ID[i]} block={block} images={image} />;
              case MLContentType.SHOP:
                block = multilink[type].find(el => el.order === i);
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
    [multilink, contentMap, className],
  );
  return <>{getLayout(true)}</>;
};
