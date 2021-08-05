import { useMemo } from 'preact/hooks';
import { useStoreon } from 'storeon/preact';
import classNames from 'classnames';

import { CountdownEvents, CountdownState } from 'store';

import styles from 'components/Hourglass/Hourglass.module.css';

export const Hourglass = ({
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

  const className = classNames(customClassName, styles.wrapper, {
    [styles.ring]: state === 'finish',
  });

  return (
    <svg
      className={className}
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>An icon depicting a stylized hourglass</title>
      <mask
        id="remaining"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="2"
        y="0"
        width="10"
        height="8"
      >
        <path
          fill="black"
          d="M11 0H3C3 0 2.12676 3.25352 3 5C3.87323 6.74648 7 8 7 8C7 8 10.1268 6.74648 11 5C11.8732 3.25352 11 0 11 0Z"
        />
      </mask>
      <g mask="url(#remaining)">
        <rect
          className={styles.sand}
          style={{ transform: `scaleY(${remainingFraction})` }}
          x="3"
          y="1.25"
          width="8"
          height="6"
        />
      </g>
      <mask
        id="elapsed"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="2"
        y="8"
        width="10"
        height="8"
      >
        <path
          fill="black"
          d="M3 16L11 16C11 16 11.8732 12.7465 11 11C10.1268 9.25352 7 8 7 8C7 8 3.87324 9.25352 3 11C2.12677 12.7465 3 16 3 16Z"
        />
      </mask>
      <g mask="url(#elapsed)">
        <rect
          className={classNames(styles.sand, styles.elapsed)}
          style={{ transform: `scaleY(${elapsedFraction})` }}
          x="3"
          y="8.75"
          width="8"
          height="6"
        />
      </g>
      <path
        className={styles.hourglass}
        d="M13.3 14.6667H11.9V12.094C11.9 10.9789 11.3152 9.93797 10.3412 9.32041L8.26184 8L10.3416 6.67934C11.3152 6.06203 11.9 5.02112 11.9 3.906V1.33334H13.3C13.6866 1.33334 14 1.03487 14 0.666687C14 0.298469 13.6866 0 13.3 0H11.2H2.79999H0.69999C0.313393 0 0 0.298469 0 0.666656C0 1.03484 0.313393 1.33331 0.69999 1.33331H2.1V3.90597C2.1 5.02109 2.68479 6.062 3.65876 6.67956L5.73816 8L3.65837 9.32066C2.68479 9.93797 2.1 10.9789 2.1 12.094V14.6667H0.69999C0.313393 14.6667 0 14.9651 0 15.3333C0 15.7015 0.313393 16 0.69999 16H2.79999H11.2H13.3C13.6866 16 14 15.7015 14 15.3333C14 14.9652 13.6866 14.6667 13.3 14.6667ZM3.49998 3.906V1.33334H10.5V3.906C10.5 4.57525 10.1493 5.1995 9.56535 5.56975L7 7.19875L4.43501 5.57C3.85072 5.1995 3.49998 4.57525 3.49998 3.906ZM3.49998 14.6667V12.094C3.49998 11.4247 3.85072 10.8005 4.43462 10.4303L7 8.80125L9.56499 10.43C10.1493 10.8005 10.5 11.4247 10.5 12.094V14.6667H3.49998V14.6667Z"
      />
    </svg>
  );
};
