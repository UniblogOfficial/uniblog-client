/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from 'react';

import { Redirect } from 'react-router-dom';

import { ArrowNavSpritesMap } from '../../../components/modules/iconSpritesMaps/ArrowNavSpritesMap';
import { AuthSpritesMap } from '../../../components/modules/iconSpritesMaps/AuthSpritesMap';
import { BrandSpritesMap } from '../../../components/modules/iconSpritesMaps/BrandSpritesMap';
import { CommerceSpritesMap } from '../../../components/modules/iconSpritesMaps/CommerceSpritesMap';
import { CommonUISpritesMap } from '../../../components/modules/iconSpritesMaps/CommonUISpritesMap';
import { CRUDSpritesMap } from '../../../components/modules/iconSpritesMaps/CRUDSpritesMap';
import { CurrencySpritesMap } from '../../../components/modules/iconSpritesMaps/CurrencySpritesMap';
import { FeatureSpritesMap } from '../../../components/modules/iconSpritesMaps/FeatureSpritesMap';
import { FilterSpritesMap } from '../../../components/modules/iconSpritesMaps/FilterSpritesMap';
import { IconSpritesMap } from '../../../components/modules/iconSpritesMaps/IconSpritesMap';
import { LayoutSpritesMap } from '../../../components/modules/iconSpritesMaps/LayoutSpritesMap';
import { LocalizationSpritesMap } from '../../../components/modules/iconSpritesMaps/LocalizationSpritesMap';
import { MiscSpritesMap } from '../../../components/modules/iconSpritesMaps/MiscSpritesMap';

// import styles from './TestPage.module.scss';

const toJSX = (iconSprite: HTMLElement) => {
  const icons: Array<JSX.Element> = [];
  const ids: Array<string> = [];
  const svgElements = iconSprite.querySelectorAll('symbol');
  svgElements.forEach(i => {
    icons.push(
      <div
        key={`${i.id}`}
        className="icon test"
        style={{
          display: 'inline-block',
          verticalAlign: 'top',
          width: '70px',
          margin: '10px',
        }}>
        <div className="icon__container test">
          <svg
            className="icon__svg test"
            onClick={() => console.log('click')}
            style={{ width: '50px', height: '50px', margin: '0 10px' }}
            name={`${i.id}`}>
            <use id={`${i.id}`} xlinkHref={`#${i.id}`} />
          </svg>
        </div>
        <div style={{ fontSize: '70%' }}>{`${i.id}`}</div>
      </div>,
    );
    ids.push(`"${i.id}"`);
  });
  console.log(`${iconSprite.id} icons: ${svgElements.length}`);
  console.log(`${iconSprite.id} ids: ${ids}`);
  console.log('--------------------------------');
  return icons;
};

export const TestPage = () => {
  const [iconIds, setIconIds] = useState<string[]>([]);
  const [allIcons, setAllIcons] = useState<Array<JSX.Element>>([]);

  const [navIcons, setNavIcons] = useState<Array<JSX.Element>>([]);
  const [authIcons, setAuthIcons] = useState<Array<JSX.Element>>([]);
  const [filterIcons, setFilterIcons] = useState<Array<JSX.Element>>([]);
  const [commerceIcons, setCommerceIcons] = useState<Array<JSX.Element>>([]);
  const [uiIcons, setUIIcons] = useState<Array<JSX.Element>>([]);
  const [featureIcons, setFeatureIcons] = useState<Array<JSX.Element>>([]);
  const [localizationIcons, setLocalizationIcons] = useState<Array<JSX.Element>>([]);
  const [crudIcons, setCRUDIcons] = useState<Array<JSX.Element>>([]);
  const [layoutIcons, setLayoutIcons] = useState<Array<JSX.Element>>([]);
  const [currencyIcons, setCurrencyIcons] = useState<Array<JSX.Element>>([]);
  const [brandIcons, setBrandIcons] = useState<Array<JSX.Element>>([]);
  const [miscIcons, setMiscIcons] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    const navArrowsMap = document.getElementById('nav-arrows');
    const authIconsMap = document.getElementById('auth-icons');
    const filterIconsMap = document.getElementById('filter-icons');
    const commerceIconsMap = document.getElementById('commerce-icons');
    const uiIconsMap = document.getElementById('ui-icons');
    const featureIconsMap = document.getElementById('feature-icons');
    const localizationIconsMap = document.getElementById('localization-icons');
    const crudIconsMap = document.getElementById('crud-icons');
    const layoutIconsMap = document.getElementById('layout-icons');
    const currencyIconsMap = document.getElementById('currency-icons');
    const brandIconsMap = document.getElementById('brand-icons');
    const miscIconsMap = document.getElementById('misc-icons');

    navArrowsMap && setNavIcons(toJSX(navArrowsMap));
    authIconsMap && setAuthIcons(toJSX(authIconsMap));
    filterIconsMap && setFilterIcons(toJSX(filterIconsMap));
    commerceIconsMap && setCommerceIcons(toJSX(commerceIconsMap));
    uiIconsMap && setUIIcons(toJSX(uiIconsMap));
    featureIconsMap && setFeatureIcons(toJSX(featureIconsMap));
    localizationIconsMap && setLocalizationIcons(toJSX(localizationIconsMap));
    crudIconsMap && setCRUDIcons(toJSX(crudIconsMap));
    layoutIconsMap && setLayoutIcons(toJSX(layoutIconsMap));
    currencyIconsMap && setCurrencyIcons(toJSX(currencyIconsMap));
    miscIconsMap && setMiscIcons(toJSX(miscIconsMap));
    brandIconsMap && setBrandIcons(toJSX(brandIconsMap));
  }, []);

  if (process.env.REACT_APP_MODE !== 'development') {
    return <Redirect to="/404" />;
  }
  return (
    <div>
      <IconSpritesMap />
      <ArrowNavSpritesMap />
      <AuthSpritesMap />
      <CommerceSpritesMap />
      <CommonUISpritesMap />
      <CRUDSpritesMap />
      <CurrencySpritesMap />
      <FeatureSpritesMap />
      <FilterSpritesMap />
      <LayoutSpritesMap />
      <LocalizationSpritesMap />
      <MiscSpritesMap />
      <BrandSpritesMap />
      <main style={{ display: 'flex', flexDirection: 'column', padding: '50px' }}>
        <h2 style={{ textAlign: 'center' }}>All</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>{iconIds}</div>
        <hr />
        <h2 style={{ textAlign: 'center' }}>Navigation Arrows</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>{navIcons}</div>
        <h2 style={{ textAlign: 'center' }}>Authentication Icons</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>{authIcons}</div>
        <h2 style={{ textAlign: 'center' }}>Commerce Icons</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>{commerceIcons}</div>
        <h2 style={{ textAlign: 'center' }}>Common UI Icons</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>{uiIcons}</div>
        <h2 style={{ textAlign: 'center' }}>Data Manipulations Icons</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>{crudIcons}</div>
        <h2 style={{ textAlign: 'center' }}>Currency Icons</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>{currencyIcons}</div>
        <h2 style={{ textAlign: 'center' }}>Feature Icons</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>{featureIcons}</div>
        <h2 style={{ textAlign: 'center' }}>Filter Icons</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>{filterIcons}</div>
        <h2 style={{ textAlign: 'center' }}>Layout Toggle Icons</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>{layoutIcons}</div>
        <h2 style={{ textAlign: 'center' }}>Languages and Regions Icons</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>{localizationIcons}</div>
        <h2 style={{ textAlign: 'center' }}>Miscellaneous Icons</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>{miscIcons}</div>
        <h2 style={{ textAlign: 'center' }}>Brand Icons</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>{brandIcons}</div>
      </main>
    </div>
  );
};
/* useEffect(() => {
  const nested = document.querySelector('use');
  if (nested && iconIds.length === 0) {
    const toJSX = (iconSprite: HTMLElement) => {
      const icons: Array<JSX.Element> = [];
      const names: Array<string> = [];
      const svgElements = iconSprite.querySelectorAll('symbol');
      console.log(`${iconSprite.id} icons: ${svgElements.length}`);
      console.log(`excluding brand icons!`);
      const alreadyNested = document.getElementsByTagName('use');
      // let alreadyNested = document.getElementsByTagName("symbol")
      console.log('--------------------------------');
      console.log('already nested:');

      svgElements.forEach(i => {
        let nestedFlag = false;

        for (let j = 0; j < alreadyNested.length; j++) {
          if (i.id === alreadyNested[j].id) {
            console.log(`${i.id}`);
            nestedFlag = true;
          }
        }
        let className = 'icon test';
        if (nestedFlag) {
          className = `${className} dimmed`;
        }
        names.push(i.id);
        icons.push(
          <div
            key={`${i.id}`}
            className={className}
            style={{
              display: 'inline-block',
              verticalAlign: 'top',
              width: '70px',
              margin: '10px',
            }}>
            <div className="icon__container test">
              <svg
                className={`icon-${i.id} test`}
                style={{ width: '50px', height: '50px', margin: '10px' }}
                name={`${i.id}`}>
                <use id={`${i.id}`} xlinkHref={`#${i.id}`} />
              </svg>
            </div>
            <div style={{ fontSize: '70%' }}>{`${i.id}`}</div>
          </div>,
        );
      });
      console.log(names.slice(50, names.length));

      return icons;
    };
    const mainMap = document.getElementById('main-sprite');
    mainMap && setIconIds(toJSX(mainMap));
  }
}, [iconIds.length, navIcons]); */
