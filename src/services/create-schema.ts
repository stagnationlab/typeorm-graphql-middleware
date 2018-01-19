import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import getTypeDefs from './get-type-definitions';

export default (typeDefsPath: string[], outputPath: string) => {
	const typeDefs = getTypeDefs(typeDefsPath);

	mkdirp.sync(path.dirname(outputPath));
	fs.writeFileSync(outputPath, typeDefs);
};
