import { useMemo } from 'preact/hooks';
import { useStoreon } from 'storeon/preact';
import classNames from 'classnames';

import { Hourglass } from 'components/HourglassView/Hourglass';
import { CountdownState, CountdownEvents } from 'store';

import styles from 'components/HourglassView/HourglassView.module.css';

export const HourglassView = ({
  className: customClassName,
}: {
  className?: string;
}): JSX.Element => {
  const { initial, remaining, state } = useStoreon<
    CountdownState,
    CountdownEvents
  >('initial', 'remaining', 'state');

  const [remainingFraction, elapsedFraction] = useMemo(() => {
    const fraction = remaining / initial;
    const value = !isNaN(fraction) ? fraction : 0;
    return [value, 1 - value];
  }, [initial, remaining]);

  const className = classNames(customClassName, styles.wrapper);

  return (
    <div className={className}>
      <Hourglass
        className={classNames(styles.hourglass, {
          [styles.ring]: state === 'finish',
        })}
        elapsed={elapsedFraction}
        remaining={remainingFraction}
      />
    </div>
  );
};
