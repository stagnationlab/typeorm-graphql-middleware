// import * as path from 'path';
// import * as mkdirp from 'mkdirp';
// import { generateTypeScriptTypes, GenerateTypescriptOptions } from 'graphql-schema-typescript';
// import getTypeDefinitions from './get-type-definitions';
// import { makeExecutableSchema } from 'graphql-tools';

// let cachedTypeDefs = '';

// const defaultOptions: GenerateTypescriptOptions = {
// 	resolver: {
// 		contextType: 'GraphqlServerContext',
// 		importContext: 'import { GraphqlServerContext } from "typeorm-graphql-middleware"',
// 	},
// 	global: true,
// 	typePrefix: '',
// 	namespace: 'GQL',
// 	minimizeInterfaceImplementation: true,
// };

// export default (schemaGlobPattern: string[], output: string, options: GenerateTypescriptOptions = {}) => {
// 	// tslint:disable-next-line:no-console
// 	console.log(`Generating typings to "${output}"`);

// 	const typeDefs = getTypeDefinitions(schemaGlobPattern);
// 	const cache = typeDefs.join();

// 	if (cache === cachedTypeDefs) {
// 		// tslint:disable-next-line:no-console
// 		console.log('Typings generated');
// 		return;
// 	}

// 	cachedTypeDefs = cache;

// 	const schema = makeExecutableSchema({ typeDefs });

// 	mkdirp.sync(path.dirname(output));

// 	generateTypeScriptTypes(schema, output, { ...defaultOptions, ...options })
// 		.then(() => {
// 			// tslint:disable-next-line:no-console
// 			console.log('Typings generated');
// 			process.exit(0);
// 		})
// 		.catch(err => {
// 			// tslint:disable-next-line:no-console
// 			console.error(err);
// 			process.exit(1);
// 		});
// };

import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import { schemaToTemplateContext } from 'graphql-codegen-core';
import { makeExecutableSchema } from 'graphql-tools';
import { compileTemplate, getGeneratorConfig } from 'graphql-codegen-compiler';
import getTypeDefs from './get-type-definitions';

let cachedContent = '';

export interface GenerateTypescriptOptions {
	global?: boolean;
}

const tplPath = path.join(__dirname, '..', 'templates');
const templates = {
	schema: fs.readFileSync(path.join(tplPath, 'schema.handlebars'), 'utf8'),
	type: fs.readFileSync(path.join(tplPath, 'type.handlebars'), 'utf8'),
};

export default (typedefGlobPattern: string[], outputPath: string, options: GenerateTypescriptOptions = {}) => {
	// tslint:disable-next-line:no-console
	console.log('start', options);
	const typeDefs = getTypeDefs(typedefGlobPattern);

	const schema = makeExecutableSchema({ typeDefs });
	const context = schemaToTemplateContext(schema as any);
	const config = getGeneratorConfig('ts-single');

	Object.keys(templates).forEach(key => {
		if (typeof config.templates === 'object' && key in config.templates) {
			config.templates[key] = templates[key];
		}
	});

	const compiledTs = compileTemplate(config, context);

	// add Default Query, Mutation and Subscription if not present
	// if (compiledTs[0].content.indexOf('export interface Query') === -1) {
	// 	compiledTs[0].content += `\nexport interface Query {}\n`;
	// }

	// if (compiledTs[0].content.indexOf('export interface Mutation') === -1) {
	// 	compiledTs[0].content += `\nexport interface Mutation {}\n`;
	// }

	// if (compiledTs[0].content.indexOf('export interface Subscription') === -1) {
	// 	compiledTs[0].content += `\nexport interface Subscription {}\n`;
	// }

	if (cachedContent !== compiledTs[0].content) {
		mkdirp.sync(path.dirname(outputPath));

		fs.writeFileSync(outputPath, compiledTs[0].content);
		cachedContent = compiledTs[0].content;
	}

	return cachedContent;
};
