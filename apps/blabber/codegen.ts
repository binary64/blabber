import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '../../services/api/schema.json',
  documents: './modules/**/*.graphql',
  generates: {
    'graphql-types.generated.ts': { plugins: ['typescript'] },
    'modules/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.tsx',
        baseTypesPath: '../graphql-types.generated.ts',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
    },
  },
};
export default config;
