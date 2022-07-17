const importAll = (r: any) => {
  const images: any = {};
  r.keys().map((item: string, i: number, arr: string[]) => {
    // @ts-ignore
    if (i < arr.length / 2) {
      images[item.replace('./', '').split('.')[0]] = r(item);
    }
  });
  return images;
};

const landingImages = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));
export default landingImages;
