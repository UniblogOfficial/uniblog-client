import React, {
  ChangeEvent,
  InputHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from 'react';

import styles from './Radio.module.scss';

type TDefaultRadioProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
type TRadioProps<T> = TDefaultRadioProps & {
  options?: Array<T>;
  titles?: Array<string>;
  onChangeOption?: (option: T) => void;
};
export const Radio = <TValue extends string>({
  type,
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
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
    onChangeOption && onChangeOption(e.currentTarget.value as TValue);
  };

  const mappedOptions = options
    ? options.map((option, i) => (
        <li key={option}>
          <input
            id={option}
            type="radio"
            onChange={onChangeCallback}
            value={option}
            name={name}
            checked={option === value}
            className={styles.radio__input}
            {...restProps}
          />
          <label htmlFor={option}>
            <div className={styles.radio}>{children}</div>
            {titles ? titles[i] : option}
          </label>
        </li>
      ))
    : [];

  return (
    <ul className={className ? `${styles.radio__container} ${className}` : styles.radio__container}>
      {mappedOptions}
    </ul>
  );
};
