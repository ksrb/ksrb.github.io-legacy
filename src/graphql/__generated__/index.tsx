import { InMemoryCache } from "apollo-cache-inmemory";
import { GraphQLResolveInfo } from "graphql";
import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";
type getCacheKey = (obj: { __typename: string; id: string | number }) => any;
type ApolloClientContext = { cache: InMemoryCache; getCacheKey: getCacheKey };
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };

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
  logo: Scalars["String"];
  name: Scalars["String"];
  purpose: Scalars["String"];
};

export type Displayed = {
  title: Scalars["String"];
};

export type DisplayedNode = Language | Tool | Use;

export type Experience = Node & {
  __typename?: "Experience";
  id: Scalars["ID"];
  accomplishments: Array<Scalars["String"]>;
  company: Company;
  endDate: Maybe<Scalars["String"]>;
  hidden: Scalars["Boolean"];
  histories: Array<History>;
  hours: Scalars["String"];
  role: Scalars["String"];
  startDate: Scalars["String"];
};

export type History = Node & {
  __typename?: "History";
  id: Scalars["ID"];
  children: Maybe<Array<History>>;
  utilization: Maybe<Scalars["Int"]>;
  values: Array<DisplayedNode>;
};

export type Language = Node &
  Displayed & {
    __typename?: "Language";
    id: Scalars["ID"];
    title: Scalars["String"];
    url: Scalars["String"];
    logo: Scalars["String"];
  };

export type Node = {
  id: Scalars["ID"];
};

export type Query = {
  __typename?: "Query";
  experiences: Array<Experience>;
  experience: Maybe<Experience>;
  skills: Array<Skill>;
};

export type QueryExperienceArgs = {
  id: Scalars["ID"];
};

export type Skill = Node & {
  __typename?: "Skill";
  id: Scalars["ID"];
  experience: Experience;
  languages: Maybe<Array<Language>>;
  utilization: Scalars["Int"];
  values: Array<DisplayedNode>;
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

export type HistoryFieldsFragment = { __typename?: "History" } & Pick<
  History,
  "id" | "utilization"
> & {
    values: Array<
      | ({ __typename?: "Language" } & Pick<
          Language,
          "id" | "logo" | "title" | "url"
        >)
      | ({ __typename?: "Tool" } & Pick<Tool, "id" | "title" | "url"> & {
            languages: Maybe<
              Array<{ __typename?: "Language" } & Pick<Language, "id">>
            >;
            use: { __typename?: "Use" } & Pick<Use, "id">;
          })
      | ({ __typename?: "Use" } & Pick<Use, "id" | "title">)
    >;
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
    histories: Array<
      { __typename?: "History" } & {
        children: Maybe<
          Array<
            { __typename?: "History" } & {
              children: Maybe<
                Array<
                  { __typename?: "History" } & {
                    children: Maybe<
                      Array<{ __typename?: "History" } & HistoryFieldsFragment>
                    >;
                  } & HistoryFieldsFragment
                >
              >;
            } & HistoryFieldsFragment
          >
        >;
      } & HistoryFieldsFragment
    >;
  };

export type ExperiencesGetQueryVariables = {};

export type ExperiencesGetQuery = { __typename?: "Query" } & {
  experiences: Array<
    { __typename?: "Experience" } & Pick<Experience, "id" | "hidden">
  >;
};

export type ExperienceGetQueryVariables = {
  id: Scalars["ID"];
};

export type ExperienceGetQuery = { __typename?: "Query" } & {
  experience: Maybe<{ __typename?: "Experience" } & ExperienceFieldsFragment>;
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
      | ({ __typename?: "Language" } & Pick<Language, "id" | "title">)
      | ({ __typename?: "Tool" } & Pick<Tool, "id" | "title">)
      | ({ __typename?: "Use" } & Pick<Use, "id" | "title">)
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

export const HistoryFieldsFragmentDoc = gql`
  fragment HistoryFields on History {
    id
    utilization
    values {
      ... on Tool {
        id
        languages {
          id
        }
        title
        url
        use {
          id
        }
      }
      ... on Language {
        id
        logo
        title
        url
      }
      ... on Use {
        id
        title
      }
    }
  }
`;
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
    histories {
      ...HistoryFields
      children {
        ...HistoryFields
        children {
          ...HistoryFields
          children {
            ...HistoryFields
          }
        }
      }
    }
    endDate
    hidden
    role
    startDate
  }
  ${HistoryFieldsFragmentDoc}
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
      ... on Tool {
        id
        title
      }
      ... on Language {
        id
        title
      }
      ... on Use {
        id
        title
      }
    }
  }
`;
export const ExperiencesGetDocument = gql`
  query ExperiencesGet {
    experiences {
      id
      hidden
    }
  }
`;

/**
 * __useExperiencesGetQuery__
 *
 * To run a query within a React component, call `useExperiencesGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useExperiencesGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExperiencesGetQuery({
 *   variables: {
 *   },
 * });
 */
export function useExperiencesGetQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ExperiencesGetQuery,
    ExperiencesGetQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    ExperiencesGetQuery,
    ExperiencesGetQueryVariables
  >(ExperiencesGetDocument, baseOptions);
}
export function useExperiencesGetLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ExperiencesGetQuery,
    ExperiencesGetQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    ExperiencesGetQuery,
    ExperiencesGetQueryVariables
  >(ExperiencesGetDocument, baseOptions);
}
export type ExperiencesGetQueryHookResult = ReturnType<
  typeof useExperiencesGetQuery
>;
export type ExperiencesGetLazyQueryHookResult = ReturnType<
  typeof useExperiencesGetLazyQuery
>;
export type ExperiencesGetQueryResult = ApolloReactCommon.QueryResult<
  ExperiencesGetQuery,
  ExperiencesGetQueryVariables
>;
export const ExperienceGetDocument = gql`
  query ExperienceGet($id: ID!) {
    experience(id: $id) @client {
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
 *      id: // value for 'id'
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

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes>;

export type isTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo,
) => boolean;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  Experience: ResolverTypeWrapper<Experience>;
  Node: ResolverTypeWrapper<Node>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Company: ResolverTypeWrapper<Company>;
  Address: ResolverTypeWrapper<Address>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  History: ResolverTypeWrapper<
    Omit<History, "values"> & { values: Array<ResolversTypes["DisplayedNode"]> }
  >;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  DisplayedNode:
    | ResolversTypes["Language"]
    | ResolversTypes["Tool"]
    | ResolversTypes["Use"];
  Language: ResolverTypeWrapper<Language>;
  Displayed: ResolverTypeWrapper<Displayed>;
  Tool: ResolverTypeWrapper<Tool>;
  Use: ResolverTypeWrapper<Use>;
  Skill: ResolverTypeWrapper<
    Omit<Skill, "values"> & { values: Array<ResolversTypes["DisplayedNode"]> }
  >;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  Experience: Experience;
  Node: Node;
  ID: Scalars["ID"];
  String: Scalars["String"];
  Company: Company;
  Address: Address;
  Boolean: Scalars["Boolean"];
  History: Omit<History, "values"> & {
    values: Array<ResolversParentTypes["DisplayedNode"]>;
  };
  Int: Scalars["Int"];
  DisplayedNode:
    | ResolversParentTypes["Language"]
    | ResolversParentTypes["Tool"]
    | ResolversParentTypes["Use"];
  Language: Language;
  Displayed: Displayed;
  Tool: Tool;
  Use: Use;
  Skill: Omit<Skill, "values"> & {
    values: Array<ResolversParentTypes["DisplayedNode"]>;
  };
};

export type AddressResolvers<
  ContextType = ApolloClientContext,
  ParentType extends ResolversParentTypes["Address"] = ResolversParentTypes["Address"]
> = {
  county: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  state: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type CompanyResolvers<
  ContextType = ApolloClientContext,
  ParentType extends ResolversParentTypes["Company"] = ResolversParentTypes["Company"]
> = {
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  address: Resolver<ResolversTypes["Address"], ParentType, ContextType>;
  logo: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  purpose: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type DisplayedResolvers<
  ContextType = ApolloClientContext,
  ParentType extends ResolversParentTypes["Displayed"] = ResolversParentTypes["Displayed"]
> = {
  __resolveType: TypeResolveFn<
    "Language" | "Tool" | "Use",
    ParentType,
    ContextType
  >;
  title: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type DisplayedNodeResolvers<
  ContextType = ApolloClientContext,
  ParentType extends ResolversParentTypes["DisplayedNode"] = ResolversParentTypes["DisplayedNode"]
> = {
  __resolveType: TypeResolveFn<
    "Language" | "Tool" | "Use",
    ParentType,
    ContextType
  >;
};

export type ExperienceResolvers<
  ContextType = ApolloClientContext,
  ParentType extends ResolversParentTypes["Experience"] = ResolversParentTypes["Experience"]
> = {
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  accomplishments: Resolver<
    Array<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  company: Resolver<ResolversTypes["Company"], ParentType, ContextType>;
  endDate: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  hidden: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  histories: Resolver<
    Array<ResolversTypes["History"]>,
    ParentType,
    ContextType
  >;
  hours: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  role: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  startDate: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type HistoryResolvers<
  ContextType = ApolloClientContext,
  ParentType extends ResolversParentTypes["History"] = ResolversParentTypes["History"]
> = {
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  children: Resolver<
    Maybe<Array<ResolversTypes["History"]>>,
    ParentType,
    ContextType
  >;
  utilization: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  values: Resolver<
    Array<ResolversTypes["DisplayedNode"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type LanguageResolvers<
  ContextType = ApolloClientContext,
  ParentType extends ResolversParentTypes["Language"] = ResolversParentTypes["Language"]
> = {
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  title: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  url: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  logo: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type NodeResolvers<
  ContextType = ApolloClientContext,
  ParentType extends ResolversParentTypes["Node"] = ResolversParentTypes["Node"]
> = {
  __resolveType: TypeResolveFn<
    | "Experience"
    | "Company"
    | "History"
    | "Language"
    | "Tool"
    | "Use"
    | "Skill",
    ParentType,
    ContextType
  >;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = ApolloClientContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  experiences: Resolver<
    Array<ResolversTypes["Experience"]>,
    ParentType,
    ContextType
  >;
  experience: Resolver<
    Maybe<ResolversTypes["Experience"]>,
    ParentType,
    ContextType,
    RequireFields<QueryExperienceArgs, "id">
  >;
  skills: Resolver<Array<ResolversTypes["Skill"]>, ParentType, ContextType>;
};

export type SkillResolvers<
  ContextType = ApolloClientContext,
  ParentType extends ResolversParentTypes["Skill"] = ResolversParentTypes["Skill"]
> = {
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  experience: Resolver<ResolversTypes["Experience"], ParentType, ContextType>;
  languages: Resolver<
    Maybe<Array<ResolversTypes["Language"]>>,
    ParentType,
    ContextType
  >;
  utilization: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  values: Resolver<
    Array<ResolversTypes["DisplayedNode"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type ToolResolvers<
  ContextType = ApolloClientContext,
  ParentType extends ResolversParentTypes["Tool"] = ResolversParentTypes["Tool"]
> = {
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  languages: Resolver<
    Maybe<Array<ResolversTypes["Language"]>>,
    ParentType,
    ContextType
  >;
  title: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  url: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  use: Resolver<ResolversTypes["Use"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type UseResolvers<
  ContextType = ApolloClientContext,
  ParentType extends ResolversParentTypes["Use"] = ResolversParentTypes["Use"]
> = {
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  title: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = ApolloClientContext> = {
  Address: AddressResolvers<ContextType>;
  Company: CompanyResolvers<ContextType>;
  Displayed: DisplayedResolvers;
  DisplayedNode: DisplayedNodeResolvers;
  Experience: ExperienceResolvers<ContextType>;
  History: HistoryResolvers<ContextType>;
  Language: LanguageResolvers<ContextType>;
  Node: NodeResolvers;
  Query: QueryResolvers<ContextType>;
  Skill: SkillResolvers<ContextType>;
  Tool: ToolResolvers<ContextType>;
  Use: UseResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ApolloClientContext> = Resolvers<
  ContextType
>;
