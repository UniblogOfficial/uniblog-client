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
  options?: string[];
  titles?: Array<string>;
  selectedValue?: string;
  onChangeOption?: (option: T) => void;
};
export const Select = <TValue extends string>({
  name,
  titles,
  options,
  selectedValue,
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

  const mappedOptions = options
    ? options.map((o, i) => (
        <option key={ID[i]} style={{ fontFamily: `${o}` }}>
          {o}
        </option>
      ))
    : [];

  return (
    <select value={selectedValue ?? ''} className={styles.sel} onChange={onChangeCallback}>
      {mappedOptions}
    </select>
  );
};
