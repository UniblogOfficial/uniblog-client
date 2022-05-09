import React, { ChangeEvent, FC, useState } from 'react';

import { Button, Icon } from '../../../../../components/elements';

type TMLPreviewProps = {
  username: string;
};

export const MLPreview: FC<TMLPreviewProps> = ({ username }) => {
  const [userLink, setUserLink] = useState<string>('');
  const [isValid, setIsValid] = useState(true);

  const onLinkClick = () => {
    window.open(`${process.env.REACT_APP_HOST_PRODUCTION}/${userLink || username}`, '_blank');
  };

  const onLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    // re for numbers and chars
    const re = /^[a-zA-Z0-9]+$/;
    if (re.test(e.target.value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    setUserLink(e.target.value);
  };

  return (
    <>
      <div>
        <div className="paper-link">
          {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
          <div className="paper-link__host" role="link" onClick={onLinkClick}>
            {new URL(process.env.REACT_APP_HOST_PRODUCTION as string).hostname}/
          </div>
          <input
            className="paper-link__input"
            type="text"
            placeholder={username}
            maxLength={65}
            value={userLink}
            onChange={onLinkChange}
          />
          {/* Ну тут типа будет иконка показывающая валидна ссылка или нет */}
          <div className="paper-link__valid">{isValid ? 'v' : 'x'}</div>
        </div>
      </div>
    </>
  );
};
