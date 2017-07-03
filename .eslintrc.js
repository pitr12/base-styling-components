module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "jasmine": true,
    "node": true,
    "jest": true
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "prefer-arrow-callback": 0,
    "func-names": 0,
    "import/no-extraneous-dependencies": 0,
    "no-underscore-dangle": 0,
    "no-unused-expressions": 0,
    "no-use-before-define": 0,
    "react/sort-comp": 0,
    "react/no-multi-comp": 0,
    "react/require-extension": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/prefer-stateless-function": 0,
    "comma-dangle": ["error", {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "always-multiline",
        "exports": "always-multiline",
        "functions": "ignore",
    }]
  }
};
