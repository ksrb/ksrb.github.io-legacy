import { InMemoryCache } from "@apollo/client";

type getCacheKey = (obj: { __typename: string; id: string | number }) => any;

export type ApolloClientContext = {
  cache: InMemoryCache;
  getCacheKey: getCacheKey;
};
