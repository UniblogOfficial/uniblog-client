export type TAudioFile = {
  file: File;
  name: string;
  size: number;
  previewUrl: string;
};

export type TIncomingAudio = {
  imageName?: string;
  imageType: string;
  imageData: string;
};
