import { ApolloClient, InMemoryCache } from "@apollo/client";
import { loader } from "graphql.macro";
import {
  ExperienceFieldsFragmentDoc,
  Resolvers,
  SkillFieldsFragmentDoc,
  WriteQueryDocument,
} from "./__generated__";
import introspectionResults from "./__generated__/introspection-results";
import typenames from "./typenames";
import { experiences, skills } from "./data";

const resolvers: { Query: Pick<Resolvers["Query"], "experience" | "skill"> } = {
  Query: {
    experience(_, { id }, { cache, getCacheKey }) {
      return cache.readFragment({
        id: getCacheKey({ __typename: typenames.Experience, id }),
        fragment: ExperienceFieldsFragmentDoc,
        // TODO: potentially fragile as the order of the fragment definitions
        // can be changed easily
        // @ts-ignore
        fragmentName: ExperienceFieldsFragmentDoc.definitions[0].name.value,
      });
    },
    skill(_, { id }, { cache, getCacheKey }) {
      return cache.readFragment({
        id: getCacheKey({ __typename: typenames.Skill, id }),
        fragment: SkillFieldsFragmentDoc,
        // @ts-ignore
        fragmentName: SkillFieldsFragmentDoc.definitions[0].name.value,
      });
    },
  },
};

const cache = new InMemoryCache({
  possibleTypes: introspectionResults.possibleTypes,
});

const client = new ApolloClient({
  cache,
  // @ts-ignore generated resolver type valid but does not match apollo-client
  // resolver type
  resolvers,
  typeDefs: loader("./schema.graphql"),
});

cache.writeQuery({
  query: WriteQueryDocument,
  data: {
    experiences,
    skills,
  },
});

export default client;
