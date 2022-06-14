export type TImageFile = {
  file: File;
  name: string;
  size: number;
  previewUrl: string;
};

export type TIncomingImage = {
  imageName?: string;
  imageType: string;
  imageData: string;
};
