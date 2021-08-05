export const convertTimeSegmentsToSeconds = (
  time: [number, number, number],
): number => time[0] * 3600 + time[1] * 60 + time[2];

export const convertSecondsToTimeSegments = (
  seconds: number,
): [number, number, number] => [
  Math.floor(seconds / 3600),
  Math.floor((seconds % 3600) / 60),
  Math.floor(seconds % 60),
];

export const convertTimeInputToSeconds = (time: string): number => {
  const stringified = time.padStart(6, '0');
  const [h, m, s] = (stringified.match(/(\d{2})/g) ?? ['0', '0', '0']).map(
    (segment) => parseInt(segment, 10),
  );
  return convertTimeSegmentsToSeconds([h, m > 59 ? 59 : m, s > 59 ? 59 : s]);
};
