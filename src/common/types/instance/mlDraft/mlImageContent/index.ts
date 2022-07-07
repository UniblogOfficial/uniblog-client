import { MLImageContentAudio } from './mlImageAudio.class';
import { MLImageContentButton } from './mlImageButton.class';
import { MLImageContentCarousel } from './mlImageCarousel.class';
import { MLImageContentImage } from './mlImageImage.class';
import { MLImageContentImageText } from './mlImageImageText.class';
import { MLImageContentLink } from './mlImageLink.class';
import { MLImageContentLogo } from './mlImageLogo.class';
import { MLImageContentShop } from './mlImageShop.class';

export type TMLDraftImagesBlocks = { [key: string]: TMLDraftImagesBlocksUnion };

export type TMLDraftImagesBlocksUnion =
  | MLImageContentLogo
  | MLImageContentImage
  | MLImageContentAudio
  | MLImageContentButton
  | MLImageContentCarousel
  | MLImageContentImageText
  | MLImageContentLink
  | MLImageContentShop;

export {
  MLImageContentLogo,
  MLImageContentImage,
  MLImageContentAudio,
  MLImageContentButton,
  MLImageContentCarousel,
  MLImageContentImageText,
  MLImageContentLink,
  MLImageContentShop,
};
