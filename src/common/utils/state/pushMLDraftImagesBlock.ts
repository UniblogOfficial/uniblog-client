import { MLContentType } from 'common/constants';
import {
  TImageFile,
  TMLImageContentCarousel,
  TMLImageContentImage,
  TMLImageContentImageText,
  TMLImageContentLink,
  TMLImageContentLogo,
  TMLImageContentAudio,
  TMLImageContentButton,
  TMLImageContentShop,
} from 'common/types/instance';
import {
  TMLDraftImagesBlocks,
  MLImageContentButton,
  MLImageContentAudio,
  MLImageContentCarousel,
  MLImageContentImage,
  MLImageContentImageText,
  MLImageContentLink,
  MLImageContentLogo,
  MLImageContentShop,
} from 'common/types/instance/mlDraft/mlImageContent';

export const pushMLDraftImageBlock = (
  type: MLContentType,
  blocks: TMLDraftImagesBlocks,
  id: string,
): void => {
  switch (type) {
    case MLContentType.LOGO:
      blocks[`${type}_${id}`] = new MLImageContentLogo(defaultLogoImageBlockOptions);
      break;

    case MLContentType.LINK:
      blocks[`${type}_${id}`] = new MLImageContentLink(defaultLinkImageBlockOptions);
      break;

    case MLContentType.AUDIO:
      blocks[`${type}_${id}`] = new MLImageContentAudio(defaultAudioImageBlockOptions);
      break;
    case MLContentType.BUTTON:
      blocks[`${type}_${id}`] = new MLImageContentButton(defaultButtonImageBlockOptions);
      break;

    case MLContentType.IMAGE:
      blocks[`${type}_${id}`] = new MLImageContentImage(defaultImageImageBlockOptions);
      break;

    case MLContentType.IMAGETEXT:
      blocks[`${type}_${id}`] = new MLImageContentImageText(defaultImageTextImageBlockOptions);
      break;

    case MLContentType.SHOP:
      blocks[`${type}_${id}`] = new MLImageContentShop(defaultShopImageBlockOptions);
      break;

    case MLContentType.CAROUSEL:
      blocks[`${type}_${id}`] = new MLImageContentCarousel(defaultCarouselImageBlockOptions);
      break;

    default:
  }
};

const defaultLogoImageBlockOptions: TMLImageContentLogo<TImageFile> = {
  order: 0,
  logo: null,
  banner: null,
};

const defaultLinkImageBlockOptions: TMLImageContentLink<TImageFile> = {
  order: 0,
  image: null,
};

const defaultAudioImageBlockOptions: TMLImageContentAudio<TImageFile> = {
  order: 0,
  image: null,
};

const defaultButtonImageBlockOptions: TMLImageContentButton<TImageFile> = {
  order: 0,
  image: null,
};

const defaultImageImageBlockOptions: TMLImageContentImage<TImageFile> = {
  order: 0,
  image: null,
};

const defaultImageTextImageBlockOptions: TMLImageContentImageText<TImageFile> = {
  order: 0,
  image: null,
};

const defaultShopImageBlockOptions: TMLImageContentShop<TImageFile> = {
  order: 0,
  cells: [],
};

const defaultCarouselImageBlockOptions: TMLImageContentCarousel<TImageFile> = {
  order: 0,
  images: [],
};
