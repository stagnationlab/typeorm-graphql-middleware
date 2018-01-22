import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import { mergeTypes } from 'merge-graphql-schemas';
import getTypeDefs from './get-type-definitions';

let cachedContent = '';

export default (typeDefsPath: string[], outputPath: string) => {
	const typeDefs = getTypeDefs(typeDefsPath).map(def => def.replace(/ extend/g, ''));
	const schema = mergeTypes(typeDefs);

	if (cachedContent !== schema) {
		mkdirp.sync(path.dirname(outputPath));
		fs.writeFileSync(outputPath, schema);

		cachedContent = schema;
	}

	return cachedContent;
};
