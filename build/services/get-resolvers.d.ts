import { GraphQLFieldResolver, GraphQLScalarType, GraphQLTypeResolver, GraphQLIsTypeOfFn } from 'graphql';
export interface Resolvers {
    [key: string]: (() => any) | ResolverObject | GraphQLScalarType;
}
export interface ResolverObject {
    [key: string]: GraphQLFieldResolver<any, any> | ResolverOptions;
}
export interface ResolverOptions {
    resolve?: GraphQLFieldResolver<any, any>;
    subscribe?: GraphQLFieldResolver<any, any>;
    __resolveType?: GraphQLTypeResolver<any, any>;
    __isTypeOf?: GraphQLIsTypeOfFn<any, any>;
}
declare const _default: (globPattern: string[]) => Resolvers;
export default _default;
