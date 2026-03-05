import parser from "@typescript-eslint/parser"
import plugin from "@typescript-eslint/eslint-plugin"

export default [
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(),
        sourceType: "module"
      },
    },
    plugins: {
      "@typescript-eslint": plugin
    },
    rules: {
      // Disallow any
      "@typescript-eslint/no-explicit-any": "error",

      // Disallow unsafe assignments, accesses and calls
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-return": "error",

      // Require explicit return types
      "@typescript-eslint/explicit-function-return-type": "error",

      // Disallow implicit any parameters
      "@typescript-eslint/no-inferrable-types": "off",
    }
  }
];
