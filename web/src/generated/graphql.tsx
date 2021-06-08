import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};


export type GetUsersResponse = {
   __typename?: 'getUsersResponse',
  first_name: Scalars['String'],
  last_name: Scalars['String'],
  id: Scalars['Int'],
  age: Scalars['String'],
  phone_number: Scalars['String'],
};

export type LoginResponse = {
   __typename?: 'LoginResponse',
  accessToken?: Maybe<Scalars['String']>,
  refreshToken?: Maybe<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  login: LoginResponse,
  register: RegisterResponse,
  editAccount: Scalars['Boolean'],
  deleteUser: Scalars['Boolean'],
};


export type MutationLoginArgs = {
  password: Scalars['String'],
  last_name: Scalars['String'],
  first_name: Scalars['String']
};


export type MutationRegisterArgs = {
  phone_number: Scalars['String'],
  age: Scalars['String'],
  password: Scalars['String'],
  last_name: Scalars['String'],
  first_name: Scalars['String']
};


export type MutationEditAccountArgs = {
  phone_number: Scalars['String'],
  age: Scalars['String'],
  password: Scalars['String'],
  last_name: Scalars['String'],
  first_name: Scalars['String'],
  userId: Scalars['Float']
};


export type MutationDeleteUserArgs = {
  userId: Scalars['Float']
};

export type Query = {
   __typename?: 'Query',
  users: Array<GetUsersResponse>,
};

export type RegisterResponse = {
   __typename?: 'RegisterResponse',
  successful: Scalars['Boolean'],
  error?: Maybe<Scalars['String']>,
};
export type DeleteUserMutationVariables = {
  userId: Scalars['Float']
};


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteUser'>
);

export type EditAccountMutationVariables = {
  userId: Scalars['Float'],
  first_name: Scalars['String'],
  last_name: Scalars['String'],
  password: Scalars['String'],
  age: Scalars['String'],
  phone_number: Scalars['String']
};


export type EditAccountMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'editAccount'>
);

export type LoginMutationVariables = {
  first_name: Scalars['String'],
  last_name: Scalars['String'],
  password: Scalars['String']
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken' | 'refreshToken'>
  ) }
);

export type RegisterMutationVariables = {
  first_name: Scalars['String'],
  last_name: Scalars['String'],
  password: Scalars['String'],
  age: Scalars['String'],
  phone_number: Scalars['String']
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'RegisterResponse' }
    & Pick<RegisterResponse, 'successful' | 'error'>
  ) }
);

export type UsersQueryVariables = {};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'getUsersResponse' }
    & Pick<GetUsersResponse, 'first_name' | 'last_name' | 'id' | 'age' | 'phone_number'>
  )> }
);

export const DeleteUserDocument = gql`
    mutation deleteUser($userId: Float!) {
  deleteUser(userId: $userId)
}
    `;
export type DeleteUserMutationFn = ApolloReactCommon.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

    export function useDeleteUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
      return ApolloReactHooks.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, baseOptions);
    }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = ApolloReactCommon.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const EditAccountDocument = gql`
    mutation editAccount($userId: Float!, $first_name: String!, $last_name: String!, $password: String!, $age: String!, $phone_number: String!) {
  editAccount(userId: $userId, first_name: $first_name, last_name: $last_name, password: $password, age: $age, phone_number: $phone_number)
}
    `;
export type EditAccountMutationFn = ApolloReactCommon.MutationFunction<EditAccountMutation, EditAccountMutationVariables>;

    export function useEditAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditAccountMutation, EditAccountMutationVariables>) {
      return ApolloReactHooks.useMutation<EditAccountMutation, EditAccountMutationVariables>(EditAccountDocument, baseOptions);
    }
export type EditAccountMutationHookResult = ReturnType<typeof useEditAccountMutation>;
export type EditAccountMutationResult = ApolloReactCommon.MutationResult<EditAccountMutation>;
export type EditAccountMutationOptions = ApolloReactCommon.BaseMutationOptions<EditAccountMutation, EditAccountMutationVariables>;
export const LoginDocument = gql`
    mutation login($first_name: String!, $last_name: String!, $password: String!) {
  login(first_name: $first_name, last_name: $last_name, password: $password) {
    accessToken
    refreshToken
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

    export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
      return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
    }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation register($first_name: String!, $last_name: String!, $password: String!, $age: String!, $phone_number: String!) {
  register(first_name: $first_name, last_name: $last_name, password: $password, age: $age, phone_number: $phone_number) {
    successful
    error
  }
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

    export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
      return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
    }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    first_name
    last_name
    id
    age
    phone_number
  }
}
    `;

    export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
      return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
    }
      export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
      
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;