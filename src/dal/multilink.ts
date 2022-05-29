import { TCreateMLDto, TCreateMLImagesDto } from '../common/types/request';

import { api } from './api';

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
      contentSet,
      logoSet,
      imageSet,
      imageTextSet,
      linkSet,
      shopSet,
      socialSet,
      textSet,
      videoSet,
    } = multilink;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('background', background);
    formData.append(`contentSet`, JSON.stringify(contentSet));
    formData.append(`logoSet`, JSON.stringify(logoSet));
    formData.append(`imageSet`, JSON.stringify(imageSet));
    formData.append(`imageTextSet`, JSON.stringify(imageTextSet));
    formData.append(`linkSet`, JSON.stringify(linkSet));
    formData.append(`shopSet`, JSON.stringify(shopSet));
    formData.append(`socialSet`, JSON.stringify(socialSet));
    formData.append(`textSet`, JSON.stringify(textSet));
    formData.append(`videoSet`, JSON.stringify(videoSet));

    if (images.background) {
      formData.append(`backgroundImage`, images.background.file);
    }

    images.logoSet.forEach((block, i) => {
      block.logo && formData.append(`${block.order}_logo_1`, block.logo.file);
      block.banner && formData.append(`${block.order}_logo_2`, block.banner.file);
    });

    images.imageSet.forEach((block, i) => {
      block.images.forEach((image, j) => {
        image && formData.append(`${block.order}_image_${j}`, image.file);
      });
    });

    images.imageTextSet.forEach((block, i) => {
      block.image && formData.append(`${block.order}_imagetext_0`, block.image.file);
    });

    images.shopSet.forEach((block, i) => {
      block.cells.forEach((cell, j) => {
        cell && formData.append(`${block.order}_shop_${j}`, cell.file);
      });
    });

    return api.post(`multilink`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
