import classNames from 'classnames';

import styles from 'components/Button/Button.module.css';

export const Button = (
  props: JSX.HTMLAttributes<HTMLButtonElement>,
): JSX.Element => {
  const { children, className: customClassName, ...rest } = props;

  const className = classNames(customClassName, styles.button);

  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
};
