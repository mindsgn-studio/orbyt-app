module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'transform-remove-console',
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.js', '.jsx', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          '@app': './src',
        },
      },
    ],
  ],
};
