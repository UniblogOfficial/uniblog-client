import React from 'react';

import { LatLngTuple } from 'leaflet';

import { MLDraftMap } from 'common/types/instance';
import { px } from 'common/utils/ui';
import { Map } from 'ui/components/modules/map/Map';

type TMLMapProps = {
  id: string;
  block: MLDraftMap;
  callback?: <T>(payload: T) => void;
};

const CENTER_MAP: LatLngTuple = [51.505, -0.09];
const ZOOM_MAP = 13;

export const MLMap = ({ id, block, callback }: TMLMapProps) => {
  const { latLng, margin, padding, type, background } = block;

  const className = callback ? 'interactive' : undefined;
  const centerMap = latLng || CENTER_MAP;
  const positionMark = latLng || null;

  return (
    <section
      className={className}
      style={{
        padding: px(padding) ?? '0',
        margin: px(margin) ?? '0',
        background,
      }}>
      {callback && <input type="button" data-type={type} data-id={id} onClick={callback} />}

      <Map center={centerMap} zoom={ZOOM_MAP} isEditor={false} positionMark={positionMark} />
    </section>
  );
};
