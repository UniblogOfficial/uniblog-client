import React from 'react';

import { IMLDraftContentSocial, Nullable } from '../../../../../common/types/instance';
import { px } from '../../../../../common/utils/ui';
import socials from '../../../../../img';

type TMLSocialProps = {
  block: Nullable<IMLDraftContentSocial>;
  callback?: <T>(payload: T) => void;
};

export const MLSocial = ({ block, callback }: TMLSocialProps) => {
  if (!block) return null;
  const className = callback ? 'interactive' : undefined;
  return (
    <section className={className} style={{ padding: px(block.padding) ?? '0' }}>
      {callback && (
        <input type="button" data-type={block.type} data-order={block.order} onClick={callback} />
      )}
      <ul className="ml-social">
        {block.icons.map(icon => {
          const data = socials.find(social => social.type === icon);
          return (
            <li key={icon}>
              <img src={data!.src} alt={data?.title} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
