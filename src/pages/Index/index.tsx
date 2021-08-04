import { Controls } from 'components/Controls';
import { Hourglass } from 'components/Hourglass';

import styles from 'pages/Index/Index.module.css';

export const Index = (): JSX.Element => {
  return (
    <>
      <h1 className="visually-hidden">Countdown</h1>
      <section className={styles.layout}>
        <div className={styles.hourglassWrapper}>
          <Hourglass className={styles.hourglass} />
        </div>
        <Controls className={styles.controls} />
      </section>
    </>
  );
};
