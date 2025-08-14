export {};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    ttq?: {
      page: () => void;
      track: (event: string, data?: Record<string, unknown>) => void;
      [key: string]: unknown;
    };
  }
}
