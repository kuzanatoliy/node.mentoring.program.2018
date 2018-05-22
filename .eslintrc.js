module.exports = {
  "extends": "standard",
  rules: {
    "semi": ["error", "always"],
    "comma-dangle": ["error", "always"],
    "template-curly-spacing": ["error", "always"],
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "always"
    }],
    "no-new": "off",
    "comma-dangle": ["error", "always-multiline"],
  },
};
