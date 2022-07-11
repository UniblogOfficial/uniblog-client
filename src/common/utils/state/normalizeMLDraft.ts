import { MLContentType } from 'common/constants';
import {
  MLDraftAudio,
  MLDraftButton,
  MLDraftCarousel,
  MLDraftImage,
  MLDraftImageText,
  MLDraftLink,
  MLDraftLogo,
  MLDraftMap,
  MLDraftShop,
  MLDraftSocial,
  MLDraftText,
  MLDraftTimer,
  MLDraftVideo,
  MLDraftVote,
  MLDraftWidget,
  TMLDraftBlocksUnion,
  TMultilinkDraft,
} from 'common/types/instance';
import { TCreateMLDto, TCreateMLImagesDto } from 'common/types/request';

export const normalizeMLDraft = (mlDraft: TMultilinkDraft): [TCreateMLDto, TCreateMLImagesDto] => {
  const { name, background, outerBackground, maxWidth, contentMap, blocks, images } = mlDraft;
  const blocksDto: Omit<
    TCreateMLDto,
    'name' | 'outerBackground' | 'background' | 'maxWidth' | 'contentMap'
  > = {
    textBlocks: [],
    socialBlocks: [],
    videoBlocks: [],
    audioBlocks: [],
    dividerBlocks: [],
    mapBlocks: [],
    postBlocks: [],
    voteBlocks: [],
    feedbackBlocks: [],
    widgetBlocks: [],

    logoBlocks: [],
    linkBlocks: [],
    imageBlocks: [],
    imageTextBlocks: [],
    shopBlocks: [],
    carouselBlocks: [],
    timerBlocks: [],
    buttonBlocks: [],
  };
  const splittedContentMap = contentMap.map((typeId, i) => ({
    id: typeId.split('_')[1],
    order: i,
    type: typeId.split('_')[0] as MLContentType,
  }));
  contentMap.forEach((contentId, i) => {
    const block: TMLDraftBlocksUnion = blocks[contentId];

    if (block instanceof MLDraftText) {
      return blocksDto.textBlocks.push({ ...block, order: i });
    }
    if (block instanceof MLDraftSocial) {
      return blocksDto.socialBlocks.push({ ...block, order: i });
    }
    if (block instanceof MLDraftWidget) {
      return blocksDto.widgetBlocks.push({ ...block, order: i });
    }
    if (block instanceof MLDraftVideo) {
      return blocksDto.videoBlocks.push({ ...block, order: i });
    }
    if (block instanceof MLDraftMap) {
      return blocksDto.mapBlocks.push({ ...block, order: i });
    }
    if (block instanceof MLDraftAudio) {
      return blocksDto.audioBlocks.push({ ...block, order: i });
    }
    if (block instanceof MLDraftVote) {
      return blocksDto.voteBlocks.push({ ...block, order: i });
    }
    if (block instanceof MLDraftLogo) {
      return blocksDto.logoBlocks.push({ ...block, logo: null, order: i });
    }
    if (block instanceof MLDraftLink) {
      return blocksDto.linkBlocks.push({ ...block, order: i });
    }
    if (block instanceof MLDraftButton) {
      return blocksDto.buttonBlocks.push({ ...block, order: i });
    }
    if (block instanceof MLDraftImage) {
      return blocksDto.imageBlocks.push({ ...block, order: i });
    }
    if (block instanceof MLDraftImageText) {
      return blocksDto.imageTextBlocks.push({ ...block, order: i });
    }
    if (block instanceof MLDraftCarousel) {
      return blocksDto.carouselBlocks.push({ ...block, order: i });
    }
    if (block instanceof MLDraftShop) {
      return blocksDto.shopBlocks.push({ ...block, order: i });
    }
    if (block instanceof MLDraftTimer) {
      return blocksDto.timerBlocks.push({ ...block, order: i });
    }
  });
  const multilinkDto: TCreateMLDto = {
    name,
    background,
    outerBackground,
    maxWidth,
    contentMap: contentMap.map(typeId => typeId.split('_')[0] as MLContentType),
    ...blocksDto,
  };
  const imagesDto: TCreateMLImagesDto = {
    background: images.background ?? undefined,

    blocks: {},
  };
  return [multilinkDto, imagesDto];
};
