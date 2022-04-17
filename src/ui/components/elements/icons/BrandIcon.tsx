import React, {
  DetailedHTMLProps,
  SVGAttributes,
  MouseEvent,
  FC,
  useCallback,
  useRef,
  CSSProperties,
} from 'react';

import { TBrandIconName } from '../../modules/iconSpritesMaps/BrandSpritesMap';

type TDefaulSVGProps = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>;

type TBrandIconProps = TDefaulSVGProps & {
  name: TBrandIconName;
  title?: string;
  className?: string; // for colors
  containerClassName?: string; // for transitions, rotating etc
  side?: 'right' | 'left';
  size?: 'reduced' | 'full' | 'max'; // reduced is full divided by sqrt(2) for proper rotating anims and/or nesting, max is full*1.05
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  rotate?: 1 | 2 | 3 | 4; // 0 90 180 270 deg
  active?: boolean; // for icon button variant
  color?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
};

export const BrandIcon: FC<TBrandIconProps> = ({
  name,
  title,
  className,
  containerClassName,
  side = 'left',
  size = 'reduced',
  rotate = 1,
  active = true,
  color,
  onClick,
}) => {
  const getContainerStyle = useCallback(() => {
    const style = `icon-container ${containerClassName || ''}`;
    switch (side) {
      case 'right':
        return `${style} _right`;
      case 'left':
        return `${style} _left`;
      default:
        return `${style} _left`;
    }
  }, [side, containerClassName]);

  const onClickHandler = (e: MouseEvent<HTMLElement>) => {
    active && onClick && onClick(e);
  };

  const ref = useRef(null as unknown as SVGSVGElement);

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
    <div className={`${getContainerStyle()}`} onClick={onClickHandler}>
      <div style={rotated()} className="icon__rotate">
        <svg ref={ref} fill={color} className={`icon icon-${name} ${className} ${size}`}>
          {title && <title>{title}</title>}
          <use id={`${name}`} xlinkHref={`#${name}`} />
        </svg>
      </div>
    </div>
  );
};
