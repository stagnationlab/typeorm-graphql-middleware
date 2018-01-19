import { BaseEntity, FindManyOptions } from 'typeorm';
import { ObjectType } from '../typings';
export declare type TypeormLoader = <T extends BaseEntity>(Entity: ObjectType<T>) => TypeormLoaderMethods<T>;
export declare type TypeormLoaderArgs = string | number;
export interface TypeormLoaderMethods<T> {
    one: (id: TypeormLoaderArgs | Promise<T>) => Promise<T>;
    many: (ids: TypeormLoaderArgs[] | Promise<T[]>) => Promise<T[]>;
    find: (where?: FindManyOptions<T>) => Promise<T[]>;
}
export default function createTypeormLoader(): <T extends BaseEntity>(Entity: typeof BaseEntity) => TypeormLoaderMethods<any>;
