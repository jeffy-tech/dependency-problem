// {
//   "extends": ["./.eslintrc.cjs", "plugin:jest/recommended"],
//   "parserOptions": {
//     "project": "./test/tsconfig.json"
//   },
//   "plugins": ["jest"]
// }

const something = require('../../');

module.exports = {
  extends: ['../../.eslintrc.cjs', 'plugin:jest/recommended'],
  plugins: ['jest'],
};
