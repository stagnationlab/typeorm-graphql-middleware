"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataLoader = require("dataloader");
function createTypeormLoader() {
    const cachedLoaders = {};
    return (Entity) => {
        const name = Entity.name;
        if (!cachedLoaders[name]) {
            cachedLoaders[name] = createLoaderMethods(Entity);
        }
        return cachedLoaders[name];
    };
}
exports.default = createTypeormLoader;
function createLoaderMethods(entity) {
    const entityLoader = new DataLoader(i => entity.findByIds(i));
    return {
        one: id => (id instanceof Promise ? primePromise(entityLoader, id) : entityLoader.load(id)),
        many: ids => (ids instanceof Promise ? primePromiseList(entityLoader, ids) : entityLoader.loadMany(ids)),
        find: where => entity.find(where).then(res => primeResultList(entityLoader, res)),
    };
}
function primeResultList(entityLoader, res) {
    res.forEach(primeResult.bind(null, entityLoader));
    return res;
}
function primeResult(entityLoader, entity) {
    entityLoader.prime(entity.id, entity);
    return entity;
}
function primePromiseList(entityLoader, promise) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield promise;
        res.forEach(primeResult.bind(null, entityLoader));
        return res;
    });
}
function primePromise(entityLoader, promise) {
    return promise.then(primeResult.bind(null, entityLoader));
}
//# sourceMappingURL=typeorm-loader.js.map