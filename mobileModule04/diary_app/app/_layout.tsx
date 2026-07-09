import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LinearGradient } from 'expo-linear-gradient';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import * as Linking from 'expo-linking';
import { supabase } from '@/lib/supabase';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {

  useEffect(() => {
      console.log("TEST ICI PAR LA");
      const subscription = Linking.addEventListener('url', async ({ url }) => {
          console.log('Deep link reçu:', url);
          await supabase.auth.exchangeCodeForSession(url);

          const { data } = await supabase.auth.getSession();
          console.log('SESSION =', data.session);
      });
      return () => subscription.remove();
    }, []);
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LinearGradient
        colors={['#000000', '#050505']}
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
    </GestureHandlerRootView>

  );
}
