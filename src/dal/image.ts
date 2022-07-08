import { TImageFile } from 'common/types/instance';
import { api } from 'dal';

export const imageAPI = {
  save(file: TImageFile) {
    const formData = new FormData();
    const filename = file.name.split('.')[0];
    console.log(filename);

    if (!/[A-Za-z]+-\d+-\d+/.test(filename)) {
      // must be like "logo-0-1"
      throw new Error('Invalid file name pattern');
    }
    formData.append('image', file.file, filename);
    return api
      .post('image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => ({ data: response.data.data, message: response.data.message }));
  },
};
