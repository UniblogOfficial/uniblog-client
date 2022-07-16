import { CSSProperties } from 'react';

const getTranslateY = (transform: string | undefined) => {
  if (transform) {
    const coordinates = /\(([^)]+)\)/.exec(transform);

    if (coordinates) {
      return coordinates[1].split(', ')[1];
    }
  }
  return '0';
};
export const getDraggedBlockStyle = (isDragging: boolean, style: CSSProperties | undefined) => ({
  ...style,
  boxShadow: isDragging ? '0 0 20px black' : '',
  transform: `translate(0, ${getTranslateY(style?.transform)})`,
});
