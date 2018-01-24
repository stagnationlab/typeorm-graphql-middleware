import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import { mergeTypes } from 'merge-graphql-schemas';
import getTypeDefs from './get-type-definitions';

let cachedContent = '';

export default (typeDefsPath: string[], outputPath: string) => {
	let typeDefs = getTypeDefs(typeDefsPath);
	typeDefs = typeDefs.map(def => def.replace(/\s*extend\s*/g, ''));

	const schema = mergeTypes(typeDefs);

	if (cachedContent !== schema) {
		mkdirp.sync(path.dirname(outputPath));
		fs.writeFileSync(outputPath, schema);

		cachedContent = schema;
	}

	return cachedContent;
};
