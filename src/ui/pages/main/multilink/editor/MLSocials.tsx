import React, { FC } from 'react';

import { Button } from '../../../../components/elements';

type TMLSocialsProps = {
  setLink: (link: string) => void;
};

export const MLSocials: FC<TMLSocialsProps> = ({ setLink }) => (
  <>
    <h3 className="paper-title">Add your socials</h3>
    <div className="multilink-editor__constructor">
      <Button>Add</Button>
    </div>
  </>
);
