import React, { ChangeEvent, FC, useState } from 'react';

import { setMLDraftName } from 'bll/reducers';
import { useAppDispatch } from 'common/hooks';
import { Button, Icon } from 'ui/components/elements';

type TMLPreviewProps = {
  name: string; // multilink name
  username: string;
};

export const MLPreview: FC<TMLPreviewProps> = ({ name, username }) => {
  const dispatch = useAppDispatch();
  const [isValid, setIsValid] = useState(true);

  const onLinkClick = () => {
    window.open(`${process.env.REACT_APP_HOST_PRODUCTION}/${name || username}`, '_blank');
  };

  const onLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    // re for numbers and chars
    const re = /^[a-zA-Z0-9]+$/;
    if (re.test(e.target.value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    dispatch(setMLDraftName(e.target.value));
  };

  return (
    <>
      <div>
        <div className="paper-link">
          {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
          <span className="paper-link__host" role="link" onClick={onLinkClick}>
            {new URL(process.env.REACT_APP_HOST_PRODUCTION as string).hostname}/
          </span>
          <input
            className="paper-link__input"
            type="text"
            placeholder={username}
            maxLength={65}
            value={name}
            onChange={onLinkChange}
          />
          {/* Ну тут типа будет иконка показывающая валидна ссылка или нет */}
          <div className="paper-link__valid">{isValid ? 'v' : 'x'}</div>
        </div>
      </div>
    </>
  );
};
