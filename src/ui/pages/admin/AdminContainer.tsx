import React from 'react';

import { Button } from 'ui/components/elements';

export const AdminContainer = () => {
  const onButtonClick = () => {
    const newWindow = document.open(
      `${
        process.env.REACT_APP_HOST_DEVELOPMENT ?? process.env.REACT_APP_HOST_PRODUCTION
      }/purchase?t=minus200bucksfromyouraccount`,
      '_blank',
      'width=777,height=666',
    );
  };
  return (
    <Button variant="regular" onClick={onButtonClick}>
      Click to purchase window test
    </Button>
  );
};
