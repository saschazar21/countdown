import { useMemo } from 'preact/hooks';
import { useStoreon } from 'storeon/preact';
import classNames from 'classnames';

import PauseIcon from 'assets/icons/pause.svg';
import PlayIcon from 'assets/icons/play.svg';
import StopIcon from 'assets/icons/square.svg';
import { Button } from 'components/Button';
import { TimeField } from 'components/TimeView/TimeField';
import { TimeDisplay } from 'components/TimeView/TimeDisplay';
import { CountdownEvents, CountdownState } from 'store';

import styles from 'components/Controls/Controls.module.css';

export const Controls = ({
  className: customClassName,
}: {
  className?: string;
}): JSX.Element => {
  const { dispatch, initial, remaining, state } = useStoreon<
    CountdownState,
    CountdownEvents
  >('initial', 'remaining', 'state');

  const isPlayPauseDisabled = useMemo(
    () => remaining === 0 && ['finish', 'stop'].includes(state),
    [remaining, state],
  );

  const isStopDisabled = useMemo(
    () => initial === 0 || state === 'stop',
    [initial, state],
  );

  const className = classNames(customClassName, styles.wrapper);

  const handlePlay = (e: MouseEvent) => {
    e.preventDefault();
    state === 'play' ? dispatch('pause') : dispatch('play');
  };

  const handleStop = (e: MouseEvent) => {
    e.preventDefault();
    dispatch('reset');
  };

  return (
    <div className={className}>
      {['finished', 'stop'].includes(state) ? (
        <TimeField className={styles.input} />
      ) : (
        <TimeDisplay className={styles.input} />
      )}
      <Button
        aria-label={state === 'pause' ? 'Pause' : 'Start'}
        onClick={handlePlay}
        className={classNames(styles.button, styles.playpause)}
        disabled={isPlayPauseDisabled}
        tabIndex={0}
        autoFocus
      >
        {state !== 'play' ? <PlayIcon /> : <PauseIcon />}
      </Button>
      <Button
        aria-label="Stop"
        onClick={handleStop}
        className={classNames(styles.button, styles.stop)}
        disabled={isStopDisabled}
        tabIndex={0}
      >
        <StopIcon />
      </Button>
    </div>
  );
};
