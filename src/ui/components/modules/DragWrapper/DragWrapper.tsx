import React, { FC } from 'react';

import { Draggable } from 'react-beautiful-dnd';

import { DragButton } from './dragButton/DragButton';

import { getStyle } from 'common/utils/ui';

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
          style={getStyle(isDragging, draggableProps.style)}>
          <div style={{ position: 'relative' }}>
            <DragButton />
            {children}
          </div>
        </section>
      )}
    </Draggable>
  );
};
