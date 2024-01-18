export type ActionMap<M extends { [index: string]: unknown}> = {
  [K in keyof M]: M[K] extends undefined
    ? {
      type: K;
    }
    : {
      type: K;
      payload: M[K];
    }
};
