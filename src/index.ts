import graphqlMiddleware, { GraphqlServerOptions, GraphqlServerContext } from './middlewares/graphql-middleware';
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
