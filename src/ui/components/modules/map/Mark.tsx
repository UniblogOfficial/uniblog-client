import React, { ReactElement } from 'react';

import { LatLngTuple } from 'leaflet';
import { Marker, useMap } from 'react-leaflet';

import { Nullable } from 'common/types/instance';

type MarkProps = {
  position: Nullable<LatLngTuple>;
};

export const Mark = ({ position }: MarkProps): Nullable<ReactElement> => {
  const map = useMap();

  if (position === null) {
    return null;
  }
  map.flyTo(position, map.getZoom());

  return <Marker position={position} />;
};
