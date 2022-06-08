import { api } from '.';

import { TCreateMLDto, TCreateMLImagesDto } from 'common/types/request';

export const multilinkAPI = {
  get(name: string, id?: string) {
    return api
      .get(`multilink/${name}`)
      .then(response => ({ data: response.data.data, message: response.data.message }));
  },

  getAll() {
    return api
      .get('multilink/all')
      .then(response => ({ data: response.data.data, message: response.data.message }));
  },

  create(multilink: TCreateMLDto, images: TCreateMLImagesDto) {
    const {
      name,
      background,
      contentMap,
      logoBlocks,
      imageBlocks,
      imageTextBlocks,
      linkBlocks,
      shopBlocks,
      socialBlocks,
      textBlocks,
      videoBlocks,
    } = multilink;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('background', background);
    formData.append(`contentMap`, JSON.stringify(contentMap));
    formData.append(`logoBlocks`, JSON.stringify(logoBlocks));
    formData.append(`imageBlocks`, JSON.stringify(imageBlocks));
    formData.append(`imageTextBlocks`, JSON.stringify(imageTextBlocks));
    formData.append(`linkBlocks`, JSON.stringify(linkBlocks));
    formData.append(`shopBlocks`, JSON.stringify(shopBlocks));
    formData.append(`socialBlocks`, JSON.stringify(socialBlocks));
    formData.append(`textBlocks`, JSON.stringify(textBlocks));
    formData.append(`videoBlocks`, JSON.stringify(videoBlocks));

    if (images.background) {
      formData.append('images', images.background.file, 'backgroundImage');
    }

    images.logoBlocks.forEach((block, i) => {
      block.logo && formData.append('images', block.logo.file, `${block.order}_logo_1`);
      block.banner && formData.append('images', block.banner.file, `${block.order}_logo_2`);
    });

    images.imageBlocks.forEach((block, i) => {
      block.images.forEach((image, j) => {
        image && formData.append('images', image.file, `${block.order}_image_${j}`);
      });
    });

    images.imageTextBlocks.forEach((block, i) => {
      block.image && formData.append('images', block.image.file, `${block.order}_imagetext_0`);
    });

    images.shopBlocks.forEach((block, i) => {
      block.cells.forEach((cell, j) => {
        cell && formData.append('images', cell.file, `${block.order}_shop_${j}`);
      });
    });

    return api.post(`multilink`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
