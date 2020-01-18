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

export type Company = {
  __typename?: "Company";
  address: Address;
  purpose: Scalars["String"];
  name: Scalars["String"];
  logo: Maybe<Scalars["String"]>;
};

export type Displayed = {
  title: Scalars["String"];
};

export type Experience = {
  __typename?: "Experience";
  accomplishments: Array<Scalars["String"]>;
  company: Company;
  endDate: Maybe<Scalars["String"]>;
  hidden: Scalars["Boolean"];
  hours: Scalars["String"];
  role: Scalars["String"];
  history: Array<History>;
  startDate: Scalars["String"];
};

export type History = {
  __typename?: "History";
  value: Array<Displayed>;
  children: Maybe<Array<History>>;
  utilization: Maybe<Scalars["Int"]>;
};

export type Language = Displayed & {
  __typename?: "Language";
  title: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  experiences: Array<Experience>;
};

export type Tool = Displayed & {
  __typename?: "Tool";
  languages: Maybe<Array<Maybe<Language>>>;
  title: Scalars["String"];
  url: Scalars["String"];
  use: Use;
};

export type Use = Displayed & {
  __typename?: "Use";
  title: Scalars["String"];
};

export type ExperienceGetQueryVariables = {};

export type ExperienceGetQuery = { __typename?: "Query" } & {
  experiences: Array<
    { __typename?: "Experience" } & Pick<
      Experience,
      "accomplishments" | "endDate" | "hidden" | "role" | "startDate"
    > & {
        company: { __typename?: "Company" } & Pick<
          Company,
          "name" | "purpose"
        > & {
            address: { __typename?: "Address" } & Pick<
              Address,
              "county" | "state"
            >;
          };
      }
  >;
};

export const ExperienceGetDocument = gql`
  query ExperienceGet {
    experiences {
      accomplishments
      company {
        name
        purpose
        address {
          county
          state
        }
      }
      endDate
      hidden
      role
      startDate
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
