import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '../../services/api/schema.json',
  documents: '**/!(*.generated).{ts,tsx,graphql}',
  generates: {
    'graphql-types.generated.ts': {
      plugins: ['typescript'],
    },
    './': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.tsx',
        baseTypesPath: 'graphql-types.generated.ts',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: { withHooks: true },
    },
  },
};

export default config;
