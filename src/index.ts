import graphqlMiddleware, { GraphqlServerOptions, GraphqlServerContext } from './middlewares/graphql-middleware';
import createTsSchemasFromGql from './services/create-ts-schemas-from-gql';
import createSchema from './services/create-schema';
import { FieldResolver, SubscriptionResolver, RootResolver } from './typings';
import resolve from './services/resolve-helper';
import createTypings from './services/create-typings';
import * as express from 'express';

export interface TypeormGraphqlMiddlewareConfig {
	graphql: GraphqlServerOptions;
	paths: {
		resolvers: string[];
		typeDefs: string[];
		typings?: string;
		schema?: string;
	};
	debug?: {
		simulatedLatency?: number;
		logging?: boolean;
	};
}

const typeormGraphqlMiddleware = async ({ debug = {}, paths, graphql }: TypeormGraphqlMiddlewareConfig) => {
	// // create schema file
	// if (paths.schema) {
	// 	createSchema(paths.typeDefs, paths.schema);
	// }

	// // generate server typings for typescript
	// if (paths.typings) {
	// 	createTsSchemasFromGql(paths.typeDefs, paths.typings);
	// }

	return graphqlMiddleware({
		simulatedLatency: debug.simulatedLatency || 0,
		resolversGlobPattern: paths.resolvers,
		typeDefsGlobPattern: paths.typeDefs,
		debug: debug.logging,
		...graphql,
	}) as express.Router;
};

export default typeormGraphqlMiddleware;

export {
	FieldResolver,
	SubscriptionResolver,
	RootResolver,
	resolve,
	GraphqlServerOptions,
	createTypings,
	GraphqlServerContext,
};
