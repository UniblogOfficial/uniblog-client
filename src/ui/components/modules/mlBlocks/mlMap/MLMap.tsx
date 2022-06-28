import React from 'react';

import { LatLngLiteral, LatLngTuple } from 'leaflet';
import { useSelector } from 'react-redux';

import { selectPositionMark } from 'bll/selectors';
import { TState } from 'bll/store';
import { IMLDraftMap, MLDraftMap } from 'common/types/instance';
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
  const position = useSelector((state: TState) => selectPositionMark(state, id, block.type));

  const className = callback ? 'interactive' : undefined;
  const centerMap = block.latLng ? block.latLng : CENTER_MAP;
  const positionMark = position ? position.latLng : null;

  return (
    <section
      className={className}
      style={{
        padding: px(block.padding) ?? '0',
        margin: px(block.margin) ?? '0',
        background: block.background,
      }}>
      {callback && <input type="button" data-type={block.type} data-id={id} onClick={callback} />}

      <Map center={centerMap} zoom={ZOOM_MAP} isEditor={false} positionMark={positionMark} />
    </section>
  );
};
