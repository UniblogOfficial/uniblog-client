import React from 'react';

import { ArrowNavSpritesMap } from './ArrowNavSpritesMap';
import { AuthSpritesMap } from './AuthSpritesMap';
import { BrandSpritesMap } from './BrandSpritesMap';
import { CommerceSpritesMap } from './CommerceSpritesMap';
import { CommonUISpritesMap } from './CommonUISpritesMap';
import { CRUDSpritesMap } from './CRUDSpritesMap';
import { FeatureSpritesMap } from './FeatureSpritesMap';
import { FilterSpritesMap } from './FilterSpritesMap';
import { LayoutSpritesMap } from './LayoutSpritesMap';
import { MiscSpritesMap } from './MiscSpritesMap';

export const SpritesMap = () => (
  <div>
    <ArrowNavSpritesMap />
    <FilterSpritesMap />
    <CommonUISpritesMap />
    <AuthSpritesMap />
    <FeatureSpritesMap />
    <CommerceSpritesMap />
    <LayoutSpritesMap />
    <CRUDSpritesMap />
    <BrandSpritesMap />
    <MiscSpritesMap />
  </div>
);
