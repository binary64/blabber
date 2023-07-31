import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '../../services/api/schema.json',
  documents: '**/!(*.generated).{ts,tsx,graphql}',
  generates: {
    'src/graphql-types.generated.ts': {
      plugins: ['typescript'],
      config: {
        maybeValue: 'T | undefined',
        strictScalars: true,
        scalars: {
          timestamp: 'string',
          timestamptz: 'string',
        },
      },
    },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: './graphql-types.generated.ts',
      },
      plugins: [
        'typescript-operations',
        'typescript-graphql-request',
      ],
      config: {
        maybeValue: 'T | undefined',
        strictScalars: true,
        scalars: {
          timestamp: 'string',
          timestamptz: 'string',
        },
      },
    },
  },
};

export default config;
