const importAll = (r: any) => {
  const images = {} as any;
  r.keys().map((item: string, i: number) => {
    images[item.replace('./', '').split('.')[0]] = r(item).default;
  });
  console.log(images);
  return images;
};

export const socials = importAll(require.context('./socials/', false, /\.(png|jpe?g|svg)$/));
