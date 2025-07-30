import React from 'react';

const mock = {
  GestureHandlerRootView: ({ children }) => children,
  State: {},
  PanGestureHandler: ({ children }) => children,
  ScrollView: ({ children }) => children,
  FlatList: ({ children }) => children,
  TouchableOpacity: ({ children }) => children,
};

export default mock;
export const {
  GestureHandlerRootView,
  State,
  PanGestureHandler,
  ScrollView,
  FlatList,
  TouchableOpacity,
} = mock;
