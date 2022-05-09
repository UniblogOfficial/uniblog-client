import { TCreateMLDto } from '../common/types/request';
import { TMLImageDto } from '../common/types/request/multilink.dto';

import { api } from './api';

export const multilinkAPI = {
  get(name: string, id?: string) {
    return api.get(`multilink/${name}`).then(response => ({ data: response.data }));
    // temporary server response data inconsistency
    // .then(response => ({ data: response.data.data, info: response.data.info }));
  },

  create(multilink: TCreateMLDto, images?: TMLImageDto[]) {
    const formData = new FormData();
    formData.append('name', multilink.name);
    formData.append('background', multilink.background);
    multilink.template.forEach((part, i) => {
      formData.append(`template[${i}]`, part.toString());
    });
    multilink.content.forEach((content, i) => {
      formData.append(`content[${i}]`, JSON.stringify(content));
    });
    images?.forEach((image, i) => {
      formData.append(`order${image.order}`, image.file);
    });

    return api.post(`multilink`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
