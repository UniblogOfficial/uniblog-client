import React, { ReactElement } from 'react';

import 'ui/components/modules/map/Map.scss';
import { Icon, LatLngTuple } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';

import { Nullable } from 'common/types/instance';
import { EditableMark } from 'ui/components/modules/map/EditableMark';
import { Mark } from 'ui/components/modules/map/Mark';

type MapProps = {
  center: LatLngTuple;
  zoom: number;
  positionMark: Nullable<LatLngTuple>;
  isEditor: boolean;
  setPositionMark?: (position: LatLngTuple) => void;
};

Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.8.0/dist/images/';

export const Map = ({
  zoom,
  center,
  positionMark,
  isEditor,
  setPositionMark,
}: MapProps): ReactElement => (
  <div style={{ width: '100%', height: '100%' }}>
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {isEditor && setPositionMark ? (
        <EditableMark setPositionMark={setPositionMark} />
      ) : (
        <Mark position={positionMark} />
      )}
    </MapContainer>
  </div>
);
