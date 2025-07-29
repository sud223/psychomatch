import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { COLORS, FONT_SIZES, APP_NAME } from '../constants';
import { delay } from '../utils';

interface SplashScreenProps {
  navigation?: any;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    // Simulate app initialization
    await delay(2000);
    
    // Navigate to next screen (this would be handled by AppNavigator)
    // navigation?.replace('Intro');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.appName}>{APP_NAME}</Text>
          <Text style={styles.tagline}>Your React Native Journey Starts Here</Text>
        </View>
        
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.surface} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  appName: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.surface,
    textAlign: 'center',
    marginBottom: 10,
  },
  tagline: {
    fontSize: FONT_SIZES.md,
    color: COLORS.surface,
    textAlign: 'center',
    opacity: 0.8,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.surface,
    marginTop: 10,
    opacity: 0.8,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
  versionText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.surface,
    opacity: 0.6,
  },
});

export default SplashScreen;

