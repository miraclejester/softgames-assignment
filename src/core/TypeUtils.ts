/**
 * Generic type used for elements that require constructors
 */
export type Constructor<T> = new (...args: unknown[]) => T;