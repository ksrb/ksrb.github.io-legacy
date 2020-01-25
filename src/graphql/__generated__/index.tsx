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
  county: Scalars["String"];
  state: Scalars["String"];
};

export type Company = Node & {
  __typename?: "Company";
  id: Scalars["ID"];
  address: Address;
  logo: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  purpose: Scalars["String"];
};

export type Displayed = {
  title: Scalars["String"];
};

export type Experience = Node & {
  __typename?: "Experience";
  id: Scalars["ID"];
  accomplishments: Array<Scalars["String"]>;
  company: Company;
  endDate: Maybe<Scalars["String"]>;
  hidden: Scalars["Boolean"];
  history: Array<History>;
  hours: Scalars["String"];
  role: Scalars["String"];
  startDate: Scalars["String"];
};

export type History = Node & {
  __typename?: "History";
  id: Scalars["ID"];
  children: Maybe<Array<History>>;
  utilization: Maybe<Scalars["Int"]>;
  values: Array<Displayed>;
};

export type Language = Node &
  Displayed & {
    __typename?: "Language";
    id: Scalars["ID"];
    title: Scalars["String"];
  };

export type Node = {
  id: Scalars["ID"];
};

export type Query = {
  __typename?: "Query";
  experiences: Array<Experience>;
  skills: Array<Skill>;
};

export type Skill = Node & {
  __typename?: "Skill";
  id: Scalars["ID"];
  experience: Experience;
  languages: Maybe<Array<Language>>;
  utilization: Scalars["Int"];
  values: Array<Displayed>;
};

export type Tool = Node &
  Displayed & {
    __typename?: "Tool";
    id: Scalars["ID"];
    languages: Maybe<Array<Language>>;
    title: Scalars["String"];
    url: Scalars["String"];
    use: Use;
  };

export type Use = Node &
  Displayed & {
    __typename?: "Use";
    id: Scalars["ID"];
    title: Scalars["String"];
  };

export type ExperienceFieldsFragment = { __typename?: "Experience" } & Pick<
  Experience,
  "id" | "accomplishments" | "endDate" | "hidden" | "role" | "startDate"
> & {
    company: { __typename?: "Company" } & Pick<
      Company,
      "id" | "name" | "purpose"
    > & {
        address: { __typename?: "Address" } & Pick<Address, "county" | "state">;
      };
  };

export type ExperienceGetQueryVariables = {};

export type ExperienceGetQuery = { __typename?: "Query" } & {
  experiences: Array<{ __typename?: "Experience" } & ExperienceFieldsFragment>;
};

export type SkillFieldsFragment = { __typename?: "Skill" } & Pick<
  Skill,
  "id" | "utilization"
> & {
    experience: { __typename?: "Experience" } & Pick<Experience, "id"> & {
        company: { __typename?: "Company" } & Pick<Company, "name">;
      };
    languages: Maybe<
      Array<{ __typename?: "Language" } & Pick<Language, "id" | "title">>
    >;
    values: Array<
      | ({ __typename?: "Language" } & Pick<Language, "title">)
      | ({ __typename?: "Use" } & Pick<Use, "title">)
      | ({ __typename?: "Tool" } & Pick<Tool, "title">)
    >;
  };

export type SkillsGetQueryVariables = {};

export type SkillsGetQuery = { __typename?: "Query" } & {
  skills: Array<{ __typename?: "Skill" } & SkillFieldsFragment>;
};

export type WriteQueryQueryVariables = {};

export type WriteQueryQuery = { __typename?: "Query" } & {
  experiences: Array<{ __typename?: "Experience" } & ExperienceFieldsFragment>;
  skills: Array<{ __typename?: "Skill" } & SkillFieldsFragment>;
};

export const ExperienceFieldsFragmentDoc = gql`
  fragment ExperienceFields on Experience {
    id
    accomplishments
    company {
      id
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
`;
export const SkillFieldsFragmentDoc = gql`
  fragment SkillFields on Skill {
    id
    experience {
      id
      company {
        name
      }
    }
    languages {
      id
      title
    }
    utilization
    values {
      title
    }
  }
`;
export const ExperienceGetDocument = gql`
  query ExperienceGet {
    experiences {
      ...ExperienceFields
    }
  }
  ${ExperienceFieldsFragmentDoc}
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
export const SkillsGetDocument = gql`
  query SkillsGet {
    skills {
      ...SkillFields
    }
  }
  ${SkillFieldsFragmentDoc}
`;

/**
 * __useSkillsGetQuery__
 *
 * To run a query within a React component, call `useSkillsGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useSkillsGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSkillsGetQuery({
 *   variables: {
 *   },
 * });
 */
export function useSkillsGetQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SkillsGetQuery,
    SkillsGetQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<SkillsGetQuery, SkillsGetQueryVariables>(
    SkillsGetDocument,
    baseOptions,
  );
}
export function useSkillsGetLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SkillsGetQuery,
    SkillsGetQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<SkillsGetQuery, SkillsGetQueryVariables>(
    SkillsGetDocument,
    baseOptions,
  );
}
export type SkillsGetQueryHookResult = ReturnType<typeof useSkillsGetQuery>;
export type SkillsGetLazyQueryHookResult = ReturnType<
  typeof useSkillsGetLazyQuery
>;
export type SkillsGetQueryResult = ApolloReactCommon.QueryResult<
  SkillsGetQuery,
  SkillsGetQueryVariables
>;
export const WriteQueryDocument = gql`
  query WriteQuery {
    experiences {
      ...ExperienceFields
    }
    skills {
      ...SkillFields
    }
  }
  ${ExperienceFieldsFragmentDoc}
  ${SkillFieldsFragmentDoc}
`;

/**
 * __useWriteQueryQuery__
 *
 * To run a query within a React component, call `useWriteQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useWriteQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWriteQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useWriteQueryQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    WriteQueryQuery,
    WriteQueryQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<WriteQueryQuery, WriteQueryQueryVariables>(
    WriteQueryDocument,
    baseOptions,
  );
}
export function useWriteQueryLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    WriteQueryQuery,
    WriteQueryQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    WriteQueryQuery,
    WriteQueryQueryVariables
  >(WriteQueryDocument, baseOptions);
}
export type WriteQueryQueryHookResult = ReturnType<typeof useWriteQueryQuery>;
export type WriteQueryLazyQueryHookResult = ReturnType<
  typeof useWriteQueryLazyQuery
>;
export type WriteQueryQueryResult = ApolloReactCommon.QueryResult<
  WriteQueryQuery,
  WriteQueryQueryVariables
>;
