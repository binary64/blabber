import type { IGraphQLConfig } from 'graphql-config';

const config: IGraphQLConfig = {
  schema: 'services/api/schema.json',
  documents: 'apps/blabber/modules/**/*.graphql',
};

export default config;
