import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Address = {
  __typename?: "Address";
  state: Scalars["String"];
  county: Scalars["String"];
};

export type Experience = {
  __typename?: "Experience";
  accomplishments: Array<Scalars["String"]>;
  address: Address;
  companyName: Scalars["String"];
  endDate: Maybe<Scalars["String"]>;
  hidden: Scalars["Boolean"];
  hours: Scalars["String"];
  iconPath: Scalars["String"];
  purpose: Scalars["String"];
  role: Scalars["String"];
  skills: Array<Skill>;
  startDate: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  experiences: Array<Experience>;
};

export type Skill = {
  __typename?: "Skill";
  name: Scalars["String"];
  utilization: Scalars["Int"];
};

export type ExperienceGetQueryVariables = {};

export type ExperienceGetQuery = { __typename?: "Query" } & {
  experiences: Array<
    { __typename?: "Experience" } & Pick<Experience, "companyName" | "hidden">
  >;
};

export const ExperienceGetDocument = gql`
  query ExperienceGet {
    experiences {
      companyName
      hidden
    }
  }
`;

/**
 * __useExperienceGetQuery__
 *
 * To run a query within a React component, call `useExperienceGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useExperienceGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExperienceGetQuery({
 *   variables: {
 *   },
 * });
 */
export function useExperienceGetQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ExperienceGetQuery,
    ExperienceGetQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    ExperienceGetQuery,
    ExperienceGetQueryVariables
  >(ExperienceGetDocument, baseOptions);
}
export function useExperienceGetLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ExperienceGetQuery,
    ExperienceGetQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    ExperienceGetQuery,
    ExperienceGetQueryVariables
  >(ExperienceGetDocument, baseOptions);
}
export type ExperienceGetQueryHookResult = ReturnType<
  typeof useExperienceGetQuery
>;
export type ExperienceGetLazyQueryHookResult = ReturnType<
  typeof useExperienceGetLazyQuery
>;
export type ExperienceGetQueryResult = ApolloReactCommon.QueryResult<
  ExperienceGetQuery,
  ExperienceGetQueryVariables
>;
