import React, { FC } from 'react';

import info from '../../../../../../../img/temp1.png';

const ShowError: FC<{ error: any; touched: boolean }> = ({ error, touched }) =>
  touched && error ? (
    <div>
      <img src={info} alt="info" />
      {error}
    </div>
  ) : null;

export default ShowError;
