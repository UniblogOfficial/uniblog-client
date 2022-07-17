import { capitalizeFirst } from 'common/utils/ui';

type TImage = {
  type: string;
  src: any;
  title?: string;
};

const importAll = (r: any) => {
  const images = [] as Array<TImage>;
  r.keys().map((item: string, i: number, arr: string[]) => {
    if (i < arr.length / 2) {
      const src = r(item);
      images.push({
        type: item.replace('./', '').split('.')[0],
        src,
      });
    }
  });
  return images;
};

const socialServices = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));

export default socialServices.map((social: TImage, i: number) => ({
  ...social,
  title: capitalizeFirst(social.type),
}));
