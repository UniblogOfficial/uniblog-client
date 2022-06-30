import React from 'react';

import ReactDOM from 'react-dom';

import { ArrowNavSpritesMap } from './ArrowNavSpritesMap';
import { AuthSpritesMap } from './AuthSpritesMap';
import { BrandSpritesMap } from './BrandSpritesMap';
import { CommerceSpritesMap } from './CommerceSpritesMap';
import { CommonUISpritesMap } from './CommonUISpritesMap';
import { CRUDSpritesMap } from './CRUDSpritesMap';
import { EditTextUISpritesMap } from './EditTextUISpritesMap';
import { FeatureSpritesMap } from './FeatureSpritesMap';
import { FilterSpritesMap } from './FilterSpritesMap';
import { LayoutSpritesMap } from './LayoutSpritesMap';
import { MiscSpritesMap } from './MiscSpritesMap';

export const SpritesMap = () => {
  const sprites = (
    <>
      <ArrowNavSpritesMap />
      <FilterSpritesMap />
      <CommonUISpritesMap />
      <EditTextUISpritesMap />
      <AuthSpritesMap />
      <FeatureSpritesMap />
      <CommerceSpritesMap />
      <LayoutSpritesMap />
      <CRUDSpritesMap />
      <BrandSpritesMap />
      <MiscSpritesMap />
    </>
  );
  const container = document.getElementById('sprite-root');
  return container && ReactDOM.createPortal(sprites, container);
};
