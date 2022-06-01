module.exports = {
	env: {
		es2021: true,
		node: true
	},
	extends: ['plugin:prettier/recommended'],
	parserOptions: {
		ecmaVersion: 12,
		ecmaFeatures: {
			jsx: true
		},
		sourceType: 'module'
	}
};
