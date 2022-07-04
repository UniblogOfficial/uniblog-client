import React, { FC } from 'react';

import { Draggable } from 'react-beautiful-dnd';

import { getStyle } from 'common/utils/ui';
import { DragButton } from 'ui/components/elements/DragButton/DragButton';

type WrapperDragProps = {
  id: string;
  index: number;
  isVisible: boolean;
};

export const WrapperDrag: FC<WrapperDragProps> = ({ id, index, isVisible, children }) => {
  if (!isVisible) {
    return <>{children}</>;
  }
  return (
    <Draggable draggableId={id} index={index}>
      {({ draggableProps, innerRef, dragHandleProps }, { isDragging }) => (
        <div
          ref={innerRef}
          {...draggableProps}
          {...dragHandleProps}
          style={getStyle(isDragging, draggableProps.style)}>
          <div style={{ position: 'relative' }}>
            <DragButton />
            {children}
          </div>
        </div>
      )}
    </Draggable>
  );
};
