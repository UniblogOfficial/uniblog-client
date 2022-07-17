type TImage = {
  type: string;
  src: any;
  title?: string;
};

interface RequireContext {
  keys(): string[];
  (id: string): any;
  <T>(id: string): T;
  resolve(id: string): string;
  id: string;
}

const importAll = (r: RequireContext) => {
  const images = [] as Array<TImage>;
  r.keys().map((item, i, arr) => {
    if (i >= arr.length / 2) {
      const src = r(item);
      images.push({
        type: item.replace('./', '').split('.')[0],
        src,
      });
    }
  });
  return images;
};
// important! this types must be the same to filenames
// important! this is common type names for all project
const socialsPopularitySequence = [
  'instagram',
  'tiktok',
  'telegram',
  'vk',
  'youtube',
  'facebook',
  'twitter',
  'pinterest',
];
// this titles will be shown in front!
const socialsFormattedPopularitySequence = [
  'Instagram',
  'TikTok',
  'Telegram',
  'Vk',
  'Youtube',
  'Facebook',
  'Twitter',
  'Pinterest',
];

const socials = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));

export default socials
  // sort according to popularity
  .sort(
    (a: TImage, b: TImage) =>
      socialsPopularitySequence.indexOf(a.type.toLowerCase()) -
      socialsPopularitySequence.indexOf(b.type.toLowerCase()),
  )
  // format titles according to socialsFormattedPopularitySequence
  .map((social: TImage, i: number) => ({
    ...social,
    title: socialsFormattedPopularitySequence[i],
  }));
