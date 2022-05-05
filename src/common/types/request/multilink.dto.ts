import { MLContentType, SocialNetwork } from '../../constants';

export type TCreateMLDto = {
  // exm. "VasyaRaper"
  name: string;
  // exm. "[50, 25, 12.5, 12.5]" !important: sum of elements must be equal to 100
  template: number[];
  // exm. "#fff"
  background: string;

  content: TContentDTO[];
};

type TContentDTO = {
  order: number;
  type: MLContentType;
  link?: string;
  linkType?: SocialNetwork | 'third-party';
  title?: string;
  text?: string;
};