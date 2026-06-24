import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="currently"
      screenOptions={{
        header: () => false,
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: '#0c5fe4',
        tabBarInactiveTintColor: '#58f5f2',
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
