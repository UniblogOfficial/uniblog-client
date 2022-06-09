import {
  IMLDraftText,
  IMLDraftLink,
  IMLDraftSocial,
  IMLDraftLogo,
  IMLDraftImage,
  IMLDraftImageText,
  Nullable,
} from '.';

import { MLContentType } from 'common/constants';

export type TMultilinkComplete = {
  name: string;
  background: string;
  contentMap: MLContentType[];
  textBlocks: Nullable<IMLDraftText>[];
  linkBlocks: Nullable<IMLDraftLink>[];
  socialBlocks: Nullable<IMLDraftSocial>[];
  logoBlocks: Nullable<IMLDraftLogo>[];
  imageBlocks: Nullable<IMLDraftImage>[];
  imageTextBlocks: Nullable<IMLDraftImageText>[];
};
