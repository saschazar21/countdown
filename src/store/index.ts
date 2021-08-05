import { createStoreon, StoreonModule } from 'storeon';

const FINISH_TIMEOUT = 6000; // alarm.mp3 has a duration of 2 seconds
const TICK_INTERVAL = 100;

export type CountdownState = {
  /* the initial countdown value in ms */
  initial: number;
  /* the remaining countdown value in ms */
  value: number;
  /* the state of the countdown application */
  state: 'play' | 'pause' | 'stop' | 'finish';
};

export type CountdownEvents = {
  finish: undefined;
  play: undefined;
  pause: undefined;
  reset: undefined;
  set: number;
  tick: undefined;
};

const countdown: StoreonModule<CountdownState, CountdownEvents> = (store) => {
  let interval: number;
  let timeout: number;

  store.on('@dispatch', (_state, [event]) => {
    interval && event !== 'play' && clearInterval(interval);
    !interval &&
      event === 'play' &&
      setInterval(() => store.dispatch('tick'), TICK_INTERVAL);

    timeout && event !== 'finish' && clearTimeout(timeout);
  });

  store.on('@init', () => ({ initial: 0, value: 0, state: 'stop' }));

  store.on('finish', () => {
    timeout = window.setTimeout(() => store.dispatch('reset'), FINISH_TIMEOUT);
    return { state: 'finish', value: 0 };
  });

  store.on('play', () => ({ state: 'play' }));

  store.on('pause', () => ({ state: 'pause' }));

  store.on('reset', () => ({ initial: 0, value: 0, state: 'stop' }));

  store.on('set', (_state, v) => ({
    initial: v,
    value: v,
    state: 'stop',
  }));

  store.on('tick', ({ value }) =>
    value > TICK_INTERVAL
      ? { value: value - TICK_INTERVAL }
      : store.dispatch('finish'),
  );
};

export default createStoreon([countdown]);
