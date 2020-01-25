/**
 * Given a type T and property K on type T, set that property K to required
 * setting all other properties to optional.
 */
export type RequiredBy<T, K extends keyof T> = Required<Pick<T, K>> &
  Partial<Omit<T, K>>;

/**
 * Given a type T and property K on type T, set that property K to optional
 * leaving all other as is.
 */
export type OptionalBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
