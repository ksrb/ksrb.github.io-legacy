import ApolloClient from "apollo-client";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from "apollo-cache-inmemory";
import { loader } from "graphql.macro";

import { WriteQueryDocument } from "./__generated__";
import introspectionQueryResultData from "./__generated__/introspectionQueryResultData";

import { experiences, skills } from "./data";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({ fragmentMatcher });
const client = new ApolloClient({
  cache,
  resolvers: {},
  typeDefs: loader("./schema.graphql"),
});

client.writeQuery({
  query: WriteQueryDocument,
  data: {
    experiences,
    skills,
  },
});

export default client;
