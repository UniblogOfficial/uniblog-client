import React from 'react';

import { IMLDraftContentLogo, Nullable } from '../../../../../common/types/instance';
import { parseRawImage } from '../../../../../common/utils/ui';

type TMLLogoProps = {
  block: Nullable<IMLDraftContentLogo>;
  callback?: <T>(payload: T) => void;
};

export const MLLogo = ({ block, callback }: TMLLogoProps) => {
  if (!block) return null;
  const className = callback ? 'interactive' : undefined;
  return (
    <section className={className}>
      {callback && (
        <input type="button" data-type={block.type} data-order={block.order} onClick={callback} />
      )}
      <div
        className="ml-logo"
        style={{ height: block.size ?? '100px', width: block.size ?? '100px' }}>
        <img src={parseRawImage(block.image)} alt="logo" />
      </div>
    </section>
  );
};
