import React, {
  ChangeEvent,
  CSSProperties,
  DetailedHTMLProps,
  InputHTMLAttributes,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';

import css from './Toggle.module.scss';

type TDefaultRadioProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
type TToggleProps<T> = TDefaultRadioProps & {
  value: T;
  options: Array<T>;
  titles?: Array<ReactElement>;
  frameClassName?: string;
  onChangeOption?: (option: T) => void;
};

const TRANSITION_TIME = 400;

export const Toggle = <TValue extends string>({
  type,
  name,
  titles,
  options,
  value,
  className,
  frameClassName,
  onChange,
  onChangeOption,
  children,
  ...restProps
}: PropsWithChildren<TToggleProps<TValue>>) => {
  const [currentIndex, setCurrentIndex] = useState(() => options.indexOf(value));
  const [valueIndex, setValueIndex] = useState(() => options.indexOf(value));

  const [path, setPath] = useState<Array<number>>([]);
  const [counter, setCounter] = useState(1);

  const setNext = useCallback(() => {
    if (path[0] === valueIndex) {
      setCurrentIndex(options.indexOf(options[path[path.length - 1] - counter]));
    }
    if (path[0] !== valueIndex) {
      setCurrentIndex(options.indexOf(options[path[counter]]));
    }
  }, [options, path, valueIndex, counter]);

  useEffect(() => {
    if (currentIndex !== valueIndex && !path.length) {
      const newPath: Array<number> = [];
      for (let i = 0; i < options.length; i++) {
        if (i === valueIndex) {
          for (let j = i; j <= currentIndex; j++) {
            newPath.push(j);
          }
          // now path consist of target index, intermediates and current
          break;
        }
        if (i === currentIndex) {
          for (let j = i; j <= valueIndex; j++) {
            newPath.push(j);
          }
          // now path consist of current index, intermediates and target
          break;
        }
      }
      setPath(newPath);
    }
    setValueIndex(options.indexOf(value));
  }, [value, valueIndex]);

  useEffect(() => {
    // when path created, first step executing
    if (currentIndex !== valueIndex) {
      setNext();
      setCounter(counter + 1);
    }
  }, [path]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    let timerId: NodeJS.Timeout;
    // next steps planning
    // if (currentOption !== value && path.length > 2) {
    if (currentIndex !== valueIndex && path.length > 2) {
      timerId = setTimeout(() => {
        setNext();
        setCounter(counter + 1);
      }, TRANSITION_TIME / path.length);
    }
    // nullifying when target reached
    // if (currentOption === value && path.length) {
    if (currentIndex === valueIndex && path.length) {
      setCounter(1);
      timerId = setTimeout(() => {
        setPath([]);
      }, TRANSITION_TIME / path.length);
    }
    return () => clearTimeout(timerId);
  }, [counter]);

  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    if (!path.length) {
      // prevent change when switching is not completed
      onChange && onChange(e);
      onChangeOption && onChangeOption(e.currentTarget.value as TValue);
    }
  };

  const getTransitionStyle = useCallback(() => {
    const divider = path.length ? path.length : 1;
    return {
      transition: `transform ${TRANSITION_TIME / divider}ms ease-out`,
    } as CSSProperties;
  }, [path]);

  const mappedOptions = useCallback(
    () =>
      options.map((option, i) => {
        const getFrameStyle = () => {
          let style = frameClassName ? `${css.frame} ${frameClassName}` : `${css.frame}`;
          if (i !== currentIndex) {
            style =
              i > currentIndex
                ? `${style} ${css.toLeft}` // frame offset to left: ... [current], []next, []next
                : `${style} ${css.toRight}`; // frame offset to right: prev[], prev[], [current], ...
          }
          return style;
        };
        return (
          <li key={option}>
            <input
              id={option}
              type="radio"
              onChange={onChangeCallback}
              value={option}
              name={name}
              checked={currentIndex === i}
              className={css.toggle__input}
              {...restProps}
            />
            <label htmlFor={option}>
              <div className={css.toggle}>{titles ? titles[i] : option}</div>
              <div className={getFrameStyle()} style={getTransitionStyle()} />
            </label>
          </li>
        );
      }),
    [options, titles, valueIndex, currentIndex, onChangeCallback],
  );

  return (
    <ul className={className ? `${css.toggle__container} ${className}` : css.toggle__container}>
      {mappedOptions()}
    </ul>
  );
};
