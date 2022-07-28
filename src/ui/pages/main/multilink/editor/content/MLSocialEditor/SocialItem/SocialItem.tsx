import React, { ChangeEvent, useState } from 'react';

import styles from './SocialItem.module.scss';

type SocialItemPropsType = {
  socialNetwork: string;
  setLink: (index: number, link: string) => void;
  index: number;
};

export const SocialItem = ({ socialNetwork, setLink, index }: SocialItemPropsType) => {
  const [socNetwork, setSocNetwork] = useState<string>(socialNetwork);
  const [errorSocialNetwork, setSocialNetwork] = useState<string | null>('');
  const [socialNetworkTouch, setSocialNetworkTouch] = useState(false);

  const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSocNetwork(e.currentTarget.value);
    const objRE =
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    if (!objRE.test(String(e.currentTarget.value))) {
      setSocialNetwork('Invalid -URL');
    } else {
      setSocialNetwork('');
      setLink(index, e.currentTarget.value);
    }
  };

  const isEditMode = () => {
    setSocialNetworkTouch(true);
  };
  return (
    <div className={styles.socialItem}>
      <input
        value={socNetwork}
        type="text"
        name="email"
        placeholder="Enter your url"
        onChange={onChangeInputValue}
        onBlur={isEditMode}
        className={styles.socNetwork}
      />
      {socialNetworkTouch && errorSocialNetwork && (
        <div className={styles.errorSocialNetwork}>{errorSocialNetwork}</div>
      )}
    </div>
  );
};
