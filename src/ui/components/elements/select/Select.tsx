import React, {
  ChangeEvent,
  DetailedHTMLProps,
  PropsWithChildren,
  SelectHTMLAttributes,
} from 'react';

import { ID } from '../../../../common/constants';

import styles from './Select.module.scss';

type TDefaultSelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;
type TSelectProps<T> = TDefaultSelectProps & {
  options?: Array<T>;
  titles?: Array<string>;
  onChangeOption?: (option: T) => void;
};
export const Select = <TValue extends string>({
  name,
  titles,
  options,
  value,
  className,
  onChange,
  onChangeOption,
  children,
  ...restProps
}: PropsWithChildren<TSelectProps<TValue>>) => {
  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange && onChange(e);
    onChangeOption && onChangeOption(e.currentTarget.value as TValue);
  };

  const mappedOptions = options ? options.map((o, i) => <option key={ID[i]}>{o}</option>) : [];

  return (
    <div>
      <select className={styles.sel} onChange={onChangeCallback}>
        {mappedOptions}
      </select>
    </div>
  );
};
