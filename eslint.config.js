import pluginJs from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import globals from "globals";

export default [
  {
    files: ["**/*.js"],
    plugins: {
      import: importPlugin
    },
    rules: {
      "import/no-unresolved": "error",
      "import/named": "error",
      "no-unused-vars": "warn"
    },
    settings: {
      "import/resolver": {
        node: true
      }
    },
    languageOptions: {
      globals: {
        ...globals.node  // This adds Node.js globals including 'console'
      }
    }
  },
  pluginJs.configs.recommended
];