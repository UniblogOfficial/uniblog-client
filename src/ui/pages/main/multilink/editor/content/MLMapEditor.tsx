import React from 'react';

import { IMLDraftMap, Nullable } from 'common/types/instance';

type TMLMapEditorProps = {
  order: number;
  block: Nullable<IMLDraftMap>;
};

export const MLMapEditor = ({ order, block }: TMLMapEditorProps) => {
  if (!block) return <p>Error: Block not found</p>;

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
      {block.url && (
        <iframe
          style={{ border: '0', width: '400px', height: '300px' }}
          allowFullScreen
          loading="lazy"
          title="Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={block.url}
        />
      )}
    </div>
  );
};
