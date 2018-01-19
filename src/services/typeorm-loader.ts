import * as DataLoader from 'dataloader';
import { BaseEntity, FindManyOptions } from 'typeorm';
import { ObjectType } from '../typings';

export type TypeormLoader = <T extends BaseEntity>(Entity: ObjectType<T>) => TypeormLoaderMethods<T>;

export type TypeormLoaderArgs = string | number;

export interface TypeormLoaderMethods<T> {
	one: (id: TypeormLoaderArgs | Promise<T>) => Promise<T>;
	many: (ids: TypeormLoaderArgs[] | Promise<T[]>) => Promise<T[]>;
	find: (where?: FindManyOptions<T>) => Promise<T[]>;
}

export default function createTypeormLoader() {
	const cachedLoaders: { [key: string]: TypeormLoaderMethods<any> } = {};

	return <T extends BaseEntity>(Entity: typeof BaseEntity) => {
		const name = Entity.name;

		if (!cachedLoaders[name]) {
			cachedLoaders[name] = createLoaderMethods<T>(Entity);
		}

		return cachedLoaders[name];
	};
}

function createLoaderMethods<T extends BaseEntity>(entity: typeof BaseEntity): TypeormLoaderMethods<T> {
	const entityLoader = new DataLoader(i => entity.findByIds(i) as Promise<T[]>);

	return {
		one: id => (id instanceof Promise ? primePromise(entityLoader, id) : entityLoader.load(id)),
		many: ids => (ids instanceof Promise ? primePromiseList(entityLoader, ids) : entityLoader.loadMany(ids)),
		find: where => entity.find(where as any).then(res => primeResultList(entityLoader, res)) as Promise<T[]>,
	};
}

function primeResultList<T extends BaseEntity>(entityLoader: DataLoader<{}, T>, res: T[]): T[] {
	res.forEach(primeResult.bind(null, entityLoader));

	return res;
}

function primeResult<T extends BaseEntity>(entityLoader: DataLoader<{}, T>, entity: T & { id: string }): T {
	entityLoader.prime(entity.id, entity);

	return entity;
}

async function primePromiseList<T extends BaseEntity>(
	entityLoader: DataLoader<{}, T>,
	promise: Promise<T[]>,
): Promise<T[]> {
	const res = await promise;

	res.forEach(primeResult.bind(null, entityLoader));

	return res;
}

function primePromise<T extends BaseEntity>(entityLoader: DataLoader<{}, T>, promise: Promise<T>): Promise<T> {
	return promise.then(primeResult.bind(null, entityLoader));
}
