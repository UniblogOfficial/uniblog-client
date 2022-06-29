/* eslint-disable @typescript-eslint/no-shadow */
import { Nullable } from '.';

/* eslint-disable prefer-destructuring */
interface ICommonBlock {
  index: number;
  type: string;
}

interface ITextBlock extends ICommonBlock {
  text: string;
}

interface IImageBlock extends ICommonBlock {
  image: string;
}

interface ILinkBlock extends ICommonBlock {
  url: string;
}

const text0: ITextBlock = {
  index: 0,
  type: 'a',
  text: 'a',
};
const image1: IImageBlock = {
  index: 1,
  type: 'b',
  image: 'b',
};
const link2: ILinkBlock = {
  index: 2,
  type: 'c',
  url: 'c',
};
const image3: IImageBlock = {
  index: 4,
  type: 'b',
  image: 'b',
};

type TArrElement = ITextBlock | ILinkBlock | IImageBlock;

const arr: TArrElement[] = [text0, image1, link2, image3];
const { index, type } = arr[0];
const text = (arr[0] as ITextBlock).text;
const textFail = (arr[1] as ITextBlock).text; // Error: text is undefined
//
//
//
//
//
//
//
//
//
//
const contentMap = ['text', 'image', 'link', 'image', 'text']; // as Enum ElementType[]
const textArr: Nullable<ITextBlock>[] = [text0, null, null, null, text0]; // as (IA | null)[]
const imageArr: Nullable<IImageBlock>[] = [null, image1, null, image3, null]; // as (IB | null)[]
const linkArr: Nullable<ILinkBlock>[] = [null, null, link2, null, null]; // as (IC | null)[]

contentMap.map((type, i) => {
  switch (type) {
    case 'text':
      return textArr[i]?.text ?? '';
    default:
  }
});

/* contentMap: [ 'imageBlocks_nwnrwvrwrb', 'textBlocks_nprwgwrnpv4343', 'logoBlocks_grteeenhtres']
blocks: {
  [grteeenhtres]: {logoBlockData} as instanceof class MLDraftLogo
  [nprwgwrnpv4343]: {textBlockData} as instanceof class MLDraftText
} as { [key: string]: IMLDraftLogo | IMLDraftText }

pushBlock(payload) {
  if (payload.type === 'text') {
    block = new MLDraftText(payload);
    blocks.addProperty(id, block)
    contentMap.push('textBlocks_' + id)
  }
}
delete

draw = (blocks) => {
  contentMap.map([type, id] => {
    switch (type) {
      case (type === 'textBlocks'): {
        if (blocks[id] instanceof MLDraftText) {
          let block: MLDraftText = blocks[type[1]
          return <>{block.data}</>
        }
      }
    }
  })
}
if instanceof

block[grteeenhtres].image */
