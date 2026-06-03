import React from 'react';
import { Tabs } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { StyleSheet } from 'react-native';
import { Spacing } from '@/constants/theme';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="currently"
      screenOptions={{
        header: () => false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
        },
        tabBarActiveTintColor: '#6e6969',
        tabBarInactiveTintColor: '#cccccc',
      }}
      >
      <Tabs.Screen
        name="index"
        options={{ href: null }}
        />
      <Tabs.Screen
        name="currently"
        options={{
          title: 'currently',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="locate" color={color} />,
        }}
        /><Tabs.Screen
        name="today"
        options={{
          title: 'today',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="today-outline" color={color} />,
        }}
        /><Tabs.Screen
        name="weekly"
        options={{
          title: 'weekly',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="calendar-outline" color={color} />,
        }}
        />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 0,
    marginBottom: 0,
    backgroundColor: Colors.primary.background,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
  },
  title: {
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
  topBar: {
    height: 60,
    backgroundColor: Colors.primary.background,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    overflow: 'hidden',
  },
  sendContainer: {
    backgroundColor: Colors.primary.background,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    backgroundColor: Colors.primary.background,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    fontSize: 22,
    paddingLeft: 10,
    color: 'white',
  },
});
