import { GraphQLResolveInfo } from 'graphql';
import { GraphqlServerContext } from './middlewares/graphql-middleware';
export declare type ObjectType<T> = {
    new (): T;
} | Function;
export interface RootResolver<Queries, Mutations, Subscriptions, Context = {}> {
    Query?: FieldResolver<Queries, {
        [argName: string]: any;
    }, Context>;
    Mutation?: FieldResolver<Mutations, {
        [argName: string]: any;
    }, Context>;
    Subscription?: SubscriptionResolver<Subscriptions>;
}
export declare type FieldResolver<TSource, TArgs = {
    [argName: string]: any;
}, Context = {}> = {
    [P in keyof TSource]?: FieldResolverResult<TSource, TSource[P], TArgs, ResolverResult<TSource[P]> | Promise<ResolverResult<TSource[P]>>, Context>;
};
export declare type SubscriptionResolver<TSource, TArgs = {
    [argName: string]: any;
}, Context = {}> = {
    [P in keyof TSource]?: {
        resolve?: FieldResolverResult<TSource, TArgs, Context>;
        subscribe?: FieldResolverResult<TSource, TArgs, Context>;
    };
};
export declare type FieldResolverResult<TSource, TResult, TArgs = {
    [argName: string]: any;
}, TReturn = ResolverResult<TResult> | Promise<ResolverResult<TResult>>, TContext = {}> = (source: TSource, args: TArgs, context: GraphqlServerContext<TContext>, info: GraphQLResolveInfo) => TReturn;
export declare type ResolverResult<TResult> = TResult | undefined | {
    [P in keyof TResult]: ResolverResult<TResult[P]> | Promise<ResolverResult<TResult[P]>>;
};
