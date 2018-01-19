"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const mkdirp = require("mkdirp");
const graphql_schema_typescript_1 = require("graphql-schema-typescript");
const get_type_definitions_1 = require("./get-type-definitions");
const graphql_tools_1 = require("graphql-tools");
let cachedTypeDefs = '';
const defaultOptions = {
    resolver: {
        contextType: 'GraphqlServerContext',
        importContext: 'import { GraphqlServerContext } from "typeorm-graphql-middleware"',
    },
    global: true,
};
exports.default = (schemaGlobPattern, output, options = {}) => {
    // tslint:disable-next-line:no-console
    console.log(`Generating typings to "${output}"`);
    const typeDefs = get_type_definitions_1.default(schemaGlobPattern);
    const cache = typeDefs.join();
    if (cache === cachedTypeDefs) {
        // tslint:disable-next-line:no-console
        console.log('Typings generated');
        return;
    }
    cachedTypeDefs = cache;
    const schema = graphql_tools_1.makeExecutableSchema({ typeDefs });
    mkdirp.sync(path.dirname(output));
    graphql_schema_typescript_1.generateTypeScriptTypes(schema, output, Object.assign({}, defaultOptions, options))
        .then(() => {
        // tslint:disable-next-line:no-console
        console.log('Typings generated');
        process.exit(0);
    })
        .catch(err => {
        // tslint:disable-next-line:no-console
        console.error(err);
        process.exit(1);
    });
};
//# sourceMappingURL=create-typings.js.map