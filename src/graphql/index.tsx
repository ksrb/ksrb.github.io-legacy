import ApolloClient from "apollo-client";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from "apollo-cache-inmemory";
import { loader } from "graphql.macro";

import {
  ExperienceFieldsFragment,
  ExperienceFieldsFragmentDoc,
  Resolvers,
  WriteQueryDocument,
} from "./__generated__";
import introspectionQueryResultData from "./__generated__/introspectionQueryResultData";

import typenames from "./typenames";
import { experiences, skills } from "./data";
import { DataProxy } from "apollo-cache";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

type ResolversSelected = {
  Query: Pick<Resolvers["Query"], "experience">;
  Mutation: Pick<Resolvers["Mutation"], "experienceUpdate">;
};

const resolvers: ResolversSelected = {
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
  Mutation: {
    experienceUpdate(_, { experience }, { cache, getCacheKey }) {
      const { id, role, company } = experience;

      const fragmentOptions: DataProxy.Fragment<ExperienceFieldsFragment> = {
        id: getCacheKey({ __typename: typenames.Experience, id }),
        fragment: ExperienceFieldsFragmentDoc,
        fragmentName: ExperienceFieldsFragmentDoc.definitions[0].name.value,
      };

      const data = cache.readFragment<ExperienceFieldsFragment>(
        fragmentOptions,
      );

      if (!data) {
        return false;
      }

      const companyFinal = {
        ...company,
        name: company?.name ?? "",
        values: company?.values ?? [],
      };

      cache.writeFragment<ExperienceFieldsFragment>({
        ...fragmentOptions,
        data: {
          ...data,
          role: role ?? "",
          // @ts-ignore
          company: {
            ...data.company,
            ...companyFinal,
          },
        },
      });

      return true;
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
