"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const get_type_definitions_1 = require("./get-type-definitions");
exports.default = (typeDefsPath, outputPath) => {
    const typeDefs = get_type_definitions_1.default(typeDefsPath);
    mkdirp.sync(path.dirname(outputPath));
    fs.writeFileSync(outputPath, typeDefs);
};
//# sourceMappingURL=create-schema.js.map