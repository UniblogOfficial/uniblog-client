import {
  IMLDraftContentText,
  IMLDraftContentLink,
  IMLDraftContentSocial,
  IMLDraftContentLogo,
  IMLDraftContentImage,
  IMLDraftContentImageText,
  IMLDraftContentUnknown,
  Nullable,
} from '.';

import { MLContentType } from 'common/constants';

export type TMultilinkComplete = {
  name: string;
  background: string;
  contentSet: MLContentType[];
  textSet: Nullable<IMLDraftContentText>[];
  linkSet: Nullable<IMLDraftContentLink>[];
  socialSet: Nullable<IMLDraftContentSocial>[];
  logoSet: Nullable<IMLDraftContentLogo>[];
  imageSet: Nullable<IMLDraftContentImage>[];
  imageTextSet: Nullable<IMLDraftContentImageText>[];
  unknownSet: Nullable<IMLDraftContentUnknown>[];
};
