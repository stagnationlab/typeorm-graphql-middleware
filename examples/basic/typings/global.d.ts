/* tslint:disable */
import { GraphqlServerContext } from 'typeorm-graphql-middleware';
import { GraphQLResolveInfo } from 'graphql';

export {};

declare global {
  namespace GQL {

		export type TypeResolverFn<TSource = any, TResult = any, TArgs = {}> = (
			source: TSource,
			args: TArgs,
			context: GraphqlServerContext,
			info: GraphQLResolveInfo,
		) => TypeResolveResult<TResult> | Promise<TypeResolveResult<TResult>>;

		export type TypeResolveResult<TResult> =
			| TResult
			| { [P in keyof TResult]: TypeResolveResult<TResult[P]> | Promise<TypeResolveResult<TResult[P]>> };

		export interface Resolver {
			Query?: {
				// postList?: TypeResolverFn<Query, Post[] | null>;
				postList?: (
					source: Query,
					args: {},
					context: GraphqlServerContext,
					info: GraphQLResolveInfo,
				) => TypeResolveResult<Post[] | null> | Promise<TypeResolveResult<Post[] | null>>;
				// userList?: TypeResolverFn<Query, User[] | null>;
				userList?: (
					source: Query,
					args: {},
					context: GraphqlServerContext,
					info: GraphQLResolveInfo,
				) => TypeResolveResult<User[] | null> | Promise<TypeResolveResult<User[] | null>>;
			};
			Post?: {
				// id?: TypeResolverFn<Post, string>;
				id?: (
					source: Post,
					args: {},
					context: GraphqlServerContext,
					info: GraphQLResolveInfo,
				) => TypeResolveResult<string> | Promise<TypeResolveResult<string>>;
				// name?: TypeResolverFn<Post, string>;
				name?: (
					source: Post,
					args: {},
					context: GraphqlServerContext,
					info: GraphQLResolveInfo,
				) => TypeResolveResult<string> | Promise<TypeResolveResult<string>>;
				// user?: TypeResolverFn<Post, User>;
				user?: (
					source: Post,
					args: {},
					context: GraphqlServerContext,
					info: GraphQLResolveInfo,
				) => TypeResolveResult<User> | Promise<TypeResolveResult<User>>;
			};
			User?: {
				// id?: TypeResolverFn<User, string>;
				id?: (
					source: User,
					args: {},
					context: GraphqlServerContext,
					info: GraphQLResolveInfo,
				) => TypeResolveResult<string> | Promise<TypeResolveResult<string>>;
				// name?: TypeResolverFn<User, string>;
				name?: (
					source: User,
					args: {},
					context: GraphqlServerContext,
					info: GraphQLResolveInfo,
				) => TypeResolveResult<string> | Promise<TypeResolveResult<string>>;
				// posts?: TypeResolverFn<User, Post[]>;
				posts?: (
					source: User,
					args: {},
					context: GraphqlServerContext,
					info: GraphQLResolveInfo,
				) => TypeResolveResult<Post[]> | Promise<TypeResolveResult<Post[]>>;
			};
			Mutation?: {
				// addPost?: TypeResolverFn<Mutation, Post, AddPostMutationArgs>;
				addPost?: (
					source: Mutation,
					args: AddPostMutationArgs,
					context: GraphqlServerContext,
					info: GraphQLResolveInfo,
				) => TypeResolveResult<Post> | Promise<TypeResolveResult<Post>>;
				// addUser?: TypeResolverFn<Mutation, User, AddUserMutationArgs>;
				addUser?: (
					source: Mutation,
					args: AddUserMutationArgs,
					context: GraphqlServerContext,
					info: GraphQLResolveInfo,
				) => TypeResolveResult<User> | Promise<TypeResolveResult<User>>;
			};
		}




export interface Query {
  postList?: Post[] | null; 
  userList?: User[] | null; 
}
export interface Post {
  id: string; 
  name: string; 
  user: User; 
}
export interface User {
  id: string; 
  name: string; 
  posts: Post[]; 
}
export interface Mutation {
  addPost: Post; 
  addUser: User; 
}

export interface AddPostInput {
  name: string; 
  userId: string; 
}
export interface AddUserInput {
  name: string; 
  posts?: string[] | null; 
}		export interface AddPostMutationArgs {
			input: AddPostInput; 
		}
		export interface AddUserMutationArgs {
			input?: AddUserInput | null; 
		}
	}
}