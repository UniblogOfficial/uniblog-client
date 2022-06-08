import { parseRawImage } from '../ui';

import { getKeys } from '.';

import { MLContentType, SocialNetwork } from 'common/constants';
import {
  IMLDraftImage,
  IMLDraftImageText,
  IMLDraftLink,
  IMLDraftLogo,
  IMLDraftShop,
  IMLDraftSocial,
  IMLDraftText,
  Nullable,
  TIncomingImage,
  TMLDraftBlocks,
} from 'common/types/instance';
import imgPlaceholder from 'img/img-placeholder.png';

// at this moment function just push block at the END!!!
// except logo and social!
export const pushMLDraftBlock = (type: MLContentType, blocks: TMLDraftBlocks, order: number) => {
  const newBlocks = {} as any;
  switch (type) {
    case MLContentType.TEXT:
      // for every field of blocks obj do
      getKeys(blocks).forEach(key => {
        // if current field is target for adding chosen block
        if (key === 'textBlocks') {
          // push default block at the end of array
          newBlocks[key] = [
            ...blocks.textBlocks,
            {
              order,
              ...defaultTextBlockOptions,
            } as IMLDraftText,
          ];
          // for other fields just push null at the end for data consistency
        } else {
          newBlocks[key] = [...blocks[key], null];
        }
      });
      break;

    case MLContentType.LINK:
      getKeys(blocks).forEach(key => {
        if (key === 'linkBlocks') {
          newBlocks[key] = [
            ...blocks.linkBlocks,
            {
              order,
              ...defaultLinkBlockOptions,
            } as IMLDraftLink,
          ];
        } else {
          newBlocks[key] = [...blocks[key], null];
        }
      });
      break;

    case MLContentType.IMAGE:
      getKeys(blocks).forEach(key => {
        if (key === 'imageBlocks') {
          newBlocks[key] = [
            ...blocks.imageBlocks,
            {
              order,
              ...defaultImageBlockOptions,
            } as IMLDraftImage,
          ];
        } else {
          newBlocks[key] = [...blocks[key], null];
        }
      });
      break;

    case MLContentType.IMAGETEXT:
      getKeys(blocks).forEach(key => {
        if (key === 'imageTextBlocks') {
          newBlocks[key] = [
            ...blocks.imageTextBlocks,
            {
              order,
              ...defaultImageTextBlockOptions,
            } as IMLDraftImageText,
          ];
        } else {
          newBlocks[key] = [...blocks[key], null];
        }
      });
      break;

    case MLContentType.SHOP:
      getKeys(blocks).forEach(key => {
        if (key === 'shopBlocks') {
          newBlocks[key] = [
            ...blocks.shopBlocks,
            {
              order,
              ...defaultShopBlockOptions,
            } as IMLDraftShop,
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
    if (key === 'logoBlocks') {
      newBlocks[key] = [
        ...blocks.logoBlocks,
        {
          order,
          logo: logo ? parseRawImage(logo) : '',
          isFilled: !!logo,
          ...defaultLogoBlockOptions,
        } as IMLDraftLogo,
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
    if (key === 'socialBlocks') {
      newBlocks[key] = [
        ...blocks.socialBlocks,
        {
          order,
          links: socials.map(social => social.href),
          linkTypes: socials.map(social => social.type),
          ...defaultSocialBlockOptions,
        } as IMLDraftSocial,
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
  images: [imgPlaceholder],
  padding: [0, 24],
};

const defaultImageTextBlockOptions = {
  type: MLContentType.IMAGETEXT,
  isFilled: false,
  image: imgPlaceholder,
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

const defaultShopBlockOptions = {
  type: MLContentType.SHOP,
  isFilled: false,
  grid: '1fr 1fr 1fr',
  gap: 10,
  padding: [0, 24],
  cells: [
    {
      order: 0,
      image: imgPlaceholder,
      background: '#fff',
      title: 'Item #1',
      subtitle: '1$',
      href: '',
      color: '#000',
      fontSize: 14,
      fontWeight: 400,
      align: 'left',
      subtitleColor: '#000',
      subtitleFontSize: 14,
      subtitleFontWeight: 700,
      subtitleAlign: 'center',
    },
    {
      order: 1,
      image: { src: imgPlaceholder },
      background: '#fff',
      title: 'Item #2',
      subtitle: '2$',
      href: '',
      color: '#000',
      fontSize: 14,
      fontWeight: 400,
      align: 'left',
      subtitleColor: '#000',
      subtitleFontSize: 14,
      subtitleFontWeight: 700,
      subtitleAlign: 'center',
    },
    {
      order: 2,
      image: { src: imgPlaceholder },
      background: '#fff',
      title: 'Item #3',
      subtitle: '3$',
      href: '',
      color: '#000',
      fontSize: 14,
      fontWeight: 400,
      align: 'left',
      subtitleColor: '#000',
      subtitleFontSize: 14,
      subtitleFontWeight: 700,
      subtitleAlign: 'center',
    },
  ],
};
