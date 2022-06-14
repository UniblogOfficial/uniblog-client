export type TRegisterDto = {
  // example: 'VasyaRaper', description: 'Unique(!) user name'
  name: string;

  // example: 'vasyaraper@gmail.com', description: 'User email'
  email: string;

  // example: 'qwerty123', description: 'User password', 'Must be more than 7 and less than 65 chars'
  password: string;
};

export type TLoginDto = {
  // example: 'vasyaraper@gmail.com', description: 'User email'
  email: string;

  // example: 'qwerty123', description: 'User password', 'Must be more than 7 and less than 65 chars'
  password: string;
};
