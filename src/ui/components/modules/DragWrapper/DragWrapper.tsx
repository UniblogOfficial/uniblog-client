import React, { FC } from 'react';

import { Draggable } from 'react-beautiful-dnd';

import { getStyle } from 'common/utils/ui';
import { DragButton } from 'ui/components/elements/DragButton/DragButton';

type WrapperDragProps = {
  id: string;
  index: number;
};

export const WrapperDrag: FC<WrapperDragProps> = ({ id, index, children }) => (
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
