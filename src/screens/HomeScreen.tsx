import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { COLORS, FONT_SIZES, SPACING } from '../constants';
import { authService } from '../services/auth';
import { User } from '../types';

interface HomeScreenProps {
  navigation?: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [user, setUser] = useState<User | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadUserData();
    setRefreshing(false);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'quiz':
        navigation?.navigate('Quiz');
        break;
      case 'profile':
        navigation?.navigate('Profile');
        break;
      case 'settings':
        navigation?.navigate('Settings');
        break;
      default:
        console.log(`Action: ${action}`);
    }
  };

  const quickActions = [
    { id: 'quiz', title: 'Take Quiz', icon: '🧠', color: COLORS.primary },
    { id: 'profile', title: 'View Profile', icon: '👤', color: COLORS.secondary },
    { id: 'settings', title: 'Settings', icon: '⚙️', color: COLORS.warning },
  ];

  const recentActivities = [
    { id: 1, title: 'Completed React Native Quiz', time: '2 hours ago' },
    { id: 2, title: 'Updated Profile Information', time: '1 day ago' },
    { id: 3, title: 'Changed App Settings', time: '3 days ago' },
  ];

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Welcome back{user?.name ? `, ${user.name}` : ''}!
        </Text>
        <Text style={styles.subGreeting}>
          Ready to continue your learning journey?
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Quizzes Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>85%</Text>
          <Text style={styles.statLabel}>Average Score</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>7</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsContainer}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.quickActionCard, { borderLeftColor: action.color }]}
              onPress={() => handleQuickAction(action.id)}
            >
              <Text style={styles.quickActionIcon}>{action.icon}</Text>
              <Text style={styles.quickActionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {recentActivities.map((activity) => (
          <View key={activity.id} style={styles.activityCard}>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>{activity.title}</Text>
              <Text style={styles.activityTime}>{activity.time}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Content</Text>
        <View style={styles.featuredCard}>
          <Text style={styles.featuredTitle}>New React Native Features</Text>
          <Text style={styles.featuredDescription}>
            Discover the latest updates and improvements in React Native development.
          </Text>
          <TouchableOpacity style={styles.featuredButton}>
            <Text style={styles.featuredButtonText}>Learn More</Text>
          </TouchableOpacity>
        </View>
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
  greeting: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  subGreeting: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    marginHorizontal: SPACING.xs,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  quickActionsContainer: {
    gap: SPACING.sm,
  },
  quickActionCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickActionIcon: {
    fontSize: 24,
    marginRight: SPACING.md,
  },
  quickActionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
  },
  activityCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activityContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityTitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    flex: 1,
  },
  activityTime: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  featuredCard: {
    backgroundColor: COLORS.primary,
    padding: SPACING.lg,
    borderRadius: 12,
  },
  featuredTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.surface,
    marginBottom: SPACING.sm,
  },
  featuredDescription: {
    fontSize: FONT_SIZES.md,
    color: COLORS.surface,
    opacity: 0.9,
    marginBottom: SPACING.md,
    lineHeight: 22,
  },
  featuredButton: {
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  featuredButtonText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.primary,
  },
});

export default HomeScreen;

