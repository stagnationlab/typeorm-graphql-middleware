import * as path from 'path';
import { createTypings } from '../../../src'; // import { createTypings } from 'typeorm-graphql-schema';

const pattern = path.resolve(__dirname, '..', 'src', 'graphs', '**/*.gql');

createTypings([path.resolve(pattern)], 'typings/global.d.ts');
