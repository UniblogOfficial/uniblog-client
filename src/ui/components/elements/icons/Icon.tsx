import React, {
  FC,
  useCallback,
  useEffect,
  useRef,
  MouseEvent,
  SVGAttributes,
  DetailedHTMLProps,
  CSSProperties,
} from 'react';

import { TIconName } from '../../modules/iconSpritesMaps/IconSpritesMap';

type TDefaulSVGProps = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>;

type TIconProps = TDefaulSVGProps & {
  name: TIconName;
  id?: string;
  className?: string; // for colors
  containerClassName?: string; // for transitions, rotating etc
  side?: 'right' | 'left';
  size?: 'reduced' | 'full' | 'max'; // reduced is full divided by sqrt(2) for proper rotating anims and/or nesting, max is full*1.05
  width?: 'normal' | 'wide' | 'narrow';
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  rotate?: 1 | 2 | 3 | 4; // 0 90 180 270 deg
  active?: boolean; // for icon button variant
  primaryColor?: string;
  secondaryColor?: string;
  primaryOpacity?: string;
  secondaryOpacity?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
};

export const Icon: FC<TIconProps> = ({
  name,
  id,
  className,
  containerClassName,
  side = 'left',
  size = 'reduced',
  width = 'normal',
  rotate = 1,
  active = true,
  primaryColor,
  secondaryColor,
  primaryOpacity,
  secondaryOpacity,
  onClick,
}) => {
  const getContainerStyle = useCallback(() => {
    let style = `icon-container ${containerClassName || ''}`;
    switch (side) {
      case 'right':
        style = `${style} _right`;
        break;
      case 'left':
        style = `${style} _left`;
        break;
      // no default
    }
    switch (width) {
      case 'wide':
        style = `${style} _wide`;
        break;
      case 'narrow':
        style = `${style} _narrow`;
        break;
      // no default
    }
    return style;
  }, [side, width, containerClassName]);

  const onClickHandler = (e: MouseEvent<HTMLElement>) => {
    active && onClick && onClick(e);
  };

  const ref = useRef(null as unknown as SVGSVGElement);
  useEffect(() => {
    if (primaryColor && secondaryColor) {
      ref && ref.current.style.setProperty('--primary', primaryColor);
      ref && ref.current.style.setProperty('--secondary', secondaryColor);
    }
    if (primaryOpacity && secondaryOpacity) {
      ref && ref.current.style.setProperty('--primary-opacity', primaryOpacity);
      ref && ref.current.style.setProperty('--secondary-opacity', secondaryOpacity);
    }
  }, [primaryColor, secondaryColor, primaryOpacity, secondaryOpacity]);

  const rotated = useCallback((): CSSProperties => {
    switch (rotate) {
      case 1:
        return {};
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      case 2:
        return { transform: `rotate(90deg)` };
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      case 3:
        return { transform: `rotate(180deg)` };
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      case 4:
        return { transform: `rotate(270deg)` };
      // no default
    }
  }, [rotate]);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div id={id} className={`${getContainerStyle()}`} onClick={onClickHandler}>
      <div style={rotated()} className="icon__rotate">
        <svg ref={ref} className={`icon icon-${name} ${className} ${size}`}>
          <use id={`${name}`} xlinkHref={`#${name}`} />
        </svg>
      </div>
    </div>
  );
};
