"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const graphql_codegen_core_1 = require("graphql-codegen-core");
const graphql_tools_1 = require("graphql-tools");
const graphql_codegen_compiler_1 = require("graphql-codegen-compiler");
const get_type_definitions_1 = require("./get-type-definitions");
let cachedContent = '';
exports.default = (typedefGlobPattern, outputPath) => {
    const typeDefs = get_type_definitions_1.default(typedefGlobPattern);
    const schema = graphql_tools_1.makeExecutableSchema({ typeDefs });
    const context = graphql_codegen_core_1.schemaToTemplateContext(schema);
    const config = graphql_codegen_compiler_1.getGeneratorConfig('ts-single');
    const compiledTs = graphql_codegen_compiler_1.compileTemplate(config, context);
    // add Default Query, Mutation and Subscription if not present
    if (compiledTs[0].content.indexOf('export interface Query') === -1) {
        compiledTs[0].content += `\nexport interface Query {}\n`;
    }
    if (compiledTs[0].content.indexOf('export interface Mutation') === -1) {
        compiledTs[0].content += `\nexport interface Mutation {}\n`;
    }
    if (compiledTs[0].content.indexOf('export interface Subscription') === -1) {
        compiledTs[0].content += `\nexport interface Subscription {}\n`;
    }
    if (cachedContent !== compiledTs[0].content) {
        mkdirp.sync(path.dirname(outputPath));
        fs.writeFileSync(outputPath, compiledTs[0].content);
        cachedContent = compiledTs[0].content;
    }
    return cachedContent;
};
//# sourceMappingURL=create-ts-schemas-from-gql.js.map