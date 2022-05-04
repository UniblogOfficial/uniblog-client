type TImage = {
  title: string;
  src: any;
};

const importAll = (r: any) => {
  const images = [] as Array<TImage>;
  r.keys().map((item: string, i: number) => {
    images.push({ title: item.replace('./', '').split('.')[0], src: r(item).default });
  });
  return images;
};
// important! this titles must be the same to filenames
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
// important! this titles will be shown in front!
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
      socialsPopularitySequence.indexOf(a.title.toLowerCase()) -
      socialsPopularitySequence.indexOf(b.title.toLowerCase()),
  )
  // format titles according to socialsFormattedPopularitySequence
  .map((social: TImage, i: number) => ({
    ...social,
    title: socialsFormattedPopularitySequence[i],
  }));
