export const capitalizeFirst = (s: string) => (s && s[0].toUpperCase() + s.slice(1)) || '';

export const parseRawImage = (rawImage: any) =>
  `data:${rawImage.imageType};base64, ${Buffer.from(rawImage.imageData!).toString('base64')}`;
