import React from 'react';

import { IMLDraftMap, Nullable } from 'common/types/instance';
import { Map } from 'ui/components/modules/map/Map';

type TMLMapEditorProps = {
  order: number;
  block: Nullable<IMLDraftMap>;
};

export const MLMapEditor = ({ order, block }: TMLMapEditorProps) => {
  if (!block) return <p>Error: Block not found</p>;

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
      {block.url && <Map />}
    </div>
  );
};
