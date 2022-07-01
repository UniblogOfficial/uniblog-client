import React, { FC } from 'react';

import { Draggable, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';

import { DragButton } from 'ui/components/elements/DragButton/DragButton';

type WrapperDragProps = {
  id: string;
  index: number;
};

const getStyle = (isDragging: boolean, style: DraggingStyle | NotDraggingStyle | undefined) => ({
  ...style,
  left: 0,
  boxShadow: isDragging ? '0 0 20px black' : '',
});

export const WrapperDrag: FC<WrapperDragProps> = ({ id, index, children }) => (
  <Draggable draggableId={id} index={index}>
    {(providedDraggable, snapshotDraggable) => (
      <div
        {...providedDraggable.draggableProps}
        style={getStyle(snapshotDraggable.isDragging, providedDraggable.draggableProps.style)}
        {...providedDraggable.dragHandleProps}
        ref={providedDraggable.innerRef}>
        <div style={{ position: 'relative' }}>
          <DragButton />
          {children}
        </div>
      </div>
    )}
  </Draggable>
);
