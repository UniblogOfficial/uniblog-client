import { MLContentType } from 'common/constants';
import {
  IMLDraftAudio,
  IMLDraftButton,
  IMLDraftCarousel,
  IMLDraftDivider,
  IMLDraftImage,
  IMLDraftImageText,
  IMLDraftLink,
  IMLDraftLogo,
  IMLDraftMap,
  IMLDraftPost,
  IMLDraftShop,
  IMLDraftSocial,
  IMLDraftText,
  IMLDraftVideo,
  IMLDraftVote,
  IMLDraftWidget,
  TImageFile,
} from 'common/types/instance';
import { TMLDraftImagesBlocks } from 'common/types/instance/mlDraft/mlImageContent';

export type TCreateMLDto = {
  // exm. "VasyaRaper"
  name: string;
  // exm. "#fff"
  background: string;
  outerBackground: string;
  maxWidth: number;

  contentMap: MLContentType[];
  textBlocks: IMLCreateTextDto[];
  socialBlocks: IMLCreateSocialDto[];
  videoBlocks: IMLCreateVideoDto[];
  audioBlocks: IMLCreateAudioDto[];
  widgetBlocks: IMLCreateWidgetDto[];
  voteBlocks: IMLCreateVoteDto[];
  mapBlocks: IMLCreateMapDto[];
  postBlocks: IMLCreatePostDto[];
  feedbackBlocks: [];
  dividerBlocks: IMLCreateDividerDto[];

  logoBlocks: IMLCreateLogoDto[];
  linkBlocks: IMLCreateLinkDto[];
  imageBlocks: IMLCreateImageDto[];
  imageTextBlocks: IMLCreateImageTextDto[];
  shopBlocks: IMLCreateShopDto[];
  buttonBlocks: IMLCreateButtonDto[];
  timerBlocks: [];
  carouselBlocks: IMLCreateCarouselDto[];
};

export type TCreateMLImagesDto = {
  background?: TImageFile;
  blocks: TMLDraftImagesBlocks;
};

interface IMLCreateTextDto extends IMLDraftText {
  order: number;
}
interface IMLCreateLinkDto extends IMLDraftLink {
  order: number;
}
interface IMLCreateSocialDto extends IMLDraftSocial {
  order: number;
}
interface IMLCreateLogoDto extends IMLDraftLogo {
  order: number;
}
interface IMLCreateImageDto extends IMLDraftImage {
  order: number;
}
interface IMLCreateImageTextDto extends IMLDraftImageText {
  order: number;
}
interface IMLCreateVideoDto extends IMLDraftVideo {
  order: number;
}
interface IMLCreateShopDto extends IMLDraftShop {
  order: number;
}
interface IMLCreateAudioDto extends IMLDraftAudio {
  order: number;
}
interface IMLCreateWidgetDto extends IMLDraftWidget {
  order: number;
}
interface IMLCreateCarouselDto extends IMLDraftCarousel {
  order: number;
}
interface IMLCreatePostDto extends IMLDraftPost {
  order: number;
}
interface IMLCreateDividerDto extends IMLDraftDivider {
  order: number;
}
interface IMLCreateButtonDto extends IMLDraftButton {
  order: number;
}
interface IMLCreateVoteDto extends IMLDraftVote {
  order: number;
}
interface IMLCreateMapDto extends IMLDraftMap {
  order: number;
}
