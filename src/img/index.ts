type TImage = {
  type: string;
  src: any;
  title?: string;
};

const importAll = (r: any) => {
  const images = [] as Array<TImage>;
  r.keys().map((item: string, i: number) => {
    images.push({ type: item.replace('./', '').split('.')[0], src: r(item).default });
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

const socials = importAll(require.context('./socials/', false, /\.(png|jpe?g|svg)$/));

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
