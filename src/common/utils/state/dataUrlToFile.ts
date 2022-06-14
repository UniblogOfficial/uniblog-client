export const dataUrlToFile = async (url: string, fileName: string) => {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const mime = url.match(/:(.*?);/)?.[0];

  return new File([buffer], fileName, { type: mime });
};
