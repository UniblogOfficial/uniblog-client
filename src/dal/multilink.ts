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
      formData.append('images', images.background.file, 'backgroundImage');
    }

    images.logoSet.forEach((block, i) => {
      block.logo && formData.append('images', block.logo.file, `${block.order}_logo_1`);
      block.banner && formData.append('images', block.banner.file, `${block.order}_logo_2`);
    });

    images.imageSet.forEach((block, i) => {
      block.images.forEach((image, j) => {
        image && formData.append('images', image.file, `${block.order}_image_${j}`);
      });
    });

    images.imageTextSet.forEach((block, i) => {
      block.image && formData.append('images', block.image.file, `${block.order}_imagetext_0`);
    });

    images.shopSet.forEach((block, i) => {
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
