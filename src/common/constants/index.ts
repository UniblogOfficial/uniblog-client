export enum IconColor {
  OK = '#00bb00',
  ERROR = '#ff0000',
  INITIAL = '#292825',
  OPTIONAL = '#5555ff',
  INFO = '#1111ff',
  FAVORITE = '#e50010',
}

export enum SocialNetwork {
  VK = 'vk',
  YOUTUBE = 'youtube',
  INSTAGRAM = 'instagram',
  TELEGRAM = 'telegram',
  TIKTOK = 'tiktok',
  TWITTER = 'twitter',
  FACEBOOK = 'facebook',
  PINTEREST = 'pinterest',
}

export enum SocialService {
  WHATSAPP = 'whatsapp',
  GMAIL = 'gmail',
  BOOSTY = 'boosty',
  DISCORD = 'discord',
  PATREON = 'patreon',
  TWITCH = 'twitch',
  WASD = 'wasd',
  DONATIONALERTS = 'donationalerts',
  DZEN = 'dzen',
  ARTOFDIGITAL = 'artofdigital',
  VC = 'vc',
}

export enum MLContentType {
  TEXT = 'textBlocks',
  LOGO = 'logoBlocks',
  SOCIAL = 'socialBlocks',
  VIDEO = 'videoBlocks',
  AUDIO = 'audioBlocks',
  WIDGET = 'widgetBlocks',
  POST = 'postBlocks',
  VOTE = 'voteBlocks',
  FEEDBACK = 'feedbackBlocks',
  MAP = 'mapBlocks',
  DIVIDER = 'dividerBlocks',

  LINK = 'linkBlocks',
  BUTTON = 'buttonBlocks',
  IMAGE = 'imageBlocks',
  IMAGETEXT = 'imageTextBlocks',
  CAROUSEL = 'carouselBlocks',
  SHOP = 'shopBlocks',
  TIMER = 'timerBlocks',
}

export enum MLBackgroundType {
  INNER = 'background',
  OUTER = 'outerBackground',
}

export enum MLConstructorStage {
  TEMPLATE = 0,
  BACKGROUND = 1,
  CONTENT = 2,
  PREVIEW = 3,
}

export enum MLAllSavedImagesType {
  IMAGES_LOGO = 'logo',
  IMAGES_IMAGE = 'image',
  IMAGES_BACKGROUND = 'background',
  IMAGES_LINK = 'link',
}
export enum MLFieldSavedImages {
  FIELD_LOGO = 'logo',
  FIELD_BANNER = 'banner',
  FIELD_IMAGE = 'image',
  FIELD_IMAGES = 'images',
  FIELD_URL = 'url',
}

export enum AppStatus {
  IDLE = 'IDLE',
  SUCCEEDED = 'SUCCEEDED',
  AUTH_LOADING = 'AUTH_LOADING',
  CONTENT_LOADING = 'CONTENT_LOADING',
  USERDATA_LOADING = 'USERDATA_LOADING',
  DATA_SAVING = 'DATA_SAVING',
  AUTH_FAILED = 'AUTH_FAILED',
  CONTENT_FAILED = 'CONTENT_FAILED',
  USERDATA_FAILED = 'USERDATA_FAILED',
  DATA_SAVING_FAILED = 'DATA_SAVING_FAILED',
  DATA_SENDING = 'DATA_SENDING',
  DATA_SENDING_FAILED = 'DATA_SENDING_FAILED',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export enum Direction {
  TOP,
  RIGHT,
  BOTTOM,
  LEFT,
}

export { PrivatePath, PublicPath } from './path';
export { StatusCode } from './statusCode';

export const ID: number[] = [];
(function makeID() {
  for (let i = 0; i < 100; i++) {
    ID.push(i);
  }
})();
