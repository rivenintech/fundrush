import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/__generated__/graphql/schema.graphql",
  documents: ["src/**/*.{tsx,ts}", "!src/gql/**/*"],
  generates: {
    "./src/__generated__/graphql/": {
      preset: "client",
      config: {
        avoidOptionals: false,
      },
    },
  },
};

export default config;
