import { TMLImageContentTimer } from '../../types/instance/mlDraft/mlDraft';
import { MLImageContentTimer } from '../../types/instance/mlDraft/mlImageContent/mlImageTimer.class';

import { MLContentType } from 'common/constants';
import {
  TImageFile,
  TMLImageContentAudio,
  TMLImageContentButton,
  TMLImageContentCarousel,
  TMLImageContentImage,
  TMLImageContentImageText,
  TMLImageContentLink,
  TMLImageContentLogo,
  TMLImageContentShop,
} from 'common/types/instance';
import {
  MLImageContentAudio,
  MLImageContentButton,
  MLImageContentCarousel,
  MLImageContentImage,
  MLImageContentImageText,
  MLImageContentLink,
  MLImageContentLogo,
  MLImageContentShop,
  TMLDraftImagesBlocks,
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
    case MLContentType.TIMER:
      blocks[`${type}_${id}`] = new MLImageContentTimer(defaultTimerImageBlockOptions);
      break;

    default:
  }
};

const defaultLogoImageBlockOptions: TMLImageContentLogo<TImageFile> = {
  order: 0,
  logo: null,
  banner: null,
};
const defaultTimerImageBlockOptions: TMLImageContentTimer<TImageFile> = {
  order: 0,
  image: null,
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
