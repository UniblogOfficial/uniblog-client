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
  MLDraftButton,
  MLDraftImage,
  MLDraftImageText,
  MLDraftLink,
  MLDraftMap,
  MLDraftShop,
  MLDraftText,
  MLDraftWidget,
  Nullable,
  TIncomingImage,
  TMLDraftBlocks,
} from 'common/types/instance';
import imgPlaceholder from 'img/img-placeholder.png';

// at this moment function just push block at the END!!!
// except logo and social!
export const pushMLDraftBlock = (type: MLContentType, blocks: TMLDraftBlocks, id: string) => {
  const newBlocks: TMLDraftBlocks = {};

  switch (type) {
    case MLContentType.TEXT:
      /* // for every field of blocks obj do
      getKeys(blocks).forEach(key => {
        // if current field is target for adding chosen block
        if (key === 'textBlocks') {
          // push default block at the end of array
          newBlocks[key] = [
            ...blocks.textBlocks,
            new MLDraftText({ order, ...defaultTextBlockOptions }),
          ];
          // for other fields just push null at the end for data consistency
        } else {
          newBlocks[key] = [...blocks[key], null];
        }
      }); */
      blocks[`${type}_${id}`] = new MLDraftText(defaultTextBlockOptions);
      break;

    case MLContentType.LINK:
      blocks[`${type}_${id}`] = new MLDraftLink(defaultLinkBlockOptions);
      break;

    case MLContentType.BUTTON:
      blocks[`${type}_${id}`] = new MLDraftButton(defaultButtonBlockOptions);
      break;

    case MLContentType.IMAGE:
      blocks[`${type}_${id}`] = new MLDraftImage(defaultImageBlockOptions);
      break;

    case MLContentType.IMAGETEXT:
      blocks[`${type}_${id}`] = new MLDraftImageText(defaultImageTextBlockOptions);
      break;

    case MLContentType.SHOP:
      blocks[`${type}_${id}`] = new MLDraftShop(defaultShopBlockOptions);
      break;

    case MLContentType.WIDGET:
      blocks[`${type}_${id}`] = new MLDraftWidget(defaultWidgetBlockOptions);
      break;

    case MLContentType.MAP:
      blocks[`${type}_${id}`] = new MLDraftMap(defaultMapBlockOptions);
      break;

    default:
  }
};

export const pushMLDraftBlockLogo = (
  blocks: TMLDraftBlocks,
  order: number,
  logo: Nullable<TIncomingImage>,
) => {
  const newBlocks = {} as any;
  /* getKeys(blocks).forEach(key => {
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
  }); */
  return newBlocks as TMLDraftBlocks;
};

export const pushMLDraftBlockSocial = (
  blocks: TMLDraftBlocks,
  order: number,
  socials: { type: SocialNetwork; href: string }[],
) => {
  const newBlocks = {} as any;
  /* getKeys(blocks).forEach(key => {
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
  }); */
  return newBlocks as TMLDraftBlocks;
};

const defaultTextBlockOptions: IMLDraftText = {
  isFilled: false,
  text: '',
  fontSize: 18,
  padding: [0, 24],
};

const defaultLinkBlockOptions: IMLDraftLink = {
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

const defaultButtonBlockOptions: IMLDraftButton = {
  isFilled: false,
  href: '',
  title: 'Кнопка',
  fontSize: 20,
  fontWeight: 500,
  padding: [12, 24],
  margin: [0, 24, 12],
  color: 'white',
  borderRadius: [5],
  background: IconColor.INFO,
};

const defaultImageBlockOptions: IMLDraftImage = {
  isFilled: false,
  image: imgPlaceholder,
  imgPosition: 'bottom',
  textPosition: 'outside',
  padding: [0, 24],
};

const defaultImageTextBlockOptions: IMLDraftImageText = {
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

const defaultLogoBlockOptions: Omit<IMLDraftLogo, 'isFilled' | 'logo'> = {
  size: 100,
  hAlign: 'center',
  vAlign: 'center',
};

const defaultSocialBlockOptions: Omit<IMLDraftSocial, 'links' | 'linkTypes'> = {
  isFilled: false,
};

const defaultShopBlockOptions: IMLDraftShop = {
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
  textAlign: 'left',
  subtitleColor: '#000',
  subtitleFontSize: 14,
  subtitleFontWeight: 700,
  subtitleAlign: 'center',
};

const defaultWidgetBlockOptions: IMLDraftWidget = {
  isFilled: false,
  url: '',
};

const defaultMapBlockOptions: IMLDraftMap = {
  isFilled: false,
  url: 'url',
  latLng: null,
  padding: [12, 24],
  margin: [0, 24, 12],
};
