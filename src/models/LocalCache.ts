/* eslint-disable @typescript-eslint/no-namespace */
export declare namespace LocalCache {
  export interface Record<T = Record<string, unknown>> {
    lastChecked: number;
    data: T;
  }

  export interface Prop {
    timeout?: number;
  }
}
