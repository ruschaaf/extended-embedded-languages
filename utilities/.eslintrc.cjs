/* eslint-disable no-undef */
module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
    },
    'extends': ['eslint:recommended', 'google'],
    'overrides': [
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
    },
    'rules': {
        'max-len': ['error', {
            code: 120,
            comments: 80,
            ignoreUrls: true,
        }],
        'comma-dangle': ['error', {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'never',
        }],
        'valid-jsdoc': ['error', {
            prefer: {
                'return': 'returns',
            },
            requireReturn: false,
            requireParamDescription: false,
            requireReturnDescription: false,
        }],
        'object-curly-spacing': ['error', 'always'],
        'indent': [
            'error', 4, {
                'CallExpression': {
                    'arguments': 2,
                },
                'FunctionDeclaration': {
                    'body': 1,
                    'parameters': 2,
                },
                'FunctionExpression': {
                    'body': 1,
                    'parameters': 2,
                },
                'MemberExpression': 1,
                'ObjectExpression': 1,
                'SwitchCase': 1,
                'ignoredNodes': [
                    'ConditionalExpression',
                ],
            },
        ],
    },
};
