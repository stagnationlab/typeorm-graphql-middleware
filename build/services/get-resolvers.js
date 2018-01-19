"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glob = require("glob");
const merge = require("deepmerge");
exports.default = (globPattern) => {
    // find the resolvers and merge them into a single object
    const filenames = globPattern.reduce((res, p) => [...res, ...glob.sync(p)], []);
    const resolvers = filenames.map((filename) => require(filename).default);
    // return the root resolver
    return merge.all(resolvers);
};
//# sourceMappingURL=get-resolvers.js.map