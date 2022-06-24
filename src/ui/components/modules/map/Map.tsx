import React, { ReactElement } from 'react';

import 'ui/components/modules/map/Map.scss';
import { Icon, LatLngLiteral } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';

import { Mark } from 'ui/components/modules/map/Mark';

const CENTER_MAP: LatLngLiteral = { lat: 51.505, lng: -0.09 };
const ZOOM_MAP = 13;

Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.8.0/dist/images/';

export const Map = (): ReactElement => (
  <div style={{ width: '100%', height: '100%' }}>
    <MapContainer center={CENTER_MAP} zoom={ZOOM_MAP} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Mark />
    </MapContainer>
  </div>
);
