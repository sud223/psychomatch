import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { COLORS, FONT_SIZES, SPACING, APP_NAME, APP_VERSION } from '../constants';

interface SettingsScreenProps {
  navigation?: any;
}

interface SwitchSettingItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'switch';
  value: boolean;
  onToggle: (value: boolean) => void;
}

interface ButtonSettingItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'button';
  onPress: () => void;
  destructive?: boolean;
}

type SettingItem = SwitchSettingItem | ButtonSettingItem;

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(true);

  const handleNotificationToggle = (value: boolean) => {
    setNotificationsEnabled(value);
    // Here you would typically save this setting to AsyncStorage or send to API
  };

  const handleSoundToggle = (value: boolean) => {
    setSoundEnabled(value);
  };

  const handleDarkModeToggle = (value: boolean) => {
    setDarkModeEnabled(value);
    Alert.alert('Dark Mode', 'Dark mode functionality would be implemented here');
  };

  const handleAutoSyncToggle = (value: boolean) => {
    setAutoSyncEnabled(value);
  };

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'Are you sure you want to clear the app cache?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'Cache cleared successfully');
          },
        },
      ]
    );
  };

  const handleResetSettings = () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all settings to default?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setNotificationsEnabled(true);
            setSoundEnabled(true);
            setDarkModeEnabled(false);
            setAutoSyncEnabled(true);
            Alert.alert('Success', 'Settings reset to default');
          },
        },
      ]
    );
  };

  const handlePrivacyPolicy = () => {
    Alert.alert('Privacy Policy', 'Privacy policy would be displayed here');
  };

  const handleTermsOfService = () => {
    Alert.alert('Terms of Service', 'Terms of service would be displayed here');
  };

  const handleContactSupport = () => {
    Alert.alert('Contact Support', 'Support contact options would be displayed here');
  };

  const handleRateApp = () => {
    Alert.alert('Rate App', 'App store rating functionality would be implemented here');
  };

  const settingSections: { title: string; items: SettingItem[] }[] = [
    {
      title: 'Preferences',
      items: [
        {
          id: 'notifications',
          title: 'Push Notifications',
          subtitle: 'Receive notifications about quizzes and updates',
          type: 'switch',
          value: notificationsEnabled,
          onToggle: handleNotificationToggle,
        },
        {
          id: 'sound',
          title: 'Sound Effects',
          subtitle: 'Play sounds for interactions and feedback',
          type: 'switch',
          value: soundEnabled,
          onToggle: handleSoundToggle,
        },
        {
          id: 'darkMode',
          title: 'Dark Mode',
          subtitle: 'Use dark theme for better night viewing',
          type: 'switch',
          value: darkModeEnabled,
          onToggle: handleDarkModeToggle,
        },
        {
          id: 'autoSync',
          title: 'Auto Sync',
          subtitle: 'Automatically sync data when connected',
          type: 'switch',
          value: autoSyncEnabled,
          onToggle: handleAutoSyncToggle,
        },
      ],
    },
    {
      title: 'Data & Storage',
      items: [
        {
          id: 'clearCache',
          title: 'Clear Cache',
          subtitle: 'Free up storage space',
          type: 'button',
          onPress: handleClearCache,
        },
        {
          id: 'resetSettings',
          title: 'Reset Settings',
          subtitle: 'Reset all settings to default values',
          type: 'button',
          onPress: handleResetSettings,
          destructive: true,
        },
      ],
    },
    {
      title: 'Legal & Support',
      items: [
        {
          id: 'privacy',
          title: 'Privacy Policy',
          subtitle: 'Read our privacy policy',
          type: 'button',
          onPress: handlePrivacyPolicy,
        },
        {
          id: 'terms',
          title: 'Terms of Service',
          subtitle: 'Read our terms of service',
          type: 'button',
          onPress: handleTermsOfService,
        },
        {
          id: 'support',
          title: 'Contact Support',
          subtitle: 'Get help with the app',
          type: 'button',
          onPress: handleContactSupport,
        },
        {
          id: 'rate',
          title: 'Rate This App',
          subtitle: 'Help us improve by rating the app',
          type: 'button',
          onPress: handleRateApp,
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Customize your app experience</Text>
      </View>

      {settingSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.items.map((item) => (
            <View key={item.id} style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Text style={[
                  styles.settingTitle,
                  item.type === 'button' && item.destructive && styles.destructiveText
                ]}>
                  {item.title}
                </Text>
                <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
              </View>
              
              {item.type === 'switch' && (
                <Switch
                  value={item.value}
                  onValueChange={item.onToggle}
                  trackColor={{ false: COLORS.border, true: COLORS.primary + '50' }}
                  thumbColor={item.value ? COLORS.primary : COLORS.textSecondary}
                />
              )}
              
              {item.type === 'button' && (
                <TouchableOpacity onPress={item.onPress}>
                  <Text style={styles.settingArrow}>›</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      ))}

      <View style={styles.appInfo}>
        <Text style={styles.appName}>{APP_NAME}</Text>
        <Text style={styles.appVersion}>Version {APP_VERSION}</Text>
        <Text style={styles.copyright}>© 2024 psychomatch</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
    marginHorizontal: SPACING.lg,
  },
  settingItem: {
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingContent: {
    flex: 1,
    marginRight: SPACING.md,
  },
  settingTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  destructiveText: {
    color: COLORS.error,
  },
  settingSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  settingArrow: {
    fontSize: FONT_SIZES.xl,
    color: COLORS.textSecondary,
    fontWeight: '300',
  },
  appInfo: {
    alignItems: 'center',
    padding: SPACING.xl,
    marginTop: SPACING.lg,
  },
  appName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  appVersion: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  copyright: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    opacity: 0.7,
  },
});

export default SettingsScreen;

