import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { COLORS, FONT_SIZES, SPACING } from '../constants';

interface IntroScreenProps {
  navigation?: any;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ navigation }) => {
  const handleGetStarted = () => {
    // Navigate to login screen
    navigation.replace('Auth');
  };

  const handleSkip = () => {
    // Skip intro and go to login
    navigation.replace('Auth');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.background} barStyle="dark-content" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.slide}>
            <View style={styles.iconPlaceholder}>
              <Text style={styles.iconText}>🚀</Text>
            </View>
            <Text style={styles.title}>Welcome to Our App</Text>
            <Text style={styles.description}>
              Discover amazing features and functionality that will enhance your mobile experience.
            </Text>
          </View>

          <View style={styles.slide}>
            <View style={styles.iconPlaceholder}>
              <Text style={styles.iconText}>⚡</Text>
            </View>
            <Text style={styles.title}>Fast & Reliable</Text>
            <Text style={styles.description}>
              Built with React Native for optimal performance across iOS and Android platforms.
            </Text>
          </View>

          <View style={styles.slide}>
            <View style={styles.iconPlaceholder}>
              <Text style={styles.iconText}>🎯</Text>
            </View>
            <Text style={styles.title}>Easy to Use</Text>
            <Text style={styles.description}>
              Intuitive interface designed to provide the best user experience possible.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.pagination}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  skipButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  skipText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    justifyContent: 'center',
  },
  slide: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  iconPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  iconText: {
    fontSize: 40,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: SPACING.md,
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
  },
  getStartedButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  getStartedText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.surface,
  },
});

export default IntroScreen;

