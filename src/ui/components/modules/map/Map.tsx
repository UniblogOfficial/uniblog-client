import React, { ReactElement } from 'react';

import 'ui/components/modules/map/Map.scss';
import { Icon, LatLngLiteral } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';

import { EditableMark } from './EditableMark';
import { Mark } from './Mark';

import { Nullable } from 'common/types/instance';

type MapProps = {
  zoom: number;
  center: LatLngLiteral;
  isEditor: boolean;
  positionMark: Nullable<LatLngLiteral>;
  isSearchLocation?: boolean;
  setPositionMark?: (position: LatLngLiteral) => void;
};

Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.8.0/dist/images/';

export const Map = ({
  zoom,
  center,
  positionMark,
  isEditor,
  setPositionMark,
  isSearchLocation,
}: MapProps): ReactElement => (
  <div style={{ width: '100%', height: '100%' }}>
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {isEditor && setPositionMark ? (
        <EditableMark
          position={positionMark}
          setPositionMark={setPositionMark}
          isSearchLocation={isSearchLocation}
        />
      ) : (
        <Mark position={positionMark} />
      )}
    </MapContainer>
  </div>
);
