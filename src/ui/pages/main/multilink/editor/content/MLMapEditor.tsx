import React from 'react';

import { LatLngLiteral } from 'leaflet';

import { setMLDraftBlockContent } from 'bll/reducers';
import { useAppDispatch } from 'common/hooks';
import { IMLDraftMap } from 'common/types/instance';
import { Map } from 'ui/components/modules/map/Map';

type TMLMapEditorProps = {
  order: number;
  block: IMLDraftMap;
};

const CENTER_MAP: LatLngLiteral = { lat: 51.505, lng: -0.09 };
const ZOOM_MAP = 13;

export const MLMapEditor = ({ order, block }: TMLMapEditorProps) => {
  const dispatch = useAppDispatch();

  const centerMap = block.latLng ? block.latLng : CENTER_MAP;
  const isSearchLocation = block.latLng === null;
  const copyBlock = { ...block };

  const setPositionMark = (position: LatLngLiteral) => {
    copyBlock.latLng = position;
    dispatch(setMLDraftBlockContent({ content: copyBlock, order }));
  };

  if (!block) return <p>Error: Block not found</p>;

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
      <Map
        center={centerMap}
        zoom={ZOOM_MAP}
        positionMark={copyBlock.latLng}
        setPositionMark={setPositionMark}
        isEditor
        isSearchLocation={isSearchLocation}
      />
    </div>
  );
};
