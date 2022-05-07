import { TCreateMLDto } from '../common/types/request';

import { api } from './api';

export const multilinkAPI = {
  get(name: string, id?: string) {
    return api.get(`multilink/${name}`).then(response => ({ data: response.data }));
    // temporary server response data inconsistency
    // .then(response => ({ data: response.data.data, info: response.data.info }));
  },

  create(multilink: TCreateMLDto) {},
};
