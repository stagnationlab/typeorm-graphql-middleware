// import { execute, subscribe } from 'graphql';
// import { makeExecutableSchema } from 'graphql-tools';
// import { SubscriptionServer } from 'subscriptions-transport-ws';
// import typeDefs from './get-schema';
// import resolvers from './get-resolvers';

// const schema = makeExecutableSchema({
// 	typeDefs,
// 	resolvers,
// });

const port = 123;

// Set up the WebSocket for handling GraphQL subscriptions
export default function createSubscriptionServer(server: any) {
	server.listen(port, () => {
		// tslint:disable-next-line:no-console
		console.log(`GraphQL subscription server is now running on port ${port}`);
		// tslint:disable-next-line:no-console
		console.log('Not implemented');

		// return new SubscriptionServer(
		// 	{
		// 		execute,
		// 		subscribe,
		// 		schema,
		// 	},
		// 	{
		// 		server,
		// 		path: '/subscriptions',
		// 	},
		// );
	});
}
