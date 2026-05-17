const isDev = __DEV__;

export const logger = {
  info(message: string, ...args: unknown[]): void {
    if (isDev) {
      console.warn(`[INFO] ${message}`, ...args);
    }
  },

  warn(message: string, ...args: unknown[]): void {
    console.warn(`[WARN] ${message}`, ...args);
  },

  error(message: string, ...args: unknown[]): void {
    console.error(`[ERROR] ${message}`, ...args);
  },

  debug(message: string, ...args: unknown[]): void {
    if (isDev) {
      console.warn(`[DEBUG] ${message}`, ...args);
    }
  },
} as const;
