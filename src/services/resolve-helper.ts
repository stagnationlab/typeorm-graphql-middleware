import { BaseEntity, FindManyOptions } from 'typeorm';
import { TypeormLoaderArgs } from '../services/typeorm-loader';
import { ObjectType, FieldResolverResult } from '../typings';

export interface ResolveFnProps<TArgs, TSource> {
	source: TSource;
	args: TArgs;
}

export type Resolve = <T extends BaseEntity>(
	Entity: ObjectType<T>,
) => {
	one: <TArgs, TSource = any>(
		getId: (props: ResolveFnProps<TArgs, TSource>) => TypeormLoaderArgs | Promise<T>,
	) => FieldResolverResult<TSource, T, TArgs, Promise<T>>;

	many: <TArgs, TSource = any>(
		getIds: (props: ResolveFnProps<TArgs, TSource>) => TypeormLoaderArgs[] | Promise<T[]>,
	) => FieldResolverResult<TSource, T, TArgs, Promise<T[]>>;

	find: <TArgs, TSource = any>(
		getWhere?: (props: ResolveFnProps<TArgs, TSource>) => FindManyOptions<T>,
	) => FieldResolverResult<TSource, T, TArgs, Promise<T[]>>;
};

const resolve: Resolve = entity => ({
	one: getId => (source, args, { loader }) => loader(entity).one(getId({ source, args })),
	many: getIds => (source, args, { loader }) => loader(entity).many(getIds({ source, args })),
	find: getWhere => (source, args, { loader }) =>
		loader(entity).find(getWhere ? getWhere({ source, args }) : undefined),
});

export default resolve;
