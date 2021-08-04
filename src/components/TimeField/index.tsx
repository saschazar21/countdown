import { useMemo, useRef, useState } from 'preact/hooks';
import classNames from 'classnames';

import styles from 'components/TimeField/TimeField.module.css';

export const TimeField = (
  props: JSX.HTMLAttributes<HTMLInputElement>,
): JSX.Element => {
  const { className: customClassName, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const segments = useMemo(() => {
    const stringified = value.padStart(6, '0');
    const [h, m, s] = (stringified.match(/(\d{2})/g) ?? ['0', '0', '0']).map(
      (segment) => parseInt(segment, 10),
    );
    return [h, m > 59 ? 59 : m, s > 59 ? 59 : s].map((segment) =>
      segment.toString().padStart(2, '0'),
    );
  }, [value]);

  const className = classNames(customClassName, styles.wrapper);

  const handleKeyUp = (e: Event): void => {
    const { value: inputValue } = e.target as HTMLInputElement;
    setValue(inputValue);
  };

  const handleFocus = (): void => {
    inputRef.current?.focus();
  };

  const handleBlur = (): void => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    inputRef.current?.blur();
  };

  return (
    <span
      className={className}
      tabIndex={0}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {segments.map(
        (segment, i): JSX.Element => (
          <span
            key={`segment-${i}`}
            className={classNames(styles.segment, {
              [styles.disabled]: segment === '00',
            })}
          >
            {segment}
          </span>
        ),
      )}
      <input
        className={styles.input}
        onKeyUp={handleKeyUp}
        ref={inputRef}
        maxLength={6}
        {...rest}
      />
    </span>
  );
};
