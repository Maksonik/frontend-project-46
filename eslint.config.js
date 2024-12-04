import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { 
    languageOptions: { 
      globals: globals.browser 
    }
  },
  
  pluginJs.configs.recommended,
  
  {
    files: ['**/*.js'], 
    languageOptions: {
      globals: {
        ...globals.browser, 
        jest: 'readonly',  
        test: 'readonly',  
        expect: 'readonly', 
      },
    },
  },
];
