import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RootStackParamList } from '../types';
import { authService } from '../services/auth';

// Import screens
import SplashScreen from '../screens/SplashScreen';
import IntroScreen from '../screens/IntroScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import QuizScreen from '../screens/QuizScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Auth Stack Navigator
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

// Main Tab Navigator
const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: '#8E8E93',
      headerShown: false,
    }}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        // tabBarIcon: ({ color, size }) => (
        //   <Icon name="home" size={size} color={color} />
        // ),
      }}
    />
    <Tab.Screen
      name="Quiz"
      component={QuizScreen}
      options={{
        tabBarLabel: 'Quiz',
        // tabBarIcon: ({ color, size }) => (
        //   <Icon name="quiz" size={size} color={color} />
        // ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        // tabBarIcon: ({ color, size }) => (
        //   <Icon name="person" size={size} color={color} />
        // ),
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        tabBarLabel: 'Settings',
        // tabBarIcon: ({ color, size }) => (
        //   <Icon name="settings" size={size} color={color} />
        // ),
      }}
    />
  </Tab.Navigator>
);

const AppNavigator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const authenticated = await authService.isAuthenticated();
      setIsAuthenticated(authenticated);

      // Check if intro should be shown (first time user)
      // This would typically check AsyncStorage for a flag
      setShowIntro(!authenticated);

      setIsLoading(false);
    } catch (error) {
      console.error('Auth check error:', error);
      setIsLoading(false);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : showIntro && !isAuthenticated ? (
          <Stack.Screen name="Intro" component={IntroScreen} />
        ) : !isAuthenticated ? (
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

