import React, { ButtonHTMLAttributes, CSSProperties, DetailedHTMLProps } from 'react';

import css from './Button.module.scss';

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ExtraButtonPropsType = DefaultButtonPropsType & {
  mode?: 'text' | 'icon';
  style?: CSSProperties;
  variant?: 'ok' | 'ok__alt' | 'regular' | 'cancel' | 'active' | 'inactive' | 'disabled';
  backgroundImage?: boolean;
  orientation?: 'left' | 'center' | 'right';
};

export const Button: React.FC<ExtraButtonPropsType> = ({
  mode = 'text',
  variant,
  style,
  backgroundImage,
  className,
  orientation = 'center',
  ...restProps
}) => {
  let finalClassName = className || '';
  finalClassName =
    mode === 'text' ? `${css.button} ${finalClassName}` : `${css.iconButton} ${finalClassName}`;
  switch (variant) {
    case 'active':
      finalClassName = `${css.active} ${finalClassName}`;
      break;
    case 'inactive':
      finalClassName = `${css.inactive} ${finalClassName}`;
      break;
    case 'ok':
      finalClassName = `${css.ok} ${finalClassName}`;
      break;
    case 'ok__alt':
      finalClassName = `${css.ok__alt} ${finalClassName}`;
      break;
    case 'regular':
      finalClassName = `${css.regular} ${finalClassName}`;
      break;
    case 'cancel':
      finalClassName = `${css.cancel} ${finalClassName}`;
      break;
    case 'disabled':
      finalClassName = `${css.disabled} ${finalClassName}`;
      break;
    // no default
  }

  if (backgroundImage) {
    finalClassName = `${'backgroundImage'} ${finalClassName}`;
  }

  switch (mode) {
    case 'text':
      return (
        <button type="button" style={style && style} className={finalClassName} {...restProps} />
      );
    case 'icon':
      return (
        <button type="button" style={style && style} className={finalClassName} {...restProps} />
      );
    // no default
  }
};
