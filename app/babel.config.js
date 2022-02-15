module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module-resolver', {
      root: ['./src/'],
      extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      alias: {
        assets: './assets',
      }
    }],
    ['module:react-native-dotenv', {
      'moduleName': 'react-native-dotenv',
      'allowUndefined': false
    }]
  ]
};
