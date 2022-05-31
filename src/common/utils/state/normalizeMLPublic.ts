import { MLContentType } from '../../constants';
import {
  IMLDraftContentImage,
  IMLDraftContentImageText,
  IMLDraftContentLink,
  IMLDraftContentLogo,
  IMLDraftContentShop,
  IMLDraftContentSocial,
  IMLDraftContentText,
  IMLDraftContentVideo,
  Nullable,
  TMultilink,
} from '../../types/instance';
import { parseRawImage } from '../ui';

export const normalizeMLPublic = (multilink: TMultilink): TMultilink => {
  const { contentSet, images } = multilink;

  const logoSet: IMLDraftContentLogo[] = [];
  const imageSet: IMLDraftContentImage[] = [];
  const imageTextSet: IMLDraftContentImageText[] = [];
  const shopSet: IMLDraftContentShop[] = [];

  let background = parseRawImage(images.find(image => image.order === 9999));
  if (background) {
    background = `url('${background}')`;
  }
  contentSet.forEach((type, i) => {
    let block;
    switch (type) {
      case MLContentType.LOGO:
        block = multilink.logoSet.find(b => b.order === i);
        if (block) {
          logoSet.push({
            ...block,
            logo:
              parseRawImage(images.find(image => image.order === i && image.suborder === 1)) ??
              null,
            banner: parseRawImage(images.find(image => image.order === i && image.suborder === 2)),
          });
        }
        break;
      case MLContentType.IMAGE:
        block = multilink.imageSet.find(b => b.order === i);
        if (block) {
          imageSet.push({
            ...block,
            images: images
              .filter(image => image.order === i)
              .sort((a, b) => a.suborder - b.suborder)
              .map(image => parseRawImage(image) ?? null),
          });
        }
        break;
      case MLContentType.IMAGETEXT:
        block = multilink.imageTextSet.find(b => b.order === i);
        if (block) {
          imageTextSet.push({
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
        block = multilink.shopSet.find(b => b.order === i);
        if (block) {
          shopSet.push({
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
  });
  return {
    ...multilink,
    background: background ?? multilink.background,
    contentSet,
    logoSet,
    imageSet,
    imageTextSet,
    shopSet,
  };
};
