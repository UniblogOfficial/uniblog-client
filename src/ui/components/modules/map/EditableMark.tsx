import React, { ReactElement, useEffect, useState } from 'react';

import { LatLngLiteral } from 'leaflet';
import { Marker, useMapEvents } from 'react-leaflet';

import { Nullable } from 'common/types/instance';

type EditableMarkProps = {
  setPositionMark: (position: LatLngLiteral) => void;
};

export const EditableMark = ({ setPositionMark }: EditableMarkProps): Nullable<ReactElement> => {
  const [mark, setMark] = useState<Nullable<LatLngLiteral>>(null);

  const map = useMapEvents({
    click(e) {
      setMark(e.latlng);

      setPositionMark(e.latlng);
    },

    locationfound(e) {
      setMark(e.latlng);
      setPositionMark(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    map.locate();
  }, [map]);

  if (mark === null) {
    return null;
  }

  return <Marker position={mark} />;
};
