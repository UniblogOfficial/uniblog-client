import { MLContentType, SocialNetwork } from 'common/constants';
import {
  IMLDraftImage,
  IMLDraftImageText,
  IMLDraftLink,
  IMLDraftLogo,
  IMLDraftShop,
  IMLDraftSocial,
  IMLDraftText,
  IMLDraftVideo,
  TImageFile,
  TMLImageContentImage,
  TMLImageContentImageText,
  TMLImageContentLogo,
  TMLImageContentShop,
} from 'common/types/instance';

export type TCreateMLDto = {
  // exm. "VasyaRaper"
  name: string;
  // exm. "#fff"
  background: string;

  contentMap: MLContentType[];
  textBlocks: IMLDraftContentTextDto[];
  linkBlocks: IMLDraftContentLinkDto[];
  socialBlocks: IMLDraftContentSocialDto[];
  logoBlocks: IMLDraftContentLogoDto[];
  imageBlocks: IMLDraftContentImageDto[];
  imageTextBlocks: IMLDraftContentImageTextDto[];
  videoBlocks: IMLDraftContentVideoDto[];
  shopBlocks: IMLDraftContentShopDto[];
};

export type TCreateMLImagesDto = {
  background?: TImageFile;
  logoBlocks: TMLImageContentLogo<TImageFile>[];
  imageBlocks: TMLImageContentImage<TImageFile>[];
  imageTextBlocks: TMLImageContentImageText<TImageFile>[];
  shopBlocks: TMLImageContentShop<TImageFile>[];
};

interface IMLDraftContentTextDto extends IMLDraftText {}
interface IMLDraftContentLinkDto extends IMLDraftLink {}
interface IMLDraftContentSocialDto extends IMLDraftSocial {}
interface IMLDraftContentLogoDto extends IMLDraftLogo {}
interface IMLDraftContentImageDto extends IMLDraftImage {}
interface IMLDraftContentImageTextDto extends IMLDraftImageText {}
interface IMLDraftContentVideoDto extends IMLDraftVideo {}
interface IMLDraftContentShopDto extends IMLDraftShop {}
