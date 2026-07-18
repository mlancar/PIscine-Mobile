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
      const subscription = Linking.addEventListener('url', async ({ url }) => {
          console.log('Deep link reçu:', url);
          await supabase.auth.exchangeCodeForSession(url);

          const { data } = await supabase.auth.getSession();
          console.log('SESSION =', data.session);
      });
      return () => subscription.remove();
    }, []);


  
  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <Stack screenOptions={{ headerShown: false,contentStyle: {backgroundColor: '#181818'} }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </GestureHandlerRootView>

  );
}
