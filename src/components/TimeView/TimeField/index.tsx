import { useMemo, useRef, useState } from 'preact/hooks';
import { useStoreon } from 'storeon/preact';
import classNames from 'classnames';

import {
  convertSecondsToTimeSegments,
  convertTimeInputToSeconds,
} from 'helpers/time';
import { CountdownEvents, CountdownState } from 'store';

import styles from 'components/TimeView/TimeView.module.css';

export const TimeField = (
  props: JSX.HTMLAttributes<HTMLInputElement>,
): JSX.Element => {
  const { className: customClassName, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const { dispatch } = useStoreon<CountdownState, CountdownEvents>();
  const seconds = useMemo(() => convertTimeInputToSeconds(value), [value]);
  const segments = useMemo(
    () =>
      convertSecondsToTimeSegments(seconds).map((segment) =>
        segment.toString().padStart(2, '0'),
      ),
    [seconds],
  );

  const className = classNames(customClassName, styles.wrapper, styles.enabled);

  const handleKeyUp = (e: Event): void => {
    const { value: inputValue } = e.target as HTMLInputElement;
    const sanitized = inputValue.replace(/[^0-9]/g, ''); // remove non-numeric chars
    setValue(sanitized);
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
      aria-labelledby="time-input-label"
      role="textbox"
      className={className}
      tabIndex={0}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <span>
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
      </span>
      <span className={classNames(styles.tenths, styles.disabled)}>0</span>
      <label id="time-input-label" for="time-input" className="visually-hidden">
        Time input
      </label>
      <input
        id="time-input"
        className={styles.input}
        onBlur={() => seconds > 0 && dispatch('set', seconds * 1000)}
        onKeyUp={handleKeyUp}
        ref={inputRef}
        maxLength={6}
        value={value}
        {...rest}
      />
    </span>
  );
};
