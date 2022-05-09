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

export enum MLContentType {
  LINK = 'link',
  IMAGE = 'image',
  TEXT = 'text',
  UNKNOWN = 'unknown',
}

export enum AppStatus {
  IDLE = 'IDLE',
  SUCCEEDED = 'SUCCEEDED',
  AUTH_LOADING = 'AUTH_LOADING',
  CONTENT_LOADING = 'CONTENT_LOADING',
  USERDATA_LOADING = 'USERDATA_LOADING',
  AUTH_FAILED = 'AUTH_FAILED',
  CONTENT_FAILED = 'CONTENT_FAILED',
  USERDATA_FAILED = 'USERDATA_FAILED',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export { PrivatePath, PublicPath } from './path';
export { StatusCode } from './statusCode';
