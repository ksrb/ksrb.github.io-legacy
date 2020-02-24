import ApolloClient from "apollo-client";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from "apollo-cache-inmemory";
import { loader } from "graphql.macro";

import {
  ExperienceFieldsFragmentDoc,
  Resolvers,
  WriteQueryDocument,
} from "./__generated__";
import introspectionQueryResultData from "./__generated__/introspectionQueryResultData";

import typenames from "./typenames";
import { experiences, skills } from "./data";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const resolvers: { Query: Pick<Resolvers["Query"], "experience"> } = {
  Query: {
    experience(_, { id }, { cache, getCacheKey }) {
      return cache.readFragment({
        id: getCacheKey({ __typename: typenames.Experience, id }),
        fragment: ExperienceFieldsFragmentDoc,
        // TODO: potentially fragile as the order of the fragment definitions
        // can be changed easily
        fragmentName: ExperienceFieldsFragmentDoc.definitions[0].name.value,
      });
    },
  },
};

const cache = new InMemoryCache({ fragmentMatcher });
const client = new ApolloClient({
  cache,
  // @ts-ignore generated resolver type valid but does not match apollo-client
  // resolver type
  resolvers,
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
