import React, {
  ChangeEvent,
  InputHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
  SelectHTMLAttributes,
} from 'react';

import { ID } from '../../../../common/constants';

import styles from './Select.module.scss';

type TDefaultRadioProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;
type TRadioProps<T> = TDefaultRadioProps & {
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
}: PropsWithChildren<TRadioProps<TValue>>) => {
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
