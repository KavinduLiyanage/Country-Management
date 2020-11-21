module.exports = {
    "extends": ["airbnb"],
    "parser": "babel-eslint",
    "rules": {
        "indent": ["error", 4, {SwitchCase: 1}],
        "react/jsx-indent": ["error", 4],
        "react/jsx-filename-extension": [1, {"extensions": [".js", ".jsx"] }],
        "react/forbid-prop-types": 0,
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "arrow-parens": ["error", "as-needed"],
        "implicit-arrow-linebreak": 0,
        "no-unused-vars": ["error", {"args": "none"}],
        "max-len": ["error", 150, 4, { "ignoreStrings": true }],
        "react/jsx-one-expression-per-line": 0,
        "class-methods-use-this": 0,
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
        "import/no-named-as-default": 0,
        "import/no-unresolved": 0,
        "object-curly-newline": ["error", {
            "ObjectPattern": { "multiline": true },
            "ExportDeclaration": { "multiline": true, "minProperties": 6 }
        }],
        "jsx-a11y/label-has-associated-control": 0,
        "jsx-a11y/label-has-for": 0,
        "react/jsx-indent-props": ["error", 'tab'|4|'first'],
        "react/no-did-update-set-state": 0,
        "one-var": 0,
        'jsx-a11y/no-noninteractive-element-interactions': 0,
        "jsx-a11y/click-events-have-key-events": 0,
        "react/jsx-curly-newline": 0,
        "default-case": 0,
        "react/no-array-index-key": 0
    },
    "env": {
        "browser": true,
    }
};