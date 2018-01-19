import { BaseEntity, FindManyOptions } from 'typeorm';
import { TypeormLoaderArgs } from '../services/typeorm-loader';
import { ObjectType, FieldResolverResult } from '../typings';
export interface ResolveFnProps<TArgs, TSource> {
    source: TSource;
    args: TArgs;
}
export declare type Resolve = <T extends BaseEntity>(Entity: ObjectType<T>) => {
    one: <TArgs, TSource = any>(getId: (props: ResolveFnProps<TArgs, TSource>) => TypeormLoaderArgs | Promise<T>) => FieldResolverResult<TSource, T, TArgs, Promise<T>>;
    many: <TArgs, TSource = any>(getIds: (props: ResolveFnProps<TArgs, TSource>) => TypeormLoaderArgs[] | Promise<T[]>) => FieldResolverResult<TSource, T, TArgs, Promise<T[]>>;
    find: <TArgs, TSource = any>(getWhere?: (props: ResolveFnProps<TArgs, TSource>) => FindManyOptions<T>) => FieldResolverResult<TSource, T, TArgs, Promise<T[]>>;
};
declare const resolve: Resolve;
export default resolve;
