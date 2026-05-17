declare const __DEV__: boolean;

declare namespace NodeJS {
  interface ProcessEnv {
    API_BASE_URL?: string;
    API_TIMEOUT?: string;
    APP_ENV?: 'development' | 'staging' | 'production';
  }
}

declare const process: {
  env: NodeJS.ProcessEnv;
};
