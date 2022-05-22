import { MLContentType } from '../../constants';

import {
  IMLDraftContentText,
  IMLDraftContentLink,
  IMLDraftContentSocial,
  IMLDraftContentLogo,
  IMLDraftContentImage,
  IMLDraftContentImageText,
  IMLDraftContentUnknown,
} from './mlDraft';

import { Nullable } from '.';

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
