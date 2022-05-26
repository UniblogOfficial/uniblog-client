import { TCreateMLDto } from '../common/types/request';
import { TMLImageDto } from '../common/types/request/multilink.dto';

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

  create(multilink: TCreateMLDto, images?: TMLImageDto[], logo?: File) {
    const formData = new FormData();
    formData.append('name', multilink.name);
    formData.append('background', multilink.background);
    multilink.content.forEach((content, i) => {
      formData.append(`content[${i}]`, JSON.stringify(content));
    });
    images?.forEach((image, i) => {
      formData.append(`order${image.order}`, image.file);
    });
    logo && formData.append('logo', logo);
    return api.post(`multilink`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
