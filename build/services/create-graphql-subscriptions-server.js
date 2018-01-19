"use strict";
// import { execute, subscribe } from 'graphql';
// import { makeExecutableSchema } from 'graphql-tools';
// import { SubscriptionServer } from 'subscriptions-transport-ws';
// import typeDefs from './get-schema';
// import resolvers from './get-resolvers';
Object.defineProperty(exports, "__esModule", { value: true });
// const schema = makeExecutableSchema({
// 	typeDefs,
// 	resolvers,
// });
const port = 123;
// Set up the WebSocket for handling GraphQL subscriptions
function createSubscriptionServer(server) {
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
exports.default = createSubscriptionServer;
//# sourceMappingURL=create-graphql-subscriptions-server.js.map