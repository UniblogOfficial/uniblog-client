import React, { ReactElement } from 'react';

import { LatLngLiteral } from 'leaflet';
import { Marker, useMap } from 'react-leaflet';

import { Nullable } from 'common/types/instance';

type MarkProps = {
  position: Nullable<LatLngLiteral>;
};

export const Mark = ({ position }: MarkProps): Nullable<ReactElement> => {
  const map = useMap();

  if (position === null) {
    return null;
  }
  map.flyTo(position, map.getZoom());

  return <Marker position={position} />;
};
