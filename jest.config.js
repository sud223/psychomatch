module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['react-native-gesture-handler/jestSetup'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)',
  ],
};
