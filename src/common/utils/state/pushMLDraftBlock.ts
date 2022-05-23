import imgPlaceholder from '../../../img/img-placeholder.png';
import { MLContentType, SocialNetwork } from '../../constants';
import {
  IMLDraftContentImage,
  IMLDraftContentImageText,
  IMLDraftContentLink,
  IMLDraftContentLogo,
  IMLDraftContentSocial,
  IMLDraftContentText,
  Nullable,
  TIncomingImage,
  TMLDraftBlocks,
} from '../../types/instance';

import { getKeys } from '.';

// at this moment function just push block at the END!!!
// except logo and social!
export const pushMLDraftBlock = (type: MLContentType, blocks: TMLDraftBlocks, order: number) => {
  const newBlocks = {} as any;
  switch (type) {
    case MLContentType.TEXT:
      // for every field of blocks obj do
      getKeys(blocks).forEach(key => {
        // if current field is target for adding chosen block
        if (key === 'textSet') {
          // push default block at the end of array
          newBlocks[key] = [
            ...blocks.textSet,
            {
              order,
              ...defaultTextBlockOptions,
            } as IMLDraftContentText,
          ];
          // for other fields just push null at the end for data consistency
        } else {
          newBlocks[key] = [...blocks[key], null];
        }
      });
      break;

    case MLContentType.LINK:
      getKeys(blocks).forEach(key => {
        if (key === 'linkSet') {
          newBlocks[key] = [
            ...blocks.linkSet,
            {
              order,
              ...defaultLinkBlockOptions,
            } as IMLDraftContentLink,
          ];
        } else {
          newBlocks[key] = [...blocks[key], null];
        }
      });
      break;

    case MLContentType.IMAGE:
      getKeys(blocks).forEach(key => {
        if (key === 'imageSet') {
          newBlocks[key] = [
            ...blocks.imageSet,
            {
              order,
              ...defaultImageBlockOptions,
            } as IMLDraftContentImage,
          ];
        } else {
          newBlocks[key] = [...blocks[key], null];
        }
      });
      break;

    case MLContentType.IMAGETEXT:
      getKeys(blocks).forEach(key => {
        if (key === 'imageTextSet') {
          newBlocks[key] = [
            ...blocks.imageTextSet,
            {
              order,
              ...defaultImageTextBlockOptions,
            } as IMLDraftContentImageText,
          ];
        } else {
          newBlocks[key] = [...blocks[key], null];
        }
      });
      break;

    default:
      getKeys(blocks).forEach(key => {
        newBlocks[key] = [...blocks[key], null];
      });
  }
  return newBlocks as TMLDraftBlocks;
};

export const pushMLDraftBlockLogo = (
  blocks: TMLDraftBlocks,
  order: number,
  logo: Nullable<TIncomingImage>,
) => {
  const newBlocks = {} as any;
  getKeys(blocks).forEach(key => {
    if (key === 'logoSet') {
      newBlocks[key] = [
        ...blocks.logoSet,
        {
          order,
          image: logo,
          isFilled: !!logo,
          ...defaultLogoBlockOptions,
        } as IMLDraftContentLogo,
      ];
    } else {
      newBlocks[key] = [...blocks[key], null];
    }
  });
  return newBlocks as TMLDraftBlocks;
};

export const pushMLDraftBlockSocial = (
  blocks: TMLDraftBlocks,
  order: number,
  socials: { type: SocialNetwork; href: string }[],
) => {
  const newBlocks = {} as any;
  getKeys(blocks).forEach(key => {
    if (key === 'socialSet') {
      newBlocks[key] = [
        ...blocks.socialSet,
        {
          order,
          links: socials.map(social => social.href),
          icons: socials.map(social => social.type),
          ...defaultSocialBlockOptions,
        } as IMLDraftContentSocial,
      ];
    } else {
      newBlocks[key] = [...blocks[key], null];
    }
  });
  return newBlocks as TMLDraftBlocks;
};

const defaultTextBlockOptions = {
  type: MLContentType.TEXT,
  isFilled: false,
  text: '',
  fontSize: 18,
  padding: [0, 24],
};

const defaultLinkBlockOptions = {
  type: MLContentType.LINK,
  isFilled: false,
  href: '',
  linkType: 'third-party' as const,
  title: 'Ссылка',
  fontSize: 20,
  fontWeight: 500,
  padding: [12, 24],
  margin: [0, 24, 12],
  background: `#f${Math.random().toString(16).substr(-4)}f40`,
};

const defaultImageBlockOptions = {
  type: MLContentType.IMAGE,
  isFilled: false,
  images: [{ src: imgPlaceholder }],
  padding: [0, 24],
};

const defaultImageTextBlockOptions = {
  type: MLContentType.IMAGETEXT,
  isFilled: false,
  image: { src: imgPlaceholder },
  text: '',
  imgPosition: 'left',
  vAlign: 'top',
  fontSize: 18,
  fontWeight: 400,
  padding: [0, 24],
};

const defaultLogoBlockOptions = {
  type: MLContentType.LOGO,
  size: 100,
};

const defaultSocialBlockOptions = {
  type: MLContentType.SOCIAL,
  isFilled: false,
};