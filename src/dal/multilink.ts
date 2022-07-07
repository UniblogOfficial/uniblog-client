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

    if (images.background) {
      formData.append('images', images.background.file, 'backgroundImage');
    }

    return api.post(`multilink`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
