import { useSyncExternalStore } from 'react';

const noopSubscribe = () => () => {};

/**
 * Reads a browser-only value without hydration mismatches:
 * returns `serverValue` during prerender/hydration, then the real client value.
 */
export function useClientValue<T>(
  getClientValue: () => T,
  serverValue: T,
  subscribe: (onChange: () => void) => () => void = noopSubscribe,
): T {
  return useSyncExternalStore(subscribe, getClientValue, () => serverValue);
}
