import React, { ReactElement, useEffect, useState } from 'react';

import { LatLngLiteral } from 'leaflet';
import { Marker, useMapEvents } from 'react-leaflet';

import { Nullable } from 'common/types/instance';

export const Mark = (): Nullable<ReactElement> => {
  const [mark, setMark] = useState<Nullable<LatLngLiteral>>(null);

  const map = useMapEvents({
    click(e) {
      setMark(e.latlng);
    },

    locationfound(e) {
      setMark(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    map.locate();
  }, []);

  if (mark === null) {
    return null;
  }

  return <Marker position={mark} />;
};
