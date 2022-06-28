import { Nullable } from '..';

import { IMLDraftContent, MLDraftBlock } from './abstract/mlBlock.class';

import { MLContentType } from 'common/constants';

export interface IMLDraftMap extends Omit<IMLDraftContent, 'borderRadius'> {
  url: Nullable<string>;
  latLng: Nullable<[number, number]>;
  latitude?: number;
  longitude?: number;
}

export class MLDraftMap extends MLDraftBlock<MLContentType.MAP> implements IMLDraftMap {
  type: MLContentType.MAP = MLContentType.MAP;
  url: Nullable<string>;
  latLng: Nullable<[number, number]>;
  latitude?: number;
  longitude?: number;
  constructor(props: IMLDraftMap) {
    super(props);
    this.url = props.url;
    this.latLng = props.latLng;
    this.latitude = props.latitude;
    this.longitude = props.longitude;
  }
}
