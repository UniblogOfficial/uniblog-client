import { types } from 'sass';

import { parseRawImage } from '../ui';

import { getKeys } from '.';

import { IconColor, MLContentType, SocialNetwork } from 'common/constants';
import {
  IMLDraftButton,
  IMLDraftImage,
  IMLDraftImageText,
  IMLDraftLink,
  IMLDraftLogo,
  IMLDraftMap,
  IMLDraftShop,
  IMLDraftSocial,
  IMLDraftText,
  IMLDraftWidget,
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

    case MLContentType.BUTTON:
      getKeys(blocks).forEach(key => {
        if (key === 'buttonBlocks') {
          newBlocks[key] = [
            ...blocks.buttonBlocks,
            {
              order,
              ...defaultButtonBlockOptions,
            } as IMLDraftButton,
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

    case MLContentType.WIDGET:
      getKeys(blocks).forEach(key => {
        if (key === 'widgetBlocks') {
          newBlocks[key] = [
            ...blocks.widgetBlocks,
            {
              order,
              ...defaultWidgetBlockOptions,
            } as IMLDraftWidget,
          ];
        } else {
          newBlocks[key] = [...blocks[key], null];
        }
      });
      break;

    case MLContentType.MAP:
      getKeys(blocks).forEach(key => {
        if (key === 'mapBlocks') {
          newBlocks[key] = [
            ...blocks.mapBlocks,
            {
              order,
              ...defaultMapBlockOptions,
            } as IMLDraftMap,
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

const defaultTextBlockOptions: Omit<IMLDraftText, 'order'> = {
  type: MLContentType.TEXT,
  isFilled: false,
  text: '',
  fontSize: 18,
  padding: [0, 24],
};

const defaultLinkBlockOptions: Omit<IMLDraftLink, 'order'> = {
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

const defaultButtonBlockOptions: Omit<IMLDraftButton, 'order'> = {
  type: MLContentType.BUTTON,
  isFilled: false,
  href: '',
  title: 'Кнопка',
  fontSize: 20,
  fontWeight: 500,
  padding: [12, 24],
  margin: [0, 24, 12],
  color: 'white',
  borderRadius: 5,
  background: IconColor.INFO,
};

const defaultImageBlockOptions: Omit<IMLDraftImage, 'order'> = {
  type: MLContentType.IMAGE,
  isFilled: false,
  images: [imgPlaceholder],
  imgPosition: 'bottom',
  textPosition: 'outside',
  padding: [0, 24],
};

const defaultImageTextBlockOptions: Omit<IMLDraftImageText, 'order'> = {
  type: MLContentType.IMAGETEXT,
  isFilled: false,
  image: imgPlaceholder,
  text: '',
  imgPosition: 'left',
  hAlign: 'left',
  vAlign: 'top',
  fontSize: 18,
  fontWeight: 400,
  padding: [0, 24],
};

const defaultLogoBlockOptions: Omit<IMLDraftLogo, 'order' | 'isFilled' | 'logo'> = {
  type: MLContentType.LOGO,
  size: 100,
  hAlign: 'center',
  vAlign: 'center',
};

const defaultSocialBlockOptions: Omit<IMLDraftSocial, 'order' | 'links' | 'linkTypes'> = {
  type: MLContentType.SOCIAL,
  isFilled: false,
};

const defaultShopBlockOptions: Omit<IMLDraftShop, 'order'> = {
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
    },
    {
      order: 1,
      image: imgPlaceholder,
      background: '#fff',
      title: 'Item #2',
      subtitle: '2$',
      href: '',
    },
    {
      order: 2,
      image: imgPlaceholder,
      background: '#fff',
      title: 'Item #3',
      subtitle: '3$',
      href: '',
    },
  ],
  color: '#000',
  fontSize: 14,
  fontWeight: 400,
  align: 'left',
  subtitleColor: '#000',
  subtitleFontSize: 14,
  subtitleFontWeight: 700,
  subtitleAlign: 'center',
};

const defaultWidgetBlockOptions: Omit<IMLDraftWidget, 'order' | 'url'> = {
  type: MLContentType.WIDGET,
  isFilled: false,
};

const defaultMapBlockOptions: Omit<IMLDraftMap, 'order'> = {
  type: MLContentType.MAP,
  isFilled: false,
  padding: [12, 24],
  margin: [0, 24, 12],
  url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d561.3480661489472!2d37.6170760620669!3d55.75168773089625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54be25b7f7bfd%3A0xecb362b567f41622!2z0JrRgNCw0YHQvdCw0Y8g0L_Qu9C-0YnQsNC00Yw!5e0!3m2!1sru!2sru!4v1655983050433!5m2!1sru!2sru',
};
