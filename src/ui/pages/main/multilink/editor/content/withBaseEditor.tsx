import React, { FC } from 'react';

import { MLBaseEditor, TMLBaseEditorProps } from './MLBaseEditor';

import { Nullable } from 'common/types/instance';

export const withBaseEditor =
  <T, TProps extends TMLBaseEditorProps<T>>(props: TProps) =>
  (WrappedComponent: Nullable<FC<TProps>>) =>
    (
      <MLBaseEditor {...props}>
        {WrappedComponent ? <WrappedComponent {...props} /> : <>Block editor not implemented</>}
      </MLBaseEditor>
    );
