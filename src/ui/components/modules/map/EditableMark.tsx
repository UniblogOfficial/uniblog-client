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
      const { lng, lat } = e.latlng;
      setMark([lat, lng]);
      setPositionMark([lat, lng]);
    },

    locationfound(e) {
      const { lng, lat } = e.latlng;
      setMark([lat, lng]);
      setPositionMark([lat, lng]);
      map.flyTo([lat, lng], map.getZoom());
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
