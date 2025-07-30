import React from 'react';

const mock = {
  SafeAreaProvider: ({ children }) => children,
  SafeAreaView: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
};

export default mock;
export const { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } = mock;
