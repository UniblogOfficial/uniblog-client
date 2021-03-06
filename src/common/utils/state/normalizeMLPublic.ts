import { parseRawImage } from '../ui';

import { MLContentType } from 'common/constants';
import {
  IMLDraftImage,
  IMLDraftImageText,
  IMLDraftLink,
  IMLDraftLogo,
  IMLDraftShop,
  IMLDraftSocial,
  IMLDraftText,
  IMLDraftVideo,
  MLDraftImage,
  MLDraftImageText,
  MLDraftLink,
  MLDraftLogo,
  MLDraftShop,
  Nullable,
  TMultilink,
} from 'common/types/instance';

export const normalizeMLPublic = (multilink: TMultilink): TMultilink => {
  const { contentMap, images } = multilink;

  const logoBlocks: Array<MLDraftLogo & { order: number }> = [];
  const linkBlocks: Array<MLDraftLink & { order: number }> = [];
  const imageBlocks: Array<MLDraftImage & { order: number }> = [];
  const imageTextBlocks: Array<MLDraftImageText & { order: number }> = [];
  const shopBlocks: Array<MLDraftShop & { order: number }> = [];

  /* let background = parseRawImage(images.find(image => image.order === 9999));
  if (background) {
    background = `url('${background}')`;
  }
  contentMap.forEach((type, i) => {
    let block;
    switch (type) {
      case MLContentType.LOGO:
        block = multilink.logoBlocks.find(b => b.order === i);
        if (block) {
          logoBlocks.push({
            ...block,
            logo:
              parseRawImage(images.find(image => image.order === i && image.suborder === 0)) ??
              null,
            banner: parseRawImage(images.find(image => image.order === i && image.suborder === 1)),
          });
        }
        break;
      case MLContentType.IMAGE:
        block = multilink.imageBlocks.find(b => b.order === i);
        if (block) {
          imageBlocks.push({
            ...block,
            image: parseRawImage(images.find(image => image.order === i)) ?? null,
          });
        }
        break;
      case MLContentType.LINK:
        block = multilink.linkBlocks.find(b => b.order === i);
        if (block) {
          linkBlocks.push({
            ...block,
            image: parseRawImage(images.find(image => image.order === i)) ?? null,
          });
        }
        break;
      case MLContentType.IMAGETEXT:
        block = multilink.imageTextBlocks.find(b => b.order === i);
        if (block) {
          imageTextBlocks.push({
            ...block,
            image: parseRawImage(images.find(image => image.order === i)) ?? null,
          });
        }
        break;
      case MLContentType.SHOP:
        const cellImages: any = [];
        images
          .filter(image => image.order === i)
          .forEach(img => {
            cellImages[img.suborder] = parseRawImage(img);
          });
        block = multilink.shopBlocks.find(b => b.order === i) as MLDraftShop & {
          order: number;
        };
        if (block) {
          shopBlocks.push({
            ...block,
            cells: block.cells.map((cell, j) => ({
              ...cell,
              image: cellImages[j],
            })),
          });
        }

        break;
      default:
        break;
    }
  }); */
  return {
    ...multilink,
    /* background: background ?? multilink.background,
    contentMap,
    logoBlocks,
    linkBlocks,
    imageBlocks,
    imageTextBlocks,
    shopBlocks, */
  };
};
