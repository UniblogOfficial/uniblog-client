import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  PropsWithChildren,
} from 'react';

import styles from './Checkbox.module.scss';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
type TCheckboxProps<T> = DefaultInputPropsType & {
  boxClassName?: string;
  titleClassName?: string;

  onChangeChecked?: (checked: boolean, value: T) => void;
};

export const Checkbox = <TValue extends string>({
  name,
  type,
  disabled = false,
  onChange,
  onChangeChecked,
  className,
  titleClassName,
  alt,
  children,
  ...restProps
}: PropsWithChildren<TCheckboxProps<TValue>>) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeChecked && onChangeChecked(e.currentTarget.checked, e.currentTarget.value as TValue);
    onChange && onChange(e);
  };

  const box = `${styles.checkbox} ${className || ''}`;
  const title = `${styles.title} ${titleClassName || ''}`;

  return (
    <>
      <input
        type="checkbox"
        disabled={disabled}
        onChange={onChangeCallback}
        id={name}
        className={styles.input}
        {...restProps}
      />
      <label htmlFor={name}>
        <div className={box}>
          <div className={styles.icon}>
            <svg width="22px" height="22px" viewBox="0 0 18 18">
              <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z" />
              <polyline points="1 9 7 14 15 4"> </polyline>
            </svg>
          </div>
          {children && <div className={title}>{children}</div>}
        </div>
      </label>
    </>
  );
};
