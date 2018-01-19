"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolve = entity => ({
    one: getId => (source, args, { loader }) => loader(entity).one(getId({ source, args })),
    many: getIds => (source, args, { loader }) => loader(entity).many(getIds({ source, args })),
    find: getWhere => (source, args, { loader }) => loader(entity).find(getWhere ? getWhere({ source, args }) : undefined),
});
exports.default = resolve;
//# sourceMappingURL=resolve-helper.js.map