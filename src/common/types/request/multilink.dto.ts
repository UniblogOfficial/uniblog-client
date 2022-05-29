import { MLContentType, SocialNetwork } from '../../constants';
import {
  IMLDraftContentImage,
  IMLDraftContentImageText,
  IMLDraftContentLink,
  IMLDraftContentLogo,
  IMLDraftContentShop,
  IMLDraftContentSocial,
  IMLDraftContentText,
  IMLDraftContentUnknown,
  IMLDraftContentVideo,
  TImageFile,
  TMLImageContentImage,
  TMLImageContentImageText,
  TMLImageContentLogo,
  TMLImageContentShop,
} from '../instance';

export type TCreateMLDto = {
  // exm. "VasyaRaper"
  name: string;
  // exm. "#fff"
  background: string;

  contentSet: MLContentType[];
  textSet: IMLDraftContentTextDto[];
  linkSet: IMLDraftContentLinkDto[];
  socialSet: IMLDraftContentSocialDto[];
  logoSet: IMLDraftContentLogoDto[];
  imageSet: IMLDraftContentImageDto[];
  imageTextSet: IMLDraftContentImageTextDto[];
  videoSet: IMLDraftContentVideoDto[];
  shopSet: IMLDraftContentShopDto[];
};

export type TCreateMLImagesDto = {
  background?: TImageFile;
  logoSet: TMLImageContentLogo<TImageFile>[];
  imageSet: TMLImageContentImage<TImageFile>[];
  imageTextSet: TMLImageContentImageText<TImageFile>[];
  shopSet: TMLImageContentShop<TImageFile>[];
};

interface IMLDraftContentTextDto extends IMLDraftContentText {}
interface IMLDraftContentLinkDto extends IMLDraftContentLink {}
interface IMLDraftContentSocialDto extends IMLDraftContentSocial {}
interface IMLDraftContentLogoDto extends IMLDraftContentLogo {}
interface IMLDraftContentImageDto extends IMLDraftContentImage {}
interface IMLDraftContentImageTextDto extends IMLDraftContentImageText {}
interface IMLDraftContentVideoDto extends IMLDraftContentVideo {}
interface IMLDraftContentShopDto extends IMLDraftContentShop {}
