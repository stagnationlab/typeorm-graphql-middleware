"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const glob = require("glob");
exports.default = (globPattern) => {
    let foundFirstQuery = false;
    let foundFirsMutation = false;
    let foundFirsSubscription = false;
    // find type definitions, read their contents and merge them into one
    const filenames = globPattern.reduce((res, p) => [...res, ...glob.sync(p)], []);
    const typeDefinitions = filenames.map(filename => {
        let file = fs.readFileSync(filename, 'utf8');
        if (!foundFirstQuery && file.includes('extend type Query')) {
            file = file.replace('extend type Query', 'type Query');
            foundFirstQuery = true;
        }
        if (!foundFirsMutation && file.includes('extend type Mutation')) {
            file = file.replace('extend type Mutation', 'type Mutation');
            foundFirsMutation = true;
        }
        if (!foundFirsSubscription && file.includes('extend type Subscription')) {
            file = file.replace('extend type Subscription', 'type Subscription');
            foundFirsSubscription = true;
        }
        return file;
    });
    if (!foundFirstQuery) {
        typeDefinitions.push('type Query {\n# This query is generated automatically because you do not have any queries defined yet\niAmAGeneratedQuery: String\n}\n');
    }
    return typeDefinitions;
};
//# sourceMappingURL=get-type-definitions.js.map