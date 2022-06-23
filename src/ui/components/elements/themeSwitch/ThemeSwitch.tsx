import React, { useRef, useEffect, useState } from 'react';

export const ThemeSwitch = ({ preserveRasters = true, storeKey = 'ThemeSwitch' }) => {
  const cssString = `
        html { filter: invert(85%); background: #fefefe; }
        * { background-color: inherit }
      `;
  const rasterButtonCss = 'Button:not([src*=".svg"]), [style*="url("] { filter: invert(100%) }';
  const rasterDivMLCss =
    'div.ml-template:not([src*=".svg"]), [style*="url("] { filter: invert(100%) }';
  const rasterUlMLCss =
    'ul.ml-template:not([src*=".svg"]), [style*="url("] { filter: invert(100%) }';
  const rasterImgCss =
    'img.invert:not([src*=".svg"]), video, [style*="url("] { filter: invert(100%) }';
  const rasterDivRadioCss =
    'div.Carousel_controls__dot__23yx5:not([src*=".svg"]), video, [style*="url("] { filter: invert(100%) }';
  const isDeclarationSupported = (property: string, value: string) => {
    const prop = `${property}:`;
    const el = document.createElement('test');
    const mStyle = el.style;
    el.style.cssText = prop + value;
    // @ts-ignore
    return mStyle[property];
  };
  const supported = useRef(!!isDeclarationSupported('filter', 'invert(100%)'));

  const [css, setCss] = useState<string>(cssString);
  const [active, setActive] = useState<boolean>(
    localStorage.getItem(storeKey) === 'true' ||
      (!localStorage.getItem(storeKey) && matchMedia('(prefers-color-scheme: dark)').matches),
  );

  useEffect(() => {
    if (preserveRasters) {
      setCss(
        `${cssString} ${rasterButtonCss} ${rasterDivMLCss} ${rasterUlMLCss} ${rasterImgCss} ${rasterDivRadioCss}`,
      );
    }
    return () => {
      setCss(cssString);
    };
  }, [preserveRasters, cssString]);

  useEffect(
    () =>
      // @ts-ignore
      localStorage.setItem(storeKey, active),
    [active, storeKey],
  );

  const toggle = () => {
    setActive((a: boolean) => !a);
  };

  const style = {
    backgroundColor: '#4040f2',
    border: '1px solid #4040f2',
    borderRadius: '7px 7px 7px 7px',
    marginBottom: '10px',
    color: 'white',
    padding: '13px 41px',
    width: '100%',
  };
  return (
    <>
      {supported.current && (
        <>
          <button type="button" aria-pressed={active} onClick={toggle}>
            <span style={style} aria-hidden="true">
              {active ? 'Темная  тема' : 'Светлая тема'}
            </span>
          </button>
          <style media={active ? 'screen' : 'none'}>{active ? css.trim() : css}</style>
        </>
      )}
    </>
  );
};
