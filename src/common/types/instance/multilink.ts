import { MLContentType, SocialNetwork } from '../../constants';

import { Nullable } from '.';

export type TMLContent = {
  order: number;
  type: MLContentType;
  link: Nullable<string>;
  linkType: Nullable<SocialNetwork | 'third-party'>;
  title: Nullable<string>;
  text: Nullable<string>;
  img: string | undefined;
};
