import React, {
  ChangeEvent,
  FocusEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEvent,
  forwardRef,
  ReactElement,
  TextareaHTMLAttributes,
  useRef,
  useEffect,
} from 'react';

type TDefaultTextareaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;
/* type TDefaultLabelProps = DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> */

type TTextareaProps = TDefaultTextareaProps & {
  onChangeText?: (value: string) => void;
  onChangeFocus?: (value: boolean) => void;
  onEnter?: () => void;
};

export const Textarea = (props: TTextareaProps) => {
  const {
    value,
    onChange,
    onChangeFocus,
    onFocus,
    onBlur,
    onChangeText,
    onKeyDown,
    onEnter,
    name,
    className,
    placeholder,
    ...restProps
  } = props;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const { scrollHeight } = textareaRef.current;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [value]);

  const onChangeCallback = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange && onChange(e);
    onChangeText && onChangeText(e.currentTarget.value);
  };
  const onKeyPressCallback = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    onKeyDown && onKeyDown(e);
    onEnter && e.key === 'Enter' && onEnter();
  };

  const onFocusCallback = (e: FocusEvent<HTMLTextAreaElement>, state: boolean) => {
    onFocus && onFocus(e);
    onChangeFocus && onChangeFocus(state);
  };
  const onBlurCallback = (e: FocusEvent<HTMLTextAreaElement>, state: boolean) => {
    onBlur && onBlur(e);
    onChangeFocus && onChangeFocus(state);
  };

  return (
    <textarea
      ref={textareaRef}
      placeholder={placeholder}
      name={name}
      value={value}
      onFocus={e => onFocusCallback(e, true)}
      onBlur={e => onBlurCallback(e, false)}
      onChange={onChangeCallback}
      onKeyDown={onKeyPressCallback}
      className={className}
      {...restProps}
    />
  );
};
