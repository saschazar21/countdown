import { StoreContext } from 'storeon/preact';

import { Controls } from 'components/Controls';
import { Hourglass } from 'components/Hourglass';
import store from 'store';

import styles from 'pages/Index/Index.module.css';

export const Index = (): JSX.Element => {
  return (
    <>
      <h1 className="visually-hidden">Countdown</h1>
      <section className={styles.layout}>
        <StoreContext.Provider value={store}>
          <div className={styles.hourglassWrapper}>
            <Hourglass className={styles.hourglass} />
          </div>
          <Controls className={styles.controls} />
        </StoreContext.Provider>
      </section>
    </>
  );
};
