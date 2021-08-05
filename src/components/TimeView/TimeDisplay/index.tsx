import { useMemo } from 'preact/hooks';
import { useStoreon } from 'storeon/preact';
import classNames from 'classnames';

import { CountdownEvents, CountdownState } from 'store';

import { convertSecondsToTimeSegments } from 'helpers/time';

import styles from 'components/TimeView/TimeView.module.css';

export const TimeDisplay = ({
  className: customClassName,
}: {
  className?: string;
}): JSX.Element => {
  const { remaining } = useStoreon<CountdownState, CountdownEvents>(
    'remaining',
  );

  const seconds = useMemo(() => Math.floor(remaining * 0.001), [remaining]);
  const segments = useMemo(
    () =>
      convertSecondsToTimeSegments(seconds).map((segment) =>
        segment.toString().padStart(2, '0'),
      ),
    [seconds],
  );
  const [tenths] = (remaining % 1000).toString();

  const className = classNames(customClassName, styles.wrapper);

  return (
    <span className={className}>
      <span>
        {segments.map((segment, index) => (
          <span
            key={`segment-display-${index}`}
            className={classNames(styles.segment, {
              [styles.disabled]: segment === '00',
            })}
          >
            {segment}
          </span>
        ))}
      </span>
      <span
        className={classNames(styles.tenths, {
          [styles.disabled]: tenths === '0',
        })}
      >
        {tenths}
      </span>
    </span>
  );
};
