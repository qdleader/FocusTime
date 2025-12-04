/* eslint-disable no-console */
export const logger = {
  info: (...args: unknown[]): void => console.log('[FocusTime]', ...args),
  error: (...args: unknown[]): void => console.error('[FocusTime]', ...args),
};
