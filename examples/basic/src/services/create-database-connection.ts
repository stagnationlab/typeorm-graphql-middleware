import 'reflect-metadata';
import { createConnection, Connection, ConnectionOptions } from 'typeorm';

export default async (options: ConnectionOptions): Promise<Connection> => {
	try {
		return createConnection(options);
	} catch (e) {
		throw new Error(e);
	}
};
