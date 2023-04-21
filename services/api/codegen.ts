import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'http://localhost:8081/v1/graphql': {
      headers: { 'x-hasura-admin-secret': '123' },
    },
  },
  generates: {
    './schema.json': {
      plugins: ['introspection'],
    },
  },
};
export default config;
