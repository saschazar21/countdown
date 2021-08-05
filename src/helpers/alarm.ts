import alarmUrl from 'assets/alarm.mp3';

let audio: HTMLAudioElement;

export const stopAlarm = (): void => {
  audio && audio.pause();
};

export const playAlarm = async (): Promise<void> => {
  stopAlarm();
  audio = new Audio(alarmUrl);
  audio.loop = true;
  return audio.play();
};
