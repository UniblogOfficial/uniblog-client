import React from 'react';

import { LatLngTuple } from 'leaflet';

import { setMLDraftBlockContent } from 'bll/reducers';
import { useAppDispatch } from 'common/hooks';
import { MLDraftMap } from 'common/types/instance';
import { Map } from 'ui/components/modules/map/Map';

type TMLMapEditorProps = {
  id: string;
  block: MLDraftMap;
};

const CENTER_MAP: LatLngTuple = [51.505, -0.09];
const ZOOM_MAP = 13;

export const MLMapEditor = ({ id, block }: TMLMapEditorProps) => {
  const dispatch = useAppDispatch();

  const { type } = block;

  const setPositionMark = (latLng: LatLngTuple) => {
    dispatch(setMLDraftBlockContent({ content: { latLng }, id, type }));
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
