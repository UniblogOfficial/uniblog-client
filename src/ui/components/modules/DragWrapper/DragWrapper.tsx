import React, { FC } from 'react';

import { Draggable } from 'react-beautiful-dnd';

import { DragButton } from './dragButton/DragButton';

import { getDraggedBlockStyle } from 'common/utils/ui/styleAssemblers';

type TDragWrapperProps = {
  id: string;
  index: number;
  isVisible: boolean;
};

export const DragWrapper: FC<TDragWrapperProps> = ({ id, index, isVisible, children }) => {
  if (!isVisible) {
    return <>{children}</>;
  }
  return (
    <Draggable draggableId={id} index={index}>
      {({ draggableProps, innerRef, dragHandleProps }, { isDragging }) => (
        <section
          ref={innerRef}
          {...draggableProps}
          {...dragHandleProps}
          style={getDraggedBlockStyle(isDragging, draggableProps.style)}>
          <div style={{ position: 'relative' }}>
            <DragButton />
            {children}
          </div>
        </section>
      )}
    </Draggable>
  );
};
