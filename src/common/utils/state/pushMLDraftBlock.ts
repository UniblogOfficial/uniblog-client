import { IconColor, MLContentType, SocialNetwork } from 'common/constants';
import {
  IMLDraftAudio,
  IMLDraftButton,
  IMLDraftCarousel,
  IMLDraftImage,
  IMLDraftImageText,
  IMLDraftLink,
  IMLDraftLogo,
  IMLDraftMap,
  IMLDraftShop,
  IMLDraftSocial,
  IMLDraftText,
  IMLDraftTimer,
  IMLDraftWidget,
  MLDraftAudio,
  MLDraftButton,
  MLDraftCarousel,
  MLDraftImage,
  MLDraftImageText,
  MLDraftLink,
  MLDraftLogo,
  MLDraftMap,
  MLDraftShop,
  MLDraftText,
  MLDraftTimer,
  MLDraftWidget,
  Nullable,
  TIncomingImage,
  TMLDraftBlocks,
} from 'common/types/instance';
import imgPlaceholder from 'img/img-placeholder.png';

// at this moment function just push block at the END!!!
// except logo and social!
export const pushMLDraftBlock = (type: MLContentType, blocks: TMLDraftBlocks, id: string): void => {
  switch (type) {
    case MLContentType.TEXT:
      blocks[`${type}_${id}`] = new MLDraftText(defaultTextBlockOptions);
      break;

    case MLContentType.LINK:
      blocks[`${type}_${id}`] = new MLDraftLink(defaultLinkBlockOptions);
      break;

    case MLContentType.AUDIO:
      blocks[`${type}_${id}`] = new MLDraftAudio(defaultAudioBlockOptions);
      break;

    case MLContentType.CAROUSEL:
      blocks[`${type}_${id}`] = new MLDraftCarousel(defaultCarouselBlockOptions);
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

    case MLContentType.LOGO:
      blocks[`${type}_${id}`] = new MLDraftLogo(defaultLogoBlockOptions);
      break;
    case MLContentType.TIMER:
      blocks[`${type}_${id}`] = new MLDraftTimer(defaultTimerBlockOptions);
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

const defaultAudioBlockOptions: IMLDraftAudio = {
  isFilled: false,
  url: '',
  margin: [12, 24],
};
const defaultTimerBlockOptions: IMLDraftTimer = {
  isFilled: false,
  margin: [12, 24],
  image: '',
  countdown: 12,
  title: '',
  href: '',
};

const defaultCarouselBlockOptions: IMLDraftCarousel = {
  isFilled: false,
  images: [],
  margin: [12, 24],
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

const defaultLogoBlockOptions: IMLDraftLogo = {
  size: 100,
  hAlign: 'center',
  vAlign: 'center',
  isFilled: false,
  logo: null,
  banner: null,
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
  subtitleTextAlign: 'center',
};

const defaultWidgetBlockOptions: IMLDraftWidget = {
  isFilled: false,
  url: '',
  width: 300,
  height: 300,
};

const defaultMapBlockOptions: IMLDraftMap = {
  isFilled: false,
  url: 'url',
  latLng: null,
  padding: [12, 24],
  margin: [0, 24, 12],
};
