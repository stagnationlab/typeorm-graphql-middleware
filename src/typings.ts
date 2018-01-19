import { GraphQLResolveInfo } from 'graphql';
// import { Query, Mutation, Subscription } from '../../typings/server';
import { GraphqlServerContext } from './middlewares/graphql-middleware';

// tslint:disable-next-line:ban-types
export type ObjectType<T> = { new (): T } | Function;

export interface RootResolver<Queries, Mutations, Subscriptions, Context = {}> {
	Query?: FieldResolver<Queries, { [argName: string]: any }, Context>;
	Mutation?: FieldResolver<Mutations, { [argName: string]: any }, Context>;
	Subscription?: SubscriptionResolver<Subscriptions>;
}

export type FieldResolver<TSource, TArgs = { [argName: string]: any }, Context = {}> = {
	[P in keyof TSource]?: FieldResolverResult<
		TSource,
		TSource[P],
		TArgs,
		ResolverResult<TSource[P]> | Promise<ResolverResult<TSource[P]>>,
		Context
	>
};

export type SubscriptionResolver<TSource, TArgs = { [argName: string]: any }, Context = {}> = {
	[P in keyof TSource]?: {
		resolve?: FieldResolverResult<TSource, TArgs, Context>;
		subscribe?: FieldResolverResult<TSource, TArgs, Context>;
	}
};

export type FieldResolverResult<
	TSource,
	TResult,
	TArgs = { [argName: string]: any },
	TReturn = ResolverResult<TResult> | Promise<ResolverResult<TResult>>,
	TContext = {}
> = (source: TSource, args: TArgs, context: GraphqlServerContext<TContext>, info: GraphQLResolveInfo) => TReturn;

export type ResolverResult<TResult> =
	| TResult
	| undefined
	| { [P in keyof TResult]: ResolverResult<TResult[P]> | Promise<ResolverResult<TResult[P]>> };
