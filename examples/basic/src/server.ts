import 'reflect-metadata';
import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import { ConnectionOptions } from 'typeorm';
import typeormGraphqlMiddleware, { TypeormGraphqlMiddlewareConfig } from '../../../src'; // import typeormGraphqlMiddleware, { TypeormGraphqlMiddlewareConfig } from 'typeorm-graphql-middleware';
import createDatabaseConnection from './services/create-database-connection';

const serverPort = 3001;

const dbOptions: ConnectionOptions = {
	type: 'sqlite',
	database: './database.sqlite',
	synchronize: true,
	logging: true,
	entities: [path.join(__dirname, 'entities', '*.+(ts|js)')],
};

const gqlOptions: TypeormGraphqlMiddlewareConfig = {
	graphql: {
		endpointUrl: '/graphql',
		graphiqlUrl: '/graphiql',
		enableGraphiql: true,
	},
	paths: {
		resolvers: [path.resolve(__dirname, 'graphs', '**/*+(-resolver).+(js|ts)')],
		typeDefs: [path.resolve(__dirname, 'graphs', '**/*.gql')],
		typings: path.join(__dirname, 'typings', 'server', 'index.d.ts'),
		schema: path.join(__dirname, 'typings', 'server', 'schema.gql'),
	},
	debug: {
		simulatedLatency: 0,
		logging: true,
	},
};

// init
(async () => {
	// connect to database
	await createDatabaseConnection(dbOptions);

	// start express
	const app = express();

	// add graphql and typeorm
	const typeormGqlMiddleware = await typeormGraphqlMiddleware(gqlOptions);
	app.use(typeormGqlMiddleware);

	// create webserver
	http.createServer(app);

	app.listen({ port: serverPort }, (error: Error) => {
		// tslint:disable:no-console
		console.log(`-------------------------------------------------------`);
		console.log(`Server is now running at http://localhost:${serverPort}`);
		console.log(`-------------------------------------------------------`);

		if (error) {
			console.error('Server error', error);
		}
		// tslint:enable:no-console
	});
})();
