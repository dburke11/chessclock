import { Preset } from '../interfaces/preset.settings';

export const TIMES = {
  ONE_SECOND: 1000,
  THIRTY_SECONDS: 30000,
  ONE_MINUTE: 60000,
  ONE_HOUR: 3600000,

};
export const CUSTOM_TIME_CONTROL_ID = 'CUSTOM';
export const PRESETS: Preset[] = [
  {
    presetId: '1_0',
    displayText: '1 min',
    duration: TIMES.ONE_MINUTE,
    increment: 0,
  },
  {
    presetId: '1_1',
    displayText: '1 | 1',
    duration: TIMES.ONE_MINUTE,
    increment: TIMES.ONE_SECOND,
  },
  {
  presetId: '2_1',
    displayText: '2 | 1',
    duration: 2 * TIMES.ONE_MINUTE,
    increment: TIMES.ONE_SECOND,
  },
  {
    presetId: '30s_0',
    displayText: '30 sec',
    duration: TIMES.THIRTY_SECONDS,
    increment: 0,
  },
  {
    presetId: '5_0',
    displayText: '5 min',
    duration: 5 * TIMES.ONE_MINUTE,
    increment: 0,
  },
  {
    presetId: '3_0',
    displayText: '3 min',
    duration: 3 * TIMES.ONE_MINUTE,
    increment: 0,
  },
  {
    presetId: '3_2',
    displayText: '3 | 2',
    duration: 3 * TIMES.ONE_MINUTE,
    increment: 2 * TIMES.ONE_SECOND,
  },
  {
    presetId: '3_1',
    displayText: '3 | 1',
    duration: 3 * TIMES.ONE_MINUTE,
    increment: TIMES.ONE_SECOND,
  },
  {
    presetId: '5_5',
    displayText: '5 | 5',
    duration: 5 * TIMES.ONE_MINUTE,
    increment: 5 * TIMES.ONE_SECOND,
  },
  
  {
    presetId: '10_0',
    displayText: '10 min',
    duration: 10 * TIMES.ONE_MINUTE,
    increment: 0,
  },
  
  {
    presetId: '15_10',
    displayText: '15 | 10',
    duration: 15 * TIMES.ONE_MINUTE,
    increment: 10 * TIMES.ONE_SECOND,
  },
  {
    presetId: '60_0',
    displayText: '60 min',
    duration: TIMES.ONE_HOUR,
    increment: 0,
  },
  {
    presetId: '30_0',
    displayText: '30 min',
    duration: 30 * TIMES.ONE_MINUTE,
    increment: 0,
  },
  {
    presetId: '20_0',
    displayText: '20 min',
    duration: 20 * TIMES.ONE_MINUTE,
    increment: 0,
  },
  {
    presetId: '45_45',
    displayText: '45 | 45',
    duration: 45 * TIMES.ONE_MINUTE,
    increment: 45 * TIMES.ONE_SECOND,
  },
];

