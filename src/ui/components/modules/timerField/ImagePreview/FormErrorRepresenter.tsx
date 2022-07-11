import React, { FC } from 'react';

const ShowError: FC<{ error: any; touched: boolean }> = ({ error, touched }) =>
  touched && error ? (
    <div>
      {/* <img src={info} alt="info" /> */}
      {error}
    </div>
  ) : null;

export default ShowError;
