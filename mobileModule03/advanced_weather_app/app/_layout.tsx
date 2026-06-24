import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { SearchProvider } from '@/context/SearchContext';
import { WeatherProvider } from '@/context/WeatherContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LinearGradient } from 'expo-linear-gradient';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

    const theme = {
    ...(colorScheme === 'dark' ? DarkTheme : DefaultTheme),

    colors: {
      ...(colorScheme === 'dark'
        ? DarkTheme.colors
        : DefaultTheme.colors),

      background: 'transparent',
      card: 'transparent',
    },
  };

  
  return (
    <SearchProvider>
      <WeatherProvider>
        <LinearGradient
          colors={['#0958e1', '#12ceca']}
          style={{ flex:1 }}
        >
          <ThemeProvider value={theme}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </LinearGradient>
      </WeatherProvider>
    </SearchProvider>
  );
}
