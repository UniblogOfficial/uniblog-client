import React from 'react';

import { LatLngLiteral } from 'leaflet';

import { setMLDraftBlockContent } from 'bll/reducers';
import { useAppDispatch } from 'common/hooks';
import { IMLDraftMap, Nullable } from 'common/types/instance';
import { Map } from 'ui/components/modules/map/Map';

type TMLMapEditorProps = {
  order: number;
  block: IMLDraftMap;
};

const CENTER_MAP: LatLngLiteral = { lat: 51.505, lng: -0.09 };
const ZOOM_MAP = 13;

export const MLMapEditor = ({ order, block }: TMLMapEditorProps) => {
  const dispatch = useAppDispatch();

  if (!block) return <p>Error: Block not found</p>;

  const setPositionMark = (position: LatLngLiteral) => {
    block.latLng = position;
    dispatch(setMLDraftBlockContent(block, order, 'mapBlocks'));
  };

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
      {block.url && (
        <Map
          center={CENTER_MAP}
          zoom={ZOOM_MAP}
          positionMark={block.latLng}
          setPositionMark={setPositionMark}
          isEditor
        />
      )}
    </div>
  );
};
