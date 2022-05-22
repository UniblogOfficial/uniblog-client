import { MLContentType, SocialNetwork } from '../../constants';

export type TCreateMLDto = {
  // exm. "VasyaRaper"
  name: string;
  // exm. "#fff"
  background: string;

  content: TContentDto[];
};

export type TMLImageDto = {
  order: number;
  file: File;
};

type TContentDto = {
  order: number;
  type: MLContentType;
  link?: string;
  linkType?: SocialNetwork | 'third-party';
  title?: string;
  text?: string;
};
