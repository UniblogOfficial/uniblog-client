const importAll = (r: any) => {
  const images: any = {};
  r.keys().map((item: string, i: number) => {
    // @ts-ignore
    images[item.replace('./', '').split('.')[0]] = r(item).default;
  });
  return images;
};

const landingImages = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));
export default landingImages;
