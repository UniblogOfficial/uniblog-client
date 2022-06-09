import { MLContentType, SocialNetwork } from 'common/constants';
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
  TMLImageContentButton,
  TMLImageContentCarousel,
  TMLImageContentImage,
  TMLImageContentImageText,
  TMLImageContentLink,
  TMLImageContentLogo,
  TMLImageContentShop,
} from 'common/types/instance';

export type TCreateMLDto = {
  // exm. "VasyaRaper"
  name: string;
  // exm. "#fff"
  background: string;
  // maxWidth

  contentMap: MLContentType[];
  textBlocks: IMLCreateTextDto[];
  socialBlocks: IMLCreateSocialDto[];
  videoBlocks: IMLCreateVideoDto[];
  audioBlocks: IMLCreateAudioDto[];
  widgetBlocks: IMLCreateWidgetDto[];
  voteBlocks: IMLCreateVoteDto[];
  mapBlocks: IMLCreateMapDto[];
  postBlocks: IMLCreatePostDto[];
  dividerBlocks: IMLCreateDividerDto[];

  logoBlocks: IMLCreateLogoDto[];
  linkBlocks: IMLCreateLinkDto[];
  imageBlocks: IMLCreateImageDto[];
  imageTextBlocks: IMLCreateImageTextDto[];
  shopBlocks: IMLCreateShopDto[];
  buttonBlocks: IMLCreateButtonDto[];
  carouselBlocks: IMLCreateCarouselDto[];
};

export type TCreateMLImagesDto = {
  background?: TImageFile;

  logoBlocks: TMLImageContentLogo<TImageFile>[];
  imageBlocks: TMLImageContentImage<TImageFile>[];
  imageTextBlocks: TMLImageContentImageText<TImageFile>[];
  shopBlocks: TMLImageContentShop<TImageFile>[];
  carouselBlocks: TMLImageContentCarousel<TImageFile>[];
  buttonBlocks: TMLImageContentButton<TImageFile>[];
  linkBlocks: TMLImageContentLink<TImageFile>[];
};

interface IMLCreateTextDto extends IMLDraftText {}
interface IMLCreateLinkDto extends IMLDraftLink {}
interface IMLCreateSocialDto extends IMLDraftSocial {}
interface IMLCreateLogoDto extends IMLDraftLogo {}
interface IMLCreateImageDto extends IMLDraftImage {}
interface IMLCreateImageTextDto extends IMLDraftImageText {}
interface IMLCreateVideoDto extends IMLDraftVideo {}
interface IMLCreateShopDto extends IMLDraftShop {}
interface IMLCreateAudioDto extends IMLDraftAudio {}
interface IMLCreateWidgetDto extends IMLDraftWidget {}
interface IMLCreateCarouselDto extends IMLDraftCarousel {}
interface IMLCreatePostDto extends IMLDraftPost {}
interface IMLCreateDividerDto extends IMLDraftDivider {}
interface IMLCreateButtonDto extends IMLDraftButton {}
interface IMLCreateVoteDto extends IMLDraftVote {}
interface IMLCreateMapDto extends IMLDraftMap {}
