import * as glob from 'glob';
import * as merge from 'deepmerge';
import { GraphQLFieldResolver, GraphQLScalarType, GraphQLTypeResolver, GraphQLIsTypeOfFn } from 'graphql';

// Interfaces are copied from graphql-tools
export interface Resolvers {
	[key: string]: (() => any) | ResolverObject | GraphQLScalarType;
}

export declare interface ResolverObject {
	[key: string]: GraphQLFieldResolver<any, any> | ResolverOptions;
}

export interface ResolverOptions {
	resolve?: GraphQLFieldResolver<any, any>;
	subscribe?: GraphQLFieldResolver<any, any>;
	__resolveType?: GraphQLTypeResolver<any, any>;
	__isTypeOf?: GraphQLIsTypeOfFn<any, any>;
}

export default (globPattern: string[]) => {
	// find the resolvers and merge them into a single object
	const filenames = globPattern.reduce((res, p) => [...res, ...glob.sync(p)], [] as string[]);
	const resolvers = filenames.map((filename: string) => require(filename).default);

	// return the root resolver
	return merge.all<Resolvers>(resolvers);
};
