import { api } from '.';

import { TCreateMLDto, TCreateMLImagesDto } from 'common/types/request';
import { getKeys } from 'common/utils/state';

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
    const formData = new FormData();
    getKeys(multilink).forEach(key => {
      formData.append(key, JSON.stringify(multilink[key]));
    });

    /*     if (images.background) {
      formData.append('images', images.background.file, 'backgroundImage');
    } */

    images.logoBlocks.forEach((block, i) => {
      block.logo && formData.append('images', block.logo.file, `${block.order}_logo_0`);
      block.banner && formData.append('images', block.banner.file, `${block.order}_logo_1`);
    });

    images.linkBlocks.forEach((block, i) => {
      block.image && formData.append('images', block.image.file, `${block.order}_link_0`);
    });

    images.buttonBlocks.forEach((block, i) => {
      block.image && formData.append('images', block.image.file, `${block.order}_button_0`);
    });

    images.imageBlocks.forEach((block, i) => {
      block.image && formData.append('images', block.image.file, `${block.order}_image_0`);
    });

    images.imageTextBlocks.forEach((block, i) => {
      block.image && formData.append('images', block.image.file, `${block.order}_imagetext_0`);
    });

    images.carouselBlocks.forEach((block, i) => {
      block.images.forEach((image, j) => {
        image && formData.append('images', image.file, `${block.order}_carousel_${j}`);
      });
    });

    images.shopBlocks.forEach((block, i) => {
      block.cells.forEach((cell, j) => {
        cell && formData.append('images', cell.file, `${block.order}_shop_${j}`);
      });
    });

    // @ts-ignore
    /*     for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
    return new Promise(res => {
      setTimeout(() => res(true), 4000);
    }); */

    return api.post(`multilink`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
