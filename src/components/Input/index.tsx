import classNames from 'classnames';

import styles from 'components/Input/Input.module.css';

export const Input = (
  props: JSX.HTMLAttributes<HTMLInputElement>,
): JSX.Element => {
  const { className: customClassName, ...rest } = props;

  const className = classNames(customClassName, styles.input);
  return <input className={className} {...rest} />;
};
