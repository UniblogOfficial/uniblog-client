import React, { ReactElement, useEffect, useState } from 'react';

import { LatLngTuple } from 'leaflet';
import { Marker, useMapEvents } from 'react-leaflet';

import { Nullable } from 'common/types/instance';

type EditableMarkProps = {
  position: Nullable<LatLngTuple>;
  setPositionMark: (position: LatLngTuple) => void;
  isSearchLocation?: boolean;
};

export const EditableMark = ({
  setPositionMark,
  position,
  isSearchLocation,
}: EditableMarkProps): Nullable<ReactElement> => {
  const [mark, setMark] = useState<Nullable<LatLngTuple>>(position);

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
    if (isSearchLocation) {
      map.locate();
    }
  }, []);

  if (mark === null) {
    return null;
  }

  return <Marker position={mark} />;
};
