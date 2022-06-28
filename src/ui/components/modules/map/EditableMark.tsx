import React, { ReactElement, useEffect, useState } from 'react';

import { LatLngTuple } from 'leaflet';
import { Marker, useMapEvents } from 'react-leaflet';

import { Nullable } from 'common/types/instance';

type EditableMarkProps = {
  setPositionMark: (position: LatLngTuple) => void;
};

export const EditableMark = ({ setPositionMark }: EditableMarkProps): Nullable<ReactElement> => {
  const [mark, setMark] = useState<Nullable<LatLngTuple>>(null);

  const map = useMapEvents({
    click(e) {
      setMark([e.latlng.lat, e.latlng.lng]);

      setPositionMark([e.latlng.lat, e.latlng.lng]);
    },

    locationfound(e) {
      setMark([e.latlng.lat, e.latlng.lng]);
      setPositionMark([e.latlng.lat, e.latlng.lng]);
      map.flyTo([e.latlng.lat, e.latlng.lng], map.getZoom());
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
