import * as path from 'path';
import { createSchema } from '../../../src'; // import { createSchema } from 'typeorm-graphql-schema';

const pattern = path.resolve(__dirname, '..', 'src', 'graphs', '**/*.gql');

createSchema([path.resolve(pattern)], 'build/schema.gql');
