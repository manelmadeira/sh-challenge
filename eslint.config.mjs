import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:import/recommended"
  ),
  ...compat.config({
    ignorePatterns: ["**/components/ui/**"],
    plugins: ["sort-exports"],
    rules: {
      "sort-exports/sort-exports": [
        "error",
        {
          sortDir: "asc",
          ignoreCase: true,
          sortExportKindFirst: "type",
          pattern: "**/index.ts",
        },
      ],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            ["internal", "parent"],
            "sibling",
            "index",
            "object",
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "@/**",
              group: "external",
              position: "after",
            },
            {
              pattern: "*.css",
              group: "index",
              patternOptions: { matchBase: true },
              position: "after",
            },
          ],
          "newlines-between": "always",
          pathGroupsExcludedImportTypes: ["react"],
          named: true,
          alphabetize: {
            order: "asc",
          },
        },
      ],
    },
  }),
];

export default eslintConfig;
