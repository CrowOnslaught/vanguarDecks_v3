module.exports ={
    root: true,
    plugins: ['prettier'],
    extends: [
        'eslint:recommended',
        'react-app',
        'react-app/jest',
        'plugin:import/recommended',
        'plugin:import/typescript'

    ],
    rules: {
        'prettier/prettier': "warn",
    },
    settings: {
        'import/resolver': {
            node: {
                paths: ['src'],
            }
        }
    }
  
}