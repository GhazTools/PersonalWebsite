/* eslint-disable @typescript-eslint/no-namespace */
export declare namespace LocalCache {
  export interface Entry<T = Record<string, any>> {
    lastChecked: number;
    data: T;
  }

  export interface Prop {
    timeout?: number;
  }
}
