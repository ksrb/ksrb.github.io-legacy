import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { loader } from "graphql.macro";

import { WriteQueryDocument } from "./__generated__";
import { experiences, skillsComputed } from "./data";

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  resolvers: {},
  typeDefs: loader("./schema.graphql"),
});

client.writeQuery({
  query: WriteQueryDocument,
  data: {
    experiences,
    skills: skillsComputed,
  },
});

export default client;
