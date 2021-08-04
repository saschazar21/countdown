import classNames from 'classnames';

import { Button } from 'components/Button';
import { TimeField } from 'components/TimeField';

import styles from 'components/Controls/Controls.module.css';

export const Controls = ({
  className: customClassName,
}: {
  className?: string;
}): JSX.Element => {
  const className = classNames(customClassName, styles.wrapper);

  return (
    <div className={className}>
      <TimeField className={styles.input} />
      <Button className={styles.playpause}>Play/Pause</Button>
      <Button className={styles.stop}>Stop</Button>
    </div>
  );
};
