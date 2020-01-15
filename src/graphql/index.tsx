import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { loader } from "graphql.macro";

import { experiences } from "./data";

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  resolvers: {},
  typeDefs: loader("./schema.graphql"),
});

cache.writeData({
  data: {
    experiences,
  },
});

export default client;
